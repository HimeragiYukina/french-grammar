# 法语语法手册 A1–C2 · Grammaire française

个人使用的中法双语语法手册：97 个语法点、例句、易混对比、纠错、练习、语境阅读与法语朗读。

**在线访问：** https://himeragiyukina.github.io/french-grammar/ 。本轮修改仅在本地，线上仍为此前版本。

## 阅读

打开 [总览](index.html)，选择 [A1](a1.html)、[A2](a2.html)、[B1](b1.html)、[B2](b2.html)、[C1](c1.html) 或 [C2](c2.html)。各级页先加载本级，搜索时按需加载六级数据，支持中文、法文及带重音的精确子串搜索。搜索结果标题和相关语法链接跳转到所属级别；旧 `index.html#语法点ID` 自动定位到对应页面。

每节保留原讲解、例句和练习。展开「详细讲解」查看分用法解释、例句、对比、纠错及适用边界。A2–B1 本轮优先补强八点，新增24道实用练习。两级的「语境阅读」合计六篇短段落，包含逐句中译、表达选择、替换后的语义差异和18道语境练习。

🔊 支持单句、整节、连续朗读及语速调节；段落也可整体或逐句播放。优先播放预生成 fr-FR / fr-CA MP3；没有精确对应录音时使用系统法语语音。支持深浅主题、键盘导航和手机目录。

## 本地运行

整个仓库可离线直接打开 `index.html` 或任一级别 HTML，不需要安装前端依赖。请保留 `assets/`、`data/` 和 `audio/` 的相对位置。也可在仓库根目录运行：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

再打开 http://127.0.0.1:8765/ 。该地址仅供本机预览。公开网页仍通过既有 GitHub Pages 的 main 分支根目录部署。

## 维护

- `tools/grammar-<级别>.json`：原有语法讲解和练习。
- `tools/expansion-<级别>.json`：详细讲解、实用练习和相关点。
- `tools/context-a2.json` / `context-b1.json`：语境段落、逐句分析和练习；其他级别可用相同格式添加。
- `tools/sources-<级别>.json`：参考资料。
- `tools/page-template.html`：共用页面外壳；`assets/styles.css` / `app.js`：共享样式与交互。
- `data/` 与七个 HTML 页面由生成脚本输出，避免直接修改生成数据。

修改源文件后运行：

```bash
python tools/build-pages.py
python tools/check-baseline.py
python tools/check-strict-review.py
node tools/check-content.js
node tools/extract.js index.html tools/strings.json
node tools/check-audio.js
```

`build-expansions.py` 保留为同一生成流程的兼容入口。基线检查证明原97点、427原例、436原练习及既有扩写未丢失；明确语言修订见 `tools/split-review-fixes.json`。新内容审查记录见 [拆页与深化记录](SPLIT-AND-DEEPENING.md)，既有完整审校见 [CONTENT-AUDIT.md](CONTENT-AUDIT.md) 和 [EXPANSION-NOTES.md](EXPANSION-NOTES.md)。

音频生成步骤见 [tools/README.md](tools/README.md)。文本精确匹配决定使用哪个录音；改过的文本不会按章节位置复用旧录音。

本轮最终版本已重新做全量严格语义复核，覆盖六级全部原/新增内容及语境。逐项覆盖、修改前后、来源和规范差异见 [STRICT-CONTENT-REVIEW.md](STRICT-CONTENT-REVIEW.md)。
