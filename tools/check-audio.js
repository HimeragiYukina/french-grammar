// Check every cached text/file mapping and the page's actual exact-text lookup.
// This verifies mapping integrity, not an acoustic transcription of the MP3s.
const fs=require('fs');
const vm=require('vm');
const crypto=require('crypto');
const assert=require('assert/strict');
const context={window:{}};
vm.runInNewContext(fs.readFileSync('audio/manifest.js','utf8'),context);
const manifest=context.window.AUDIO_MANIFEST;
const html=fs.readFileSync('index.html','utf8');
const lookup=html.match(/function audioURLFor\(text\)\{[\s\S]*?\n\}/)[0];
const lookupFor=new Function('MAN','neuralVoice','text',`const useNeural=true;return (${lookup})(text);`);
const hashName=text=>crypto.createHash('sha1').update(text,'utf8').digest('hex').slice(0,16)+'.mp3';
const names=new Map();
let files=0;
for(const [text,name] of Object.entries(manifest.map)){
  assert.equal(name,hashName(text),'Audio filename must match its full text');
  assert(!names.has(name)||names.get(name)===text,'Different texts share a clip');
  names.set(name,text);
  for(const voice of manifest.voices){
    const file=manifest.base+voice+'/'+name;
    assert(fs.existsSync(file)&&fs.statSync(file).size>0,`Missing or empty clip: ${file}`);
    assert.equal(lookupFor(manifest,voice,text),file,'Page lookup mismatch');
    files++;
  }
}
assert(fs.existsSync('tools/strings.json'),'Run tools/extract.js first');
const texts=JSON.parse(fs.readFileSync('tools/strings.json','utf8'));
let cached=0,fallback=0;
for(const text of texts){
  const url=lookupFor(manifest,manifest.voices[0],text);
  if(Object.prototype.hasOwnProperty.call(manifest.map,text)){
    cached++;
    assert.equal(url,manifest.base+manifest.voices[0]+'/'+hashName(text));
  }else{
    fallback++;
    assert.equal(url,null,'Uncached/edited text must not select an old recording');
  }
}
// A text change must never reuse the old clip by position or chapter ID.
for(const text of Object.keys(manifest.map)){
  const changed=text+' [mapping-check-only]';
  assert.equal(lookupFor(manifest,manifest.voices[0],changed),null);
}
const report={manifestTexts:Object.keys(manifest.map).length,validatedFiles:files,currentTexts:texts.length,cached,fallback,checks:'full-text SHA-1 mapping, unique clips, nonempty files, actual exact-text lookup, edited-text fallback',limitation:'No full acoustic transcription or listening certification.'};
console.log(JSON.stringify(report,null,2));
