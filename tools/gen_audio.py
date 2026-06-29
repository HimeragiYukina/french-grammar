# Pre-generate neural French TTS (edge-tts) for every string in strings.json.
#
# Usage (from the repo root, where index.html lives):
#   py -m pip install --user edge-tts
#   node tools/extract.js index.html tools/strings.json
#   py tools/gen_audio.py tools/strings.json audio
#
# Files are named by sha1(text)[:16].mp3 so unchanged content keeps its file
# (stable git diffs, incremental re-runs). Emits <out>/manifest.js, which the
# page loads as a plain <script>. To change voices, edit VOICES below.
import asyncio, hashlib, json, os, sys
import edge_tts

VOICES = {"fr-FR": "fr-FR-DeniseNeural", "fr-CA": "fr-CA-SylvieNeural"}
LABELS = {"fr-FR": "Denise", "fr-CA": "Sylvie"}
CONCURRENCY = 6

strings = json.load(open(sys.argv[1], encoding="utf-8"))
OUTDIR = sys.argv[2]

def fname(s): return hashlib.sha1(s.encode("utf-8")).hexdigest()[:16] + ".mp3"

sem = asyncio.Semaphore(CONCURRENCY)
done = 0
fail = {k: [] for k in VOICES}

async def synth(voice_code, text, path):
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, voice_code).save(path)
                if os.path.exists(path) and os.path.getsize(path) > 0:
                    return True
            except Exception:
                await asyncio.sleep(0.8 * (attempt + 1))
        return False

async def main():
    tasks = []
    for key in VOICES:
        d = os.path.join(OUTDIR, key)
        os.makedirs(d, exist_ok=True)
        for s in strings:
            p = os.path.join(d, fname(s))
            if os.path.exists(p) and os.path.getsize(p) > 0:
                continue
            tasks.append((key, s, p))
    total = len(tasks)
    print(f"to_generate={total} (skipped existing)", flush=True)

    async def run(key, s, p):
        global done
        ok = await synth(VOICES[key], s, p)
        done += 1
        if not ok:
            fail[key].append(s)
        if done % 50 == 0 or done == total:
            print(f"  {done}/{total}", flush=True)

    await asyncio.gather(*[run(k, s, p) for (k, s, p) in tasks])

    # Manifest: include a string only if it rendered for ALL voices.
    m = {}
    for s in strings:
        fn = fname(s)
        if all(os.path.exists(os.path.join(OUTDIR, k, fn)) and os.path.getsize(os.path.join(OUTDIR, k, fn)) > 0
               for k in VOICES):
            m[s] = fn
    manifest = {"voices": list(VOICES.keys()), "labels": LABELS, "base": "audio/", "map": m}
    with open(os.path.join(OUTDIR, "manifest.js"), "w", encoding="utf-8") as f:
        f.write("window.AUDIO_MANIFEST=" + json.dumps(manifest, ensure_ascii=False) + ";\n")
    print(f"DONE clips_in_manifest={len(m)}/{len(strings)} "
          f"failures={{'fr-FR':{len(fail['fr-FR'])},'fr-CA':{len(fail['fr-CA'])}}}", flush=True)

asyncio.run(main())
