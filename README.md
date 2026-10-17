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

## 2026-10-15 本地深化

六级各深化1个既有语法点，新增6段语境诊断、27组例句和18题，见 [本轮审计与范围](EXPANSION-20261015.md)。新增维护源为 `tools/supplement-<级别>.json`，构建时并入详细讲解、练习及相关点；原历史审校源保留。

长篇阅读配套第二批：B2/C1/C2各深化1个篇章语法点，新增6段讲解、12例与9题，使用独立情境。详见 [第二批记录](LONGREAD-20261015.md)。

## 2026-10-16 音频与纠错更新

前两批9课/9语法点的独立法语播放单元已覆盖585/585（656处），保留118项旧录音，新增467个Siwis WAV。完成三长文与语法逻辑纠错，并新增6道听读迁移题。详见 [本轮报告](audio-20261016.html)。未完成实际听感验收，不把播放或波形检查当作发音认证。旧报告所记未配音状态为历史记录，现以本轮报告及清单为准。

本地提交整理：逐项语言修订见 language-review-20261016.json（教程位于 reports/）；冗余整文件快照只留本机工作区，不纳入Git。两个项目的音频覆盖账本按仓库分别保存。

## A2/B1 叙事与转述补强

深化既有2课及2语法点，新增16组独立例句与15题；新增法语已同步本地配音。本批增量89个音频（两站合计），不重复计入前轮467个。见 [本批使用与验证](a2-b1-20261016.html)。

## 2026-10-16 语法深化（第二批）

A1–C2 各深化一个既有语法点，新增 6 节讲解、16 个双语例句和 12 道带解释迁移题。详见 [本批验证与剩余缺口](expansion-batch2-summary-20261016.html)。旧基线通过精确追加凭证继续校验；未替换现有朗读选项。

## 2026-10-16 条件、让步与原因边界（第三批）

深化3个既有语法点，新增3节、7组双语例句和6道带解释迁移题。详见[本批内容与验证](expansion-batch3-summary-20261016.html)。历史基线继续通过独立追加凭证校验。

## 2026-10-16 否定与过去叙事（第四批）

深化3个既有语法点，新增3节、9组双语例句与6道迁移题。详见[本批验证记录](expansion-batch4-summary-20261016.html)。本批采用单代理第二遍校对，历史基线继续按独立追加凭证验证。

- 2026-10-16 第五批：物主关系、复合关系代词与赘词 ne 深化及本地录音：[验收报告](expansion-batch5-summary-20261016.html)。

- 2026-10-16 第六批：数量、条件与跨语域改写深化及本地录音：[验收报告](expansion-batch6-summary-20261016.html)。

- 2026-10-16 第七批：形容词、作用来源与过去叙事深化及本地录音：[验收报告](expansion-batch7-summary-20261016.html)。

- 2026-10-16 第八批：借还代词、副动词与反讽回应深化及本地录音：[验收报告](expansion-batch8-summary-20261016.html)。

- 2026-10-17 第九批：问句角色、动词补语与限定回答练习；本地音频与验收见[报告](expansion-batch9-summary-20261017.html)。

- 2026-10-17 第十批：主语配合、请求确认与句首倒装：第十批语法；本地音频与验收见[报告](expansion-batch10-summary-20261017.html)。
