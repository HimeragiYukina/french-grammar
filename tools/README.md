# 语法手册 · 高清 TTS 音频生成 / Pre-generated neural TTS

网页 [`../index.html`](../index.html) 的「🔊 朗读」优先播放**预生成的神经语音 mp3**
(放在 [`../audio/`](../audio)),在 iOS / 离线 / GitHub Pages 上都可用、音质远好于
浏览器自带语音;没有对应音频或选了「系统语音」时,自动回退到浏览器 Web Speech。

音频由 [edge-tts](https://github.com/rany2/edge-tts)(微软在线神经语音,免费、无需 API key)
离线生成后随仓库提交。

## 何时需要重新生成

**改动了任何法语文本**(`title` / `fr` / 例句 `ex.fr` / 练习答案 `a`)后,
新增或修改的句子需要重新生成,否则它们会回退到较差的浏览器语音。

## 重新生成步骤(在仓库根目录运行)

```bash
# 依赖:Node、Python 3、edge-tts(需要联网)
py -m pip install --user edge-tts

# 1) 从 index.html 抽取全部可朗读的法语句子
node tools/extract.js index.html tools/strings.json

# 2) 生成 mp3 + 写出 audio/manifest.js(增量:已存在的文件会跳过)
py tools/gen_audio.py tools/strings.json audio
```

- 文件名按文本内容哈希(`sha1[:16].mp3`),内容不变则文件名不变 → git diff 干净、可增量。
- 改动文本后,**旧句子的 mp3 会成为孤儿文件**;如需清理,可删掉 `audio/fr-FR`、
  `audio/fr-CA` 后重跑(会全量重建)。
- 想换音色:编辑 [`gen_audio.py`](gen_audio.py) 顶部的 `VOICES`(例如 `fr-FR-HenriNeural`
  男声、`fr-CA-AntoineNeural`)。`py -m edge_tts --list-voices` 可查看全部可用语音。

> `tools/strings.json` 是中间产物,已在 `.gitignore` 中忽略。
