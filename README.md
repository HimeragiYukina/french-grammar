# 法语语法手册 A1–C2 · Grammaire française

一份单页、离线可用的法语语法手册，覆盖欧标 **A1–C2** 各级别，中法对照，带例句、易错点、随讲随练（答案可逐题显示）与**高清法语朗读（🔊）**。支持搜索、级别筛选与深色模式。

🔗 **在线访问：** https://himeragiyukina.github.io/french-grammar/

## 特性

- 📚 A1–C2 全级别共 **97 个语法点**，中法双语讲解 + 例句 + 易错点
- 📖 每点新增可展开的详细讲解：形式构成、分用法的中法例句、语境与语体、易混形式比较、常错纠正及例外边界；补充内容同样支持搜索和法语朗读
- ✍️ 每个语法点配练习，答案可逐题显示 / 隐藏
- 🔊 **高清神经语音朗读**：预生成 **fr-FR（Denise）/ fr-CA（Sylvie）** 两种口音的 mp3，在 **iOS / 离线 / GitHub Pages** 上都可用；支持「整段朗读」「从此节起连读」与语速调节；无对应音频或选「系统语音」时回退到浏览器朗读
- 🔍 实时搜索与级别筛选 · 🌗 浅色 / 深色主题 · 📱 响应式

## 文件结构

- `index.html` —— 单文件应用（数据 + 样式 + 逻辑）
- `audio/` —— 预生成的朗读音频（`fr-FR/`、`fr-CA/`）与清单 `manifest.js`
- `tools/` —— 重新生成音频的脚本（见 [`tools/README.md`](tools/README.md)）

## 本地运行

直接用浏览器打开 `index.html` 即可：`manifest.js` 以普通 `<script>` 加载、音频走相对路径，`file://` 下也能正常朗读，无需服务器或构建步骤。

每张卡片保留原有概览、例句与练习；点击「详细讲解 · 用法、比较与纠错」展开扩写内容。搜索命中时，详细讲解会自动展开。各级核对资料链接位于详细讲解末尾。

## 维护扩写内容

`tools/expansion-<等级>.json` 是六个等级的扩写源数据，`tools/sources-<等级>.json` 记录核对资料。修改后运行：

```bash
python tools/build-expansions.py
node tools/check-content.js
node tools/extract.js index.html tools/strings.json
node tools/check-audio.js
```

生成脚本会核对全部原始语法点的覆盖，并将内容嵌入 `index.html`，网页运行时不请求 JSON 文件，因此仍可离线直接打开。检查脚本执行实际页面脚本，验证章节覆盖、搜索、筛选、练习、朗读按钮和本地依赖。主要原文更正与验证记录见 [扩写说明](EXPANSION-NOTES.md)。

对原有说明、例句、练习及全部新增内容的逐点语言审校、具体修订与来源限制，见 [内容审校记录](CONTENT-AUDIT.md)。`tools/audit-summary.json` 汇总全部 97 点的审校覆盖；各级详细记录及精确修订保存在 `tools/audit-*.json`。

音频检查核对全部预录文本的哈希文件名、文件存在性和页面精确文本查找；修改后无对应录音的句子会回退到浏览器语音，不按章节位置复用旧录音。该检查不代替逐条试听。

## 部署

通过 GitHub Pages 从 `main` 分支根目录自动部署。

## 改动内容后：重新生成朗读音频

改动任何法语文本后，需要重新生成对应音频，否则新句子会回退到较差的浏览器语音。一条命令即可，步骤见 [`tools/README.md`](tools/README.md)。
