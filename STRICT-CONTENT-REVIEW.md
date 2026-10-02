# 全量严格内容复核 · 2026-10-02

本轮对当前拆页后的最终源数据重新逐项审读，没有用上一轮结论替代新审查。六级分工与原作者错开，主任务复核关键修订、跨级一致性及全部语境。审查由助手执行，不是外部专家认证；这里记录可检查的实际范围和证据，学习页面未新增免责声明。

## 实际覆盖

| 级别 | 点数 | 原例 | 原练习 | 详细小节 | 详细例句 | 实用题 | 语境句/题 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A1 | 23 | 94 | 99 | 69 | 138 | 0 | 0/0 |
| A2 | 18 | 70 | 72 | 63 | 126 | 18 | 15/9 |
| B1 | 15 | 65 | 68 | 47 | 156 | 6 | 24/9 |
| B2 | 16 | 77 | 80 | 50 | 150 | 0 | 0/0 |
| C1 | 13 | 64 | 62 | 44 | 142 | 0 | 0/0 |
| C2 | 12 | 57 | 55 | 46 | 116 | 0 | 0/0 |

总计97点、427原例、436原练习、319详细小节及828详细例句、24实用题、6篇语境的39句和18题。全站478题均检查题干、参考答案及说明；现有练习没有选择题选项或自动判分。语境的逐句中译、为何选择和替换差异均纳入审读。

## 修订结果

本轮记录145项JSON路径修订，其中7项为参考资料数组更新、138项为内容字段修订；另有2项共用页面措辞更正。这包含解释精化、译文和题目限定，不表示145个独立硬性语法错误。全部精确修改前后见下方清单及各级strict-audit JSON。

主要修订包括：

- en否定词序明确为 ne/n’ + en + 变位动词/助动词 + pas；y练习注明位置在 reste 前。
- 条件式礼貌陈述不再误称问句；付款题的人称、句数与参考答案一致；无性别线索的分词答案说明可接受变体。
- 物主词按拥有者人称/数选系列，再按名词性数选形式；on、ce sont、星期冠词、书面ne避免机械绝对化。
- espérer、否定意见动词、le fait que、bien que/quoique的语气选用区分规范目标和真实语境；允许多解的练习指定学习目标或说明其他可接受答案。
- 分词+不定式配合明确句法条件；se plaire与本质代词式分类分开；未来截止前完成也可用虚拟式过去。
- 文学时态保留haïr/ouïr的分音符例外及croître区别；a eu fini正确称超复合时；n’eût été不凭形态机械限定过去。
- 主任务核读加拿大官方规则，把倒装连接t的判断明确为拼写a/c/e，补vainc-t-il；已有t/d不重复。
- 译文不额外增加等候、一夜、伪造、30多岁或兄姐年龄；新闻条件式区分据称与概率推测；语境中的lui收件人明示。
- 名词化保留原因果力度；语域词汇、形容词前后置和dont的重复限制按具体关系解释。
- 页面改为“按A1–C2组织基础到进阶的语法主题”，不宣称穷尽CEFR全部核心语法或读完即可达标。

## 尚有语境或规范差异的项目

没有留下阻塞性的未确认构成问题。以下差异保留为学习需要的适用边界：

- bien que/quoique 后直陈式在部分规范资料中接受度不同；本题按规范学习目标选虚拟式，不将所有实际直陈用例说成绝对错误。
- 否定/疑问意见动词、espérer、le fait que等选式依断言角度；不给脱离语境的唯一答案。
- en作COD通常不配合，文学配合为有记录变体；练习明确采用一般规则。
- 过去时的观察角度、开放改写、礼貌程度及叙述者性别有可接受变体；题目已限定目标或在答案说明。

## 核验与实测

- `python tools/check-strict-review.py`：97个ID和6语境覆盖计数准确；145次修改逐一逆向重放，全部JSON恢复到本轮审查前SHA-256基线，无未记录源数据改动。
- `python tools/check-baseline.py`：再还原先前明确修订后，原97点/427例/436题及原扩写仍与历史基线相同。
- `python tools/build-pages.py`及兼容生成命令：七页与六级包生成一致，重复运行输出不变。
- `node tools/check-content.js`：执行真实共享运行代码，核对例句、题目字段、关联ID、七页依赖、初始分级包、搜索及朗读按钮。
- `node tools/extract.js index.html tools/strings.json`：1862条唯一可朗读文本；`node tools/check-audio.js`核对545缓存文本、1090非空MP3及精确匹配；当前508条命中缓存、1354条回退，不把新文本接到旧录音。未新生成MP3，也未逐条听审旧录音。
- 本轮生成后重新运行Chrome实际浏览器回归，详见[报告JSON](tools/strict-browser-report.json)：六级97点展开/收起；按需包；中法搜索；旧深链；直接定位；跨级跳转；前进/后退；原/新增练习答案和说明；手机目录/Escape；缓存MP3实际开始播放和停止；语境系统语音实际开始播放；file:// B1页加载15点。
- 桌面1440×1000和手机390×844截图已重新检查，内容自然换行，手机文档宽390，无横向溢出；浏览器运行异常0。
- 本地Markdown链接与git diff --check通过。未提交、推送、合并或部署本轮修改。

## 逐项修订清单

### A1

覆盖记录：[strict-audit-a1.json](tools/strict-audit-a1.json)。

#### 1. tools/grammar-a1.json · grammar / 12 / fr

原fr笼统否认与拥有者的关系；须区别人称系列与名词性数。

修改前：
```text
L'adjectif possessif s'accorde avec l'objet possédé, pas avec le possesseur.
```

修改后：
```text
Le déterminant possessif varie en personne avec le possesseur et s'accorde en genre et en nombre avec le nom déterminé, sous réserve des formes mon/ton/son devant certains mots féminins.
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/23485/la-grammaire/les-determinants/determinants-possessifs/generalites-sur-les-determinants-possessifs), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/24157/la-grammaire/les-determinants/determinants-possessifs/mon-ton-et-son-devant-des-mots-feminins)

#### 2. tools/grammar-a1.json · grammar / 12 / zh

原中文“不是与拥有者”缺少人称系列选择条件。

修改前：
```text
主有形容词与<strong>被拥有物</strong>的性数一致(不是与拥有者!):mon/ma/mes(我的)、ton/ta/tes、son/sa/ses、notre/nos、votre/vos、leur/leurs。
```

修改后：
```text
先按拥有者的人称和数选择物主系列，再按<strong>被拥有名词</strong>的性数选择形式(不按拥有者性别选择 son/sa):mon/ma/mes(我的)、ton/ta/tes、son/sa/ses、notre/nos、votre/vos、leur/leurs。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/23485/la-grammaire/les-determinants/determinants-possessifs/generalites-sur-les-determinants-possessifs)

#### 3. tools/grammar-a1.json · grammar / 12 / tip

须看紧接词并包括哑音h；mon ancienne école与ma nouvelle école已有扩写对照。

修改前：
```text
<b>易错:</b>son/sa 不区分「他的/她的」,只看名词性别。阴性名词若以<strong>元音</strong>开头,用 mon/ton/son(<em>mon école</em>)。
```

修改后：
```text
<b>易错:</b>son/sa 不区分「他的/她的」,只看名词性别。紧接的阴性词以<strong>元音或哑音 h</strong>开头时,通常用 mon/ton/son(<em>mon école</em>)。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24157/la-grammaire/les-determinants/determinants-possessifs/mon-ton-et-son-devant-des-mots-feminins)

#### 4. tools/grammar-a1.json · grammar / 4 / fr

补齐on泛指与vous普通复数，原文只列两种用法易误认为等价。

修改前：
```text
Les pronoms sujets remplacent le sujet. « on » = « nous » à l'oral ; « vous » est aussi la forme de politesse.
```

修改后：
```text
Les pronoms sujets remplacent le sujet. « On » peut désigner des personnes indéterminées ou remplacer « nous » à l'oral ; « vous » peut désigner plusieurs personnes ou une seule personne par politesse.
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 5. tools/grammar-a1.json · grammar / 7 / fr

invariable未限定单复数易误认为任何时态不变。

修改前：
```text
« C'est » présente ou identifie ; « il y a » indique l'existence (invariable).
```

修改后：
```text
« C'est » présente ou identifie ; « il y a » indique l'existence et ne varie pas avec le nombre du nom introduit, mais se conjugue selon le temps.
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 6. tools/grammar-a1.json · grammar / 7 / ex / 3 / use

与扩写已说明口语和nous/vous边界保持一致。

修改前：
```text
复数 ce sont:后面是复数名词 mes parents,c'est 要变成 ce sont
```

修改后：
```text
复数 ce sont:本句 mes parents 为复数名词，规范书面语优先用 ce sont；口语 c’est mes parents 很常见，另有 c’est nous/vous 等边界。
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 7. tools/grammar-a1.json · practice / a1-cest-ilya / 2 / q

amis de classe表达不够自然，改camarades de classe并明确要求规范书面答案。

修改前：
```text
___ mes amis de classe. (这是,复数)
```

修改后：
```text
___ mes camarades de classe. (这是,复数,采用规范书面形式)
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 8. tools/grammar-a1.json · practice / a1-cest-ilya / 2 / a

随题目更新名词，ce sont考点不变。

修改前：
```text
Ce sont mes amis de classe.
```

修改后：
```text
Ce sont mes camarades de classe.
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 9. tools/grammar-a1.json · practice / a1-cest-ilya / 2 / note

明确标准答案范围，避免对口语合法变体绝对否定。

修改前：
```text
考查 ce sont:复数名词前 c'est 变 ce sont
```

修改后：
```text
本题要求规范书面复数介绍，用 ce sont；口语 c’est + 复数名词也常见，不能一概判为语法错误。
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 10. tools/grammar-a1.json · grammar / 14 / tip

避免把所有书面媒介都视为强制ne。

修改前：
```text
<b>易错:</b>普通全量否定的直接宾语中,不定冠词/部分冠词通常变 de:<em>Je n'ai <b>pas de</b> voiture.</em> 口语中 ne 常被省略(<em>Je sais pas</em>),但书面必须保留。
```

修改后：
```text
<b>易错:</b>普通全量否定的直接宾语中,不定冠词/部分冠词通常变 de:<em>Je n'ai <b>pas de</b> voiture.</em> 口语中 ne 常被省略(<em>Je sais pas</em>),规范正式书面语通常保留 ne;书面呈现口语等场合可省略。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/23905/la-syntaxe/la-negation-et-la-restriction/generalites-sur-la-negation)

#### 11. tools/grammar-a1.json · grammar / 11 / ex / 2 / zh

幸福的故事中文搭配生硬，heureuse可指结局美好。

修改前：
```text
一个幸福的故事(heureux→heureuse)
```

修改后：
```text
一个结局美好的故事(heureux→heureuse)
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 12. tools/grammar-a1.json · grammar / 15 / fr

语调式不只familier，服务语境Vous avez une minute可中性礼貌，与扩写一致。

修改前：
```text
Trois registres pour l'interrogation totale : intonation (familier), est-ce que (standard), inversion (soutenu).
```

修改后：
```text
Trois formes pour l'interrogation totale : intonation (courante à l'oral), est-ce que (standard), inversion (souvent plus soutenue). La politesse dépend aussi des mots et du contexte.
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 13. tools/grammar-a1.json · grammar / 19 / zh

原说明过度二分，具体日期定冠词也合法，扩写已有边界。

修改前：
```text
问时间:<em>Quelle heure est-il ?</em> 答:<em>Il est…</em>。日期:<em>le + 数字 + 月份</em>(1号用 premier)。星期前不加冠词表「这个/那个」,加 le 表「每逢」。
```

修改后：
```text
问时间:<em>Quelle heure est-il ?</em> 答:<em>Il est…</em>。日期:<em>le + 数字 + 月份</em>(1号用 premier)。星期无冠词常指特定一次，加 le 常表「每逢」；le lundi 5 mai 等带具体日期的结构不表示每周。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 14. tools/grammar-a1.json · grammar / 18 / ex / 2 / zh

ma sœur不指定相对年龄；避免凭空确定姐姐。

修改前：
```text
我和姐姐去火车站。
```

修改后：
```text
我和姐姐或妹妹去火车站。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 15. tools/expansion-a1.json · a1-etre / sections / 0 / examples / 0 / zh

ma sœur未给出年龄关系。

修改前：
```text
我姐姐是工程师。
```

修改后：
```text
我的姐姐或妹妹是工程师。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 16. tools/expansion-a1.json · a1-possessif / sections / 1 / examples / 0 / zh

sa sœur未给出姐姐或妹妹。

修改前：
```text
我的女性朋友和她姐姐一起到了。
```

修改后：
```text
我的女性朋友和她的姐姐或妹妹一起到了。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 17. tools/expansion-a1.json · a1-prep-lieu / sections / 1 / examples / 0 / zh

ma sœur未给出年龄关系。

修改前：
```text
我从加拿大回来，我姐姐从意大利回来。
```

修改后：
```text
我从加拿大回来，我的姐姐或妹妹从意大利回来。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 18. tools/expansion-a1.json · a1-prep-base / sections / 1 / examples / 0 / zh

ma sœur未给出年龄关系。

修改前：
```text
我和姐姐在朋友家吃晚饭。
```

修改后：
```text
我和姐姐或妹妹在朋友家吃晚饭。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 19. tools/expansion-a1.json · a1-cest-ilya / sections / 0 / examples / 0 / zh

ma sœur本身不说明年龄关系，有孩子也不足以推出比我年长。

修改前：
```text
这是我姐姐，这些是她的孩子。
```

修改后：
```text
这是我的姐姐或妹妹，这些是她的孩子。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 20. tools/expansion-a1.json · a1-futur-proche / comparison

增加与简单将来成对例，落实现有边界而非只有去向对比。

修改前：
```text
Je vais à la gare（aller 表移动）/ Je vais partir（aller 为未来辅助结构）；Je vais travailler l’année prochaine 也可自然，名称“最近”不意味着必须几分钟内。
```

修改后：
```text
Je vais à la gare（aller 表移动）/ Je vais partir（aller 为未来辅助结构）；Je vais travailler l’année prochaine 也可自然，名称“最近”不意味着必须几分钟内。 Je vais appeler Paul（突出当前打算）/ J’appellerai Paul（直接陈述未来行动，也可为承诺）；两者都可指稍后打电话，不能按分钟/年份强分。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24122/la-grammaire/le-verbe/temps-grammaticaux/futur/le-futur-proche)

#### 21. tools/sources-a1.json · (整体数组)

新增严格复核实际浏览的futur proche、物主限定词和mon/ton/son规则来源；保留原8项。

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24122/la-grammaire/le-verbe/temps-grammaticaux/futur/le-futur-proche), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/23485/la-grammaire/les-determinants/determinants-possessifs/generalites-sur-les-determinants-possessifs), [资料3](https://vitrinelinguistique.oqlf.gouv.qc.ca/24157/la-grammaire/les-determinants/determinants-possessifs/mon-ton-et-son-devant-des-mots-feminins)

### A2

覆盖记录：[strict-audit-a2.json](tools/strict-audit-a2.json)。

#### 1. tools/grammar-a2.json · practice / a2-y / 2 / note

修正把本题reste误称vais。

修改前：
```text
问句 chez toi 从回答者视角是 chez moi，y 回指同一住所；代词位置在 vais 前。
```

修改后：
```text
问句 chez toi 从回答者视角是 chez moi，y 回指同一住所；代词位置在 reste 前。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 2. tools/expansion-a2.json · a2-en / sections / 3 / explanation

否定结构中的en必须位于变位动词或助动词前，原示意会误导词序。

修改前：
```text
在对方已经指出商品的语境中，en 可代替数量表达里的名词部分，但 un、deux、un kilo 等具体数量仍保留。否定零数量通常说 ne…pas en，而不是保留被否定的 un；若要明确否定一个、实为两个，则另有对比表达。en 不是随便删除一切 de 后内容的工具：地点来源可用 en，人的补语还要按动词和语境判断。
```

修改后：
```text
在对方已经指出商品的语境中，en 可代替数量表达里的名词部分，但 un、deux、un kilo 等具体数量仍保留。否定零数量通常说 ne/n’ + en + 变位动词或助动词 + pas（如 Je n’en ai pas），而不是保留被否定的 un；若要明确否定一个、实为两个，则另有对比表达。en 不是随便删除一切 de 后内容的工具：地点来源可用 en，人的补语还要按动词和语境判断。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/23513/la-grammaire/les-pronoms/pronoms-personnels/le-pronom-personnel-en)

#### 3. tools/expansion-a2.json · a2-en / practice / 2 / note

说明保留数量可作零数量强调，不能归为仅对比。

修改前：
```text
通常不用 Je n’en ai pas une 来表达一般无车；带 une 易引出对比数量。
```

修改后：
```text
一般表达没有车可说 Je n’en ai pas；保留 une 可以强调数量或作对比，Je n’en ai pas une seule 则强调一辆也没有。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/23513/la-grammaire/les-pronoms/pronoms-personnels/le-pronom-personnel-en)

#### 4. tools/expansion-a2.json · a2-pc-avoir / practice / 0 / q

原题您与答案je视角不一致，要求两句与单句答案不一致。

修改前：
```text
您昨天已经支付，但截至现在还未收到发票。用 payer / recevoir、passé composé 和 pas encore 写两句。
```

修改后：
```text
你作为付款人，昨天已经支付，但截至现在还未收到发票。用 je、payer / recevoir、passé composé 和 pas encore 写一句含 mais 的话。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 5. tools/expansion-a2.json · a2-politesse / practice / 0 / note

原说明把陈述句误解为问题；补充同样成立的请求形式。

修改前：
```text
不是 Je pourrais répéter，后者问自己能否重复。
```

修改后：
```text
这里请求工作人员做动作，应使用 vous。Je pourrais répéter 陈述“我可以重复”，不是向对方提出重复的请求；问“我可以重复吗”可说 Est-ce que je pourrais répéter… ?。Pourriez-vous… ? 之外，Est-ce que vous pourriez… ? 也能表达礼貌请求。
```

依据：[资料1](https://laits.utexas.edu/tex/gr/tac1.html)

#### 6. tools/grammar-a2.json · grammar / 10 / tip

分开moi形式和en前缩合例句，原括号位置造成误读。

修改前：
```text
<b>易错:</b>肯定命令时代词后置加连字符且 me/te 通常→<b>moi/toi</b>;在 en/y 前则用 m'/t' 缩合(<em>Donne-<b>moi</b> ça</em>);否定命令代词回到动词前(<em>Ne me donne pas ça</em>)。
```

修改后：
```text
<b>易错:</b>肯定命令时代词后置加连字符且 me/te 通常→<b>moi/toi</b>(<em>Donne-<b>moi</b> ça</em>);在 en/y 前则用 m'/t' 缩合(<em>Donne-m’en un</em>);否定命令代词回到动词前(<em>Ne me donne pas ça</em>)。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24206/la-grammaire/les-pronoms/pronoms-personnels/pronoms-personnels-employes-avec-un-verbe-a-limperatif), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/23513/la-grammaire/les-pronoms/pronoms-personnels/le-pronom-personnel-en)

#### 7. tools/grammar-a2.json · grammar / 3 / zh

避免把PC等同于短暂具体动作或只推进情节。

修改前：
```text
这是法语最高频的难点。<b>passé composé</b>=推进情节的<strong>具体、完成</strong>的动作(然后发生了什么);<b>imparfait</b>=<strong>背景、习惯、状态、正在进行</strong>(当时是什么样)。常一句并用:背景(imp)中突然发生(PC)。
```

修改后：
```text
这是法语最高频的难点。<b>passé composé</b>把事件作为<strong>已完成的整体</strong>陈述，常用于推进情节(然后发生了什么)，也能概括一段持续或重复的经历；<b>imparfait</b>常描写<strong>背景、习惯、状态、正在进行</strong>(当时是什么样)，不突出事件终点。常一句并用:背景(imp)中发生事件(PC)。
```

依据：[资料1](https://laits.utexas.edu/tex/gr/tap8.html)

#### 8. tools/grammar-a2.json · grammar / 4 / ex / 0 / use

去除时态必然确定发生的暗示。

修改前：
```text
规则构成+确定计划:partir 以动词原形为词干 + -ai,表示确定的将来安排
```

修改后：
```text
规则构成+将来安排:partir 以动词原形为词干 + -ai,说话者陈述计划中的出发时间，时态本身不保证计划一定实现。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 9. tools/grammar-a2.json · practice / a2-cod / 1 / q

明确vous为单人尊称，使je回答视角唯一。

修改前：
```text
Vous regardez les enfants ? — Oui, je ___ regarde. <span class=hint>提示:替代 les enfants</span>
```

修改后：
```text
Vous regardez les enfants ? — Oui, je ___ regarde. <span class=hint>提示:向一位受访者使用尊称 vous；替代 les enfants</span>
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 10. tools/grammar-a2.json · grammar / 14 / tip

限定où为时间状语，避免凡时间先行词必用où的过度规则。

修改前：
```text
<b>易错:</b>表时间的「那天/那年」用 <b>où</b> 而非 *quand*(<em>l'année <b>où</b>…</em>)。
```

修改后：
```text
<b>易错:</b>「那天/那年」在关系从句中充当时间状语时，用 <b>où</b> 而非 *quand*(<em>l'année <b>où</b> j'ai eu mon bac</em>)；若从句把那一天当直接宾语，则用 que(<em>le jour que je préfère</em>)。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 11. tools/grammar-a2.json · practice / a2-ou-relatif / 1 / note

补充题干未限定性别时同样成立的配合。

修改前：
```text
表时间的「那天」用 où。
```

修改后：
```text
这里「那天」在从句中作时间状语，用 où。rencontrés 对应男性或混合群体；若 nous 全为女性，可写 rencontrées。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 12. tools/context-a2.json · 2 / sentences / 2 / zh

删除原文问句没有的“大约”，environ属于下一句回答。

修改前：
```text
“我想周五上午过来；您能告诉我预约办理大约需要多长时间吗？”
```

修改后：
```text
“我想星期五上午来；您能告诉我预约会面需要多长时间吗？”
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 13. tools/context-a2.json · 1 / sentences / 0 / why

明确现在时购物与未来课程的时间关系。

修改前：
```text
现在时 commence 表达已有安排；du matériel 引入泛指用品。后文具体介绍 cahiers，后面的 en 回指本子，不是直接代替 matériel。
```

修改后：
```text
现在时 commence 表达已有安排；du matériel 引入泛指用品。后文具体介绍 cahiers，后面的 en 回指本子，不是直接代替 matériel。je vais 在此表示眼下为明天的课去采购；也可明确说 aujourd’hui, je vais…，避免把准备购物误解为明天上课时才购物。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 14. tools/context-a2.json · 0 / sentences / 4 / why

故事未指定叙述者性别，补全另一种正确配合。

修改前：
```text
avons parlé把有界的一小时作整体；sommes sortis是离开事件；était/étaient描写离开时环境。
```

修改后：
```text
avons parlé把有界的一小时作整体；sommes sortis是离开事件；était/étaient描写离开时环境。sortis 对应男性或混合群体；若 nous 全为女性，应写 sorties（前句 retrouvés 同理为 retrouvées）。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 15. tools/expansion-a2.json · a2-coi / sections / 0 / examples / 0 / zh

sœur未提供年龄信息；不把姐妹关系额外确定为姐姐，统一跨级译法。

修改前：
```text
我给姐姐写了信；我把照片发给她了。
```

修改后：
```text
我给姐姐或妹妹写了信；我把照片发给她了。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 16. tools/expansion-a2.json · a2-comparatif / sections / 1 / examples / 1 / zh

sœur未提供年龄信息；不把姐妹关系额外确定为姐姐，统一跨级译法。

修改前：
```text
他旅行和姐姐一样多，但花钱更少。
```

修改后：
```text
他旅行和姐姐或妹妹一样多，但花钱更少。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

### B1

覆盖记录：[strict-audit-b1.json](tools/strict-audit-b1.json)。

#### 1. tools/grammar-b1.json · grammar / 4 / ex / 2 / use

在所有位置一致限定肯定espérer的通常规则。

修改前：
```text
意愿类:souhaiter que + 虚拟式(对比:espérer que 接直陈式)
```

修改后：
```text
意愿类:souhaiter que + 虚拟式；对比肯定 espérer que 通常用直陈式，否定或疑问另看断言角度。
```

依据：[资料1](https://www.dictionnaire-academie.fr/article/A9E2630)

#### 2. tools/grammar-b1.json · practice / b1-subj-declencheurs / 1 / q

原题viendra/vient等因时间语境未明确不应唯一判分。

修改前：
```text
J'espère qu'il ___ (venir) à la fête. (espérer que→直陈式!)
```

修改后：
```text
J'espère qu'il ___ (venir) à la fête demain. (肯定希望；用直陈式将来时)
```

依据：[资料1](https://www.dictionnaire-academie.fr/article/A9E2630)

#### 3. tools/grammar-b1.json · practice / b1-subj-declencheurs / 1 / a

与限定将来时间题干一致。

修改前：
```text
J'espère qu'il viendra à la fête.
```

修改后：
```text
J'espère qu'il viendra à la fête demain.
```

依据：[资料1](https://www.dictionnaire-academie.fr/article/A9E2630)

#### 4. tools/grammar-b1.json · practice / b1-subj-declencheurs / 4 / q

防止partes与sois parti过去先行的语义多解。

修改前：
```text
Je suis triste que tu ___ (partir) si tôt. (情感→虚拟)
```

修改后：
```text
Je suis triste que tu ___ (partir) si tôt demain. (尚未出发；用虚拟式现在时)
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 5. tools/grammar-b1.json · practice / b1-subj-declencheurs / 4 / a

与题干时间一致。

修改前：
```text
Je suis triste que tu partes si tôt.
```

修改后：
```text
Je suis triste que tu partes si tôt demain.
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 6. tools/grammar-b1.json · practice / b1-cond-passe / 1 / note

补充题目未提供叙述者性别的同等正确答案。

修改前：
```text
venir 用 être,配合主语。
```

修改后：
```text
venir 用 être，配合主语；本题按男性 je 写 venu，女性 je 用 venue。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 7. tools/grammar-b1.json · practice / b1-demonstratifs-pron / 3 / note

承认题干允许的中性指代多解。

修改前：
```text
考查中性代词 cela:指代前面整件事,不与名词配合。
```

修改后：
```text
中性代词指代前面整件事，不作名词性数配合；cela 是参考答案，口语 ça 也正确，ceci 在合适指示语境中也可用。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 8. tools/grammar-b1.json · practice / b1-connecteurs-base / 0 / q

原因语义不能唯一排除car/puisque，明确目标连接词。

修改前：
```text
Je révise beaucoup ___ j'ai un examen lundi. (原因)
```

修改后：
```text
Je révise beaucoup ___ j'ai un examen lundi. (原因；用 parce que)
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 9. tools/grammar-b1.json · grammar / 14 / ex / 0 / use

消除已扩写边界与原use矛盾。

修改前：
```text
原因(parce que):回答『为什么』,引出对方未知的原因
```

修改后：
```text
原因(parce que):常回答“为什么”，本例引出复习的具体原因；并非所有 parce que 信息都必须为对方未知。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 10. tools/grammar-b1.json · grammar / 14 / ex / 2 / use

不强制所有puisque都双方预先已知。

修改前：
```text
原因(puisque):引出双方都已知的原因,相当于『既然』
```

修改后：
```text
原因(puisque):把“你在这儿”当作已知或显然的依据，相当于“既然”。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 11. tools/grammar-b1.json · grammar / 6 / ex / 4 / use

缩小旧标签quoi→ceque过泛范围。

修改前：
```text
特殊疑问(quoi→ce que):qu'est-ce que / que 在间接引语中变为 ce que
```

修改后：
```text
直接宾语“什么”:qu’est-ce que / 疑问 que 在此间接引语中变为 ce que；介词 + quoi 不按此规则替换。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 12. tools/grammar-b1.json · grammar / 11 / tip

dont与en/物主词可以不同指称共存，不禁所有同句出现。

修改前：
```text
<b>选择方法：</b>先还原 <em>parler de / avoir besoin de / être fier de</em> 等结构。dont 已包含 de，勿重复 en 或物主词。所属关系可说 <em>dont la voiture…</em>；复合介词或嵌套介词组须保留，如 <em>près de laquelle / sur le toit de laquelle</em>。
```

修改后：
```text
<b>选择方法：</b>先还原 <em>parler de / avoir besoin de / être fier de</em> 等结构。dont 已包含 de，勿用 en 或物主词再次表达同一 de 回指关系（其他独立补语仍可保留）。所属关系可说 <em>dont la voiture…</em>；复合介词或嵌套介词组须保留，如 <em>près de laquelle / sur le toit de laquelle</em>。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/22904/la-grammaire/les-pronoms/pronoms-relatifs/le-pronom-relatif-dont)

#### 13. tools/expansion-b1.json · b1-dont / sections / 0 / explanation

限定赘余规则的语义关系。

修改前：
```text
先恢复简单句：parler de ce livre、avoir besoin de cet outil、être fier de ce résultat，才能判断 dont。dont 已包含 de 的关系，不再重复 de/en。
```

修改后：
```text
先恢复简单句：parler de ce livre、avoir besoin de cet outil、être fier de ce résultat，才能判断 dont。dont 已包含 de 的关系，不再用 de/en 重复同一回指；另指其他对象的独立补语不受此禁令限制。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/22904/la-grammaire/les-pronoms/pronoms-relatifs/le-pronom-relatif-dont)

#### 14. tools/expansion-b1.json · b1-cond-present / sections / 0 / examples / 0 / use

不从si+未完成时单独推出事实。

修改前：
```text
与当前居住情况不同。
```

修改后：
```text
本例按目前住得离办公室较远理解；这类形式也可设定试探的未来居住条件，并非仅凭时态证明事实相反。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21324/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-apres-si)

#### 15. tools/expansion-b1.json · b1-cond-present / sections / 3 / examples / 0 / zh

une trentaine为约三十，不精确规定三十多。

修改前：
```text
据一名目击者说，司机大概三十多岁。
```

修改后：
```text
据一名目击者说，司机大约三十岁。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 16. tools/expansion-b1.json · b1-subj-declencheurs / comparison

avant/après的完成关系相对于主句，不是绝对说话时间。

修改前：
```text
Je souhaite qu’il réussisse 与 J’espère qu’il réussira 都表示希望，但前者虚拟式、后者通常直陈式。Avant qu’il parte 指动作尚未完成；après qu’il est parti 指动作已经完成，规范选式不同。
```

修改后：
```text
Je souhaite qu’il réussisse 与 J’espère qu’il réussira 都表示希望，但前者虚拟式、后者通常直陈式。Avant qu’il parte 把离开定位在另一个动作之后，不表示说话当下离开必未发生；après qu’il est parti 把离开定位在另一动作之前，规范上用直陈式。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 17. tools/expansion-b1.json · b1-subj-declencheurs / boundaries

保留非强制规则且消除ne单独永不能否定的暗示。

修改前：
```text
否定/疑问 penser 或 espérer 后并非永远只有一种语气。avant que、à moins que 等正式语体中可有赘词 ne：avant qu’il ne parte；此 ne 不表示否定，真正否定仍须 pas 等。
```

修改后：
```text
否定/疑问 penser 或 espérer 后并非强制虚拟式，选式取决于语义及断言角度。avant que、à moins que 等正式语体中可有赘词 ne：avant qu’il ne parte；此 ne 不表示否定。ne…pas 等可构成真正否定，部分正式结构的 ne 单独也能否定，不能只靠是否有 pas 判断。
```

依据：[资料1](https://www.dictionnaire-academie.fr/article/A9E2630)

#### 18. tools/expansion-b1.json · b1-dont / sections / 2 / examples / 1 / zh

保持原句je为assis的主语，不把同事说成落座者。

修改前：
```text
坐在我旁边的女同事在这里工作。
```

修改后：
```text
我坐在她旁边的那位女同事在这里工作。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/22904/la-grammaire/les-pronoms/pronoms-relatifs/le-pronom-relatif-dont)

#### 19. tools/expansion-b1.json · b1-si / sections / 3 / examples / 1 / use

有车也能乘公交，移除无效事实推理。

修改前：
```text
当前没有车的设想，与已知事实拉开距离；不是过去的拥有状态叙述。
```

修改后：
```text
本场景把没有车作为当前设定；未完成过去时用于有距离的假设，乘公交本身并不能证明没有车。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21324/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-apres-si)

#### 20. tools/context-b1.json · 0 / practice / 0 / q

真实条件的主句也可现在，明确本题目标时态。

修改前：
```text
天放晴是可实现条件：Si le soleil ___ (revenir), nous ___ (déjeuner) au parc.
```

修改后：
```text
天放晴是可实现条件，主句用将来时：Si le soleil ___ (revenir), nous ___ (déjeuner) au parc.
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21324/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-apres-si)

#### 21. tools/context-b1.json · 1 / sentences / 2 / alternative

lirais不等于愿意，补全引述框架以避免孤立si歧义。

修改前：
```text
Si je lirais le document 询问的是从当时看我是否愿意或会读文件，不是询问是否已经读过。
```

修改后：
```text
Elle voulait savoir si je lirais le document 询问的是从当时看我之后是否会读文件，不是是否已经读过；这里 lirais 表过去将来，并不自动表示愿意。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21324/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-apres-si)

#### 22. tools/context-b1.json · 1 / sentences / 6 / fr

原lui可回指Paul或主管；明确收件人，保留双代词示范。

修改前：
```text
Dès que j’ai reçu son tableau, je le lui ai transmis avec un court commentaire.
```

修改后：
```text
Dès que j’ai reçu son tableau, je l’ai transmis à ma responsable ; je le lui ai envoyé avec un court commentaire.
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 23. tools/context-b1.json · 1 / sentences / 6 / zh

与明示收件人后的法语一致。

修改前：
```text
我一收到他的表格，就附上简短说明转给了女主管。
```

修改后：
```text
我一收到他的表格，就转给了女主管，并附上简短说明发给她。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 24. tools/context-b1.json · 1 / sentences / 6 / why

明示指称，避免把语法性别lui当女主管固有。

修改前：
```text
le 指 tableau，lui 指前文女主管；两个复合过去时叙述先后完成的动作。
```

修改后：
```text
le 指 tableau，lui 指本句明示的 ma responsable；双代词 le 在 lui 前。复合过去时叙述先收到再转发，先后由 Dès que 及语境体现。
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 25. tools/context-b1.json · 1 / sentences / 6 / alternative

旧son tableau也存在所属歧义，解释独立回指限制。

修改前：
```text
Je lui ai transmis son tableau 重说名词较清楚，但失去 le 展示的回指；lui 仍须由语境识别。
```

修改后：
```text
Je lui ai transmis le tableau 重说名词 tableau，但若没有明示收件人，lui 仍可能指 Paul 或女主管，需要语境澄清。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 26. tools/context-b1.json · 2 / sentences / 2 / why

installer tables译摆放比安装自然。

修改前：
```text
安装者 Nadia 与吃饭者不同，目的用 pour que + 虚拟式 puisse。
```

修改后：
```text
Nadia 是摆放者，与吃饭者不同，目的用 pour que + 虚拟式 puisse；目的不保证后来确实一起吃饭。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 27. tools/sources-b1.json · (整体数组)

补充本轮实际浏览的espérer原典来源。

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://www.dictionnaire-academie.fr/article/A9E2630)

### B2

覆盖记录：[strict-audit-b2.json](tools/strict-audit-b2.json)。

#### 1. tools/grammar-b2.json · grammar / 0 / tip

修正将来一律现在时的绝对化；过去形式不只表示真实完成。

修改前：
```text
<b>对比:</b>同时/将来用虚拟式现在(que tu viennes),已完成用虚拟式过去(que tu sois venu)。触发词与现在时完全相同。
```

修改后：
```text
<b>对比:</b>同时或尚待发生的动作通常用虚拟式现在(que tu viennes);先于参照点、或要求未来截止前完成的动作可用虚拟式过去(que tu sois venu)。语气触发结构相同，时态取决于相对时间与完成性。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 2. tools/grammar-b2.json · grammar / 0 / ex / 2 / use

否定的未发生事件不能称已完成。

修改前：
```text
现在/过去对比:同时或将来用虚拟式现在 viennes,已完成(hier)用虚拟式过去 sois venu
```

修改后：
```text
现在/过去对比:等待尚未发生的到来用虚拟式现在 viennes;遗憾昨天未到，用虚拟式过去 sois venu 定位先前事件，否定句并不表示到来实际完成。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 3. tools/grammar-b2.json · grammar / 1 / ex / 0 / use

区分断言与事实确定。

修改前：
```text
直陈式(确定):肯定句中 penser que 表达说话人的确信,从句用直陈式
```

修改后：
```text
直陈式(提出判断):肯定 penser que 通常用直陈式，这里提出“他有道理”的个人判断，并不保证客观正确。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 4. tools/grammar-b2.json · grammar / 1 / ex / 1 / use

与现有tip保持非绝对规则。

修改前：
```text
虚拟式(主观/怀疑):penser 的否定形式引入怀疑,从句转用虚拟式 ait
```

修改后：
```text
虚拟式(保留判断):此处否定 penser 表不认可或怀疑，用 ait;否定/疑问并非自动排除直陈式，需看断言意图。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 5. tools/grammar-b2.json · grammar / 1 / ex / 3 / use

概率不等于高确定性。

修改前：
```text
非人称结构的语气选择:il est probable que 表高确定性接直陈式,il est possible que 表不确定接虚拟式
```

修改后：
```text
非人称结构的语气选择:肯定 il est probable que 通常接直陈式，提出较可能的判断;il est possible que 通常接虚拟式，提出可能性。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 6. tools/grammar-b2.json · practice / b2-mode-choix / 1 / note

防止题注推广为硬规则。

修改前：
```text
ne pas croire que 表怀疑→虚拟式 ait
```

修改后：
```text
本题要求怀疑读法，ne pas croire que 常接虚拟式 ait;并非所有否定 croire 从句都绝对禁用直陈式。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 7. tools/grammar-b2.json · practice / b2-mode-choix / 3 / note

限定肯定结构。

修改前：
```text
考查非人称结构:il est possible que 接虚拟式,而 il est probable que 接直陈式。
```

修改后：
```text
肯定 il est possible que 通常接虚拟式;肯定 il est probable que 通常接直陈式。否定、疑问和具体立场可能影响选择。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif)

#### 8. tools/grammar-b2.json · grammar / 2 / zh

避免机械改指示词。

修改前：
```text
以过去说话时刻为参照转述时,从句时态通常<strong>后移</strong>:现在时→未完成过去;复合过去→愈过去;简单将来→条件式现在;先将来→条件式过去。时间词也变(hier→la veille…)。
```

修改后：
```text
以过去说话时刻为参照转述时,从句时态通常<strong>后移</strong>:现在时→未完成过去;复合过去→愈过去;简单将来→条件式现在;先将来→条件式过去。时间词是否改变取决于转述参照点(hier 可改 la veille，仍指同一天时也可保留)。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 9. tools/grammar-b2.json · grammar / 2 / tip

呼应取决于参照点而非机械换表。

修改前：
```text
<b>易错:</b>这是听力转述与书面引述的核心。时态后移 + 人称/时间/指示词三类一起改。
```

修改后：
```text
<b>易错:</b>过去视角转述通常需要时态后移;人称、时间词和指示词按实际说话者、日期与地点调整，并非三类一律改写。仍成立的信息或共同参照点可能保留原形式。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 10. tools/grammar-b2.json · grammar / 3 / tip

副动词不只表示同时。

修改前：
```text
<b>区别三者:</b>en travaillant(副动词,同主语/同时)≠ travaillant(现在分词,替代从句/原因)≠ 形容词性 -ant(un livre intéress<b>ant</b>,要配合)。
```

修改后：
```text
<b>区别三者:</b>en travaillant 是副动词，通常与主句同主语，可表同时、方式、原因或条件;travaillant 是不变的现在分词，可替代从句;形容词性 -ant 如 un livre intéressant 要按所修饰名词配合。
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 11. tools/grammar-b2.json · grammar / 6 / ex / 2 / use

去掉无条件一律。

修改前：
```text
c'est…que(强调非主语成分):强调时间状语 demain,主语以外的成分一律用 que
```

修改后：
```text
c'est…que(强调非主语成分):这里强调时间状语 demain，使用 que;基础分裂句中宾语、介词补语和状语通常也用 que。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 12. tools/grammar-b2.json · grammar / 7 / tip

不把名词化当无条件升级。

修改前：
```text
<b>用途:</b>让书面表达更地道、紧凑——同一信息用名词化更显书面 B2 语感。多积累「动词↔名词」配对。
```

修改后：
```text
<b>用途:</b>名词化便于标题、概括和衔接，但不自动使句子更地道;应保留施事、对象、时态、否定和可能性。多积累动词↔名词配对，避免抽象名词堆积。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 13. tools/expansion-b2.json · b2-nominalisation / sections / 1 / examples / 1 / fr

保留实际降低成本，不改为仅允许降低。

修改前：
```text
Le système est efficace ; cela réduit les coûts. → L'efficacité du système permet de réduire les coûts.
```

修改后：
```text
Le système est efficace ; cela réduit les coûts. → L'efficacité du système réduit les coûts.
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 14. tools/expansion-b2.json · b2-nominalisation / sections / 1 / examples / 1 / zh

对应保留因果结果。

修改前：
```text
系统高效，因此降低成本。→系统的高效有助于降低成本。
```

修改后：
```text
系统高效，因此降低成本。→系统的高效降低了成本。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 15. tools/grammar-b2.json · grammar / 9 / ex / 0 / use

保留主流规范并避免硬性必须。

修改前：
```text
让步(bien que/quoique+虚拟式):承认富有这一事实但结论相反,bien que 后必须用虚拟式 soit
```

修改后：
```text
让步(bien que/quoique+虚拟式):承认富有事实却推出反预期结果;规范学习表达通常选虚拟式 soit，虚拟式不表示富有不真实。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 16. tools/grammar-b2.json · grammar / 9 / tip

权威来源明确存在规范争议。

修改前：
```text
<b>易错:</b>bien que / quoique 后<strong>必须虚拟式</strong>;标准学习用法为 malgré + <strong>名词组</strong>;从句优先改用 bien que;même si 后用<strong>直陈式</strong>(不是虚拟)。
```

修改后：
```text
<b>易错:</b>bien que / quoique 学习写作通常选<strong>虚拟式</strong>;直陈式在部分真实事实用法中可见，但规范意见有差异。malgré 优先接<strong>名词组</strong>;même si 的常规条件让步用<strong>直陈式</strong>。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 17. tools/expansion-b2.json · b2-opposition-concession / sections / 1 / explanation

避免虚拟式等于非事实。

修改前：
```text
bien que/quoique + 虚拟式；malgré/en dépit de + 名词；pourtant/néanmoins/toutefois 等不支配从句语气。书面与口语差异是倾向，不是固定同义替换。
```

修改后：
```text
bien que/quoique 学习写作通常接虚拟式；malgré/en dépit de + 名词；pourtant/néanmoins/toutefois 等不支配从句语气。虚拟式也可评价真实事实。书面与口语差异是倾向，不是固定同义替换。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 18. tools/expansion-b2.json · b2-opposition-concession / errors

不把有争议变体一概错误。

修改前：
```text
错：bien qu'il est → bien qu'il soit；学习标准语避免 malgré qu'il pleut，改 malgré la pluie / bien qu'il pleuve。错：même s'il pleuvra → même s'il pleut。
```

修改后：
```text
规范学习表达优先：bien qu'il soit，而非 bien qu'il est；后者的事实读法在部分用法中存在，但规范评价有分歧。学习标准语避免 malgré qu'il pleut，改 malgré la pluie / bien qu'il pleuve。错：même s'il pleuvra → même s'il pleut（开放条件读法）。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 19. tools/grammar-b2.json · practice / b2-opposition-concession / 6 / note

明确来源风格倾向及补偿含义。

修改前：
```text
考查对立 en revanche:书面上比 par contre 更受推崇。
```

修改后：
```text
本题 en revanche 表一方面的不足由另一方面优势补偿。par contre 也获规范承认；Académie 在可替换时偏好 en revanche，但二者并非处处同义。
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 20. tools/grammar-b2.json · grammar / 10 / ex / 5 / use

区分质疑正当性与断定虚假。

修改前：
```text
sous prétexte que:引出说话人不采信的借口性原因
```

修改后：
```text
sous prétexte que:把对方理由作为借口呈现，表达距离或质疑;不必断言生病这一事实本身为假。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 21. tools/grammar-b2.json · practice / b2-cause-consequence / 5 / note

消除必然不可信推断。

修改前：
```text
考查 sous prétexte que:说话人暗示该理由不可信。
```

修改后：
```text
sous prétexte que 把理由作为借口呈现，暗示说话人保持距离或认为理由不足，不必断言工作多这一事实为假。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 22. tools/grammar-b2.json · grammar / 10 / tip

不同连接词语义句法非机械替换。

修改前：
```text
<b>语域:</b>口语 parce que / donc → 书面升级为 étant donné que / par conséquent / si bien que,作文里轮换使用显层次。
```

修改后：
```text
<b>语域:</b>étant donné que 常引出已知依据，par conséquent 连接推论结果，si bien que 引出结果从句。根据逻辑关系和句法选择，不能把 parce que / donc 机械替换为“书面升级”。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 23. tools/grammar-b2.json · grammar / 11 / zh

ne可选且需说明语气。

修改前：
```text
<strong>目的</strong>:afin que(+虚拟)/ afin de(+原形)、de peur que、de manière à、en vue de。<strong>条件</strong>:à condition que(+虚拟)、pourvu que、à moins que(+ne)、au cas où(+条件式)、pour peu que。
```

修改后：
```text
<strong>目的</strong>:afin que(+虚拟)/ afin de(+原形)、de peur que、de manière à、en vue de。<strong>条件</strong>:à condition que(+虚拟)、pourvu que、à moins que(+虚拟式，可选赘词 ne)、au cas où(+条件式)、pour peu que。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 24. tools/grammar-b2.json · grammar / 11 / ex / 5 / use

明确ne可省。

修改前：
```text
条件·排除(à moins que+ne+虚拟式):表『除非』,带赘词 ne
```

修改后：
```text
条件·排除(à moins que+虚拟式):表“除非”;本句带可选赘词 ne，不表示不下雨。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 25. tools/expansion-b2.json · b2-but-condition / sections / 1 / explanation

完整否定不只有pas。

修改前：
```text
de peur de/de crainte de + 原形；de peur que/de crainte que + 虚拟式。正式语体可加赘词 ne，它不否定，若加 pas 才真正否定。
```

修改后：
```text
de peur de/de crainte de + 原形；de peur que/de crainte que + 虚拟式。正式语体可加赘词 ne，它不否定；若用 ne…pas、ne…jamais 等完整否定结构，才否定从句所述事件。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24432/la-syntaxe/la-negation-et-la-restriction/verbe-exprimant-la-crainte-suivi-de-que)

#### 26. tools/expansion-b2.json · b2-accord-pp / sections / 1 / explanation

纠正本质代词式与COI模式混列。

修改前：
```text
se laver/rencontrer 等分析 se 的 COD/COI；另有后置 COD 时 se 常为 COI。本质代词式、被动意义代词式通常与主语配合，但仍有特殊词项，如 se plaire 不配合、s'arroger 按 COD。
```

修改后：
```text
se laver/rencontrer 等要分析 se 的 COD/COI；有后置 COD 时 se 常为 COI。本质代词式、被动意义代词式通常与主语配合；本质代词式 s'arroger 是按 COD 配合的特殊词项。se plaire 的 se 属 COI 模式，因此分词不配合，不应把它归为本质代词式。
```

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue)

#### 27. tools/grammar-b2.json · grammar / 13 / ex / 1 / use

不是on或同义词逐级升级。

修改前：
```text
语域切换(词汇+人称):口语 on→书面 nous,动词 paumer→perdre→égarer 逐级升格
```

修改后：
```text
此处 on 指 nous，转为 nous 可明确“我们”；paumer 属随便语，perdre 中性，égarer 表遗失或放错位置。泛指 on 也能用于正式文体，词汇替换须保留具体含义。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 28. tools/grammar-b2.json · grammar / 14 / zh

CEFR不定义B2母语者。

修改前：
```text
用<strong>缓和、留余地</strong>的措辞表达观点,显得有分寸、像 B2 母语者:il semblerait que, on pourrait avancer que, dans une certaine mesure, il n'est pas exclu que, sans doute(+倒装)。
```

修改后：
```text
用<strong>缓和、留余地</strong>的措辞表达观点,让断言的力度与证据和语境相符:il semblerait que, on pourrait avancer que, dans une certaine mesure, il n'est pas exclu que, sans doute(+倒装)。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 29. tools/grammar-b2.json · grammar / 15 / ex / 5 / use

避免前置指人硬规则。

修改前：
```text
grand 位置变义(指人时):前置=伟大的,后置=高个的
```

修改后：
```text
在 grand écrivain / grand homme 这类搭配中，前置 grand 常表伟大;后置 un homme grand 表身材高。前置并非遇到人都表伟大，如 un grand garçon 也可指高大的男孩。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 30. tools/grammar-b2.json · grammar / 15 / tip

位置变义不必对立。

修改前：
```text
<b>用途:</b>B2 阅读理解与精准表达的细节分;遇到这些词留意位置,意思可能完全相反。
```

修改后：
```text
<b>用途:</b>B2 阅读理解与精准表达的细节分;遇到这些词留意位置,意义可能明显不同;还要结合搭配和语境判断。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 31. tools/grammar-b2.json · practice / b2-adj-sens / 2 / note

不把后置所有义概括为干净。

修改前：
```text
考查 propre 前置=自己的;后置才是干净的。
```

修改后：
```text
本题 sa propre entreprise 中前置 propre 强调“自己的”；后置如 une serviette propre 表干净，也有其他固定搭配义。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 32. tools/grammar-b2.json · practice / b2-adj-sens / 3 / note

限定具体搭配。

修改前：
```text
考查 cher 后置=昂贵的;前置是亲爱的。
```

修改后：
```text
本题 une voiture chère 用后置表达昂贵；cher ami 等前置称呼表亲爱。实际词义还受名词搭配、语境与修辞影响。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 33. tools/grammar-b2.json · practice / b2-adj-sens / 4 / note

解除前置指人绝对规则。

修改前：
```text
考查 grand 前置指人=伟大的;后置=高个子。
```

修改后：
```text
本题 un grand homme 表伟人，un homme grand 表高个；前置指人不一概表示伟大，如 un grand garçon 可指高大的男孩。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 34. tools/sources-b2.json · (整体数组)

追加本轮实际浏览核验来源，保留原来源。

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://www.academie-francaise.fr/questions-de-langue), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes), [资料3](https://vitrinelinguistique.oqlf.gouv.qc.ca/24236/la-grammaire/le-verbe/modes/subjonctif/generalites-sur-le-subjonctif), [资料4](https://vitrinelinguistique.oqlf.gouv.qc.ca/24432/la-syntaxe/la-negation-et-la-restriction/verbe-exprimant-la-crainte-suivi-de-que), [资料5](https://www.academie-francaise.fr/au-cas-ou-tu-seras), [资料6](https://vitrinelinguistique.oqlf.gouv.qc.ca/21695/la-syntaxe/le-sujet-dans-la-phrase/emplois-du-verbe-sembler-a-la-forme-impersonnelle), [资料7](https://vitrinelinguistique.oqlf.gouv.qc.ca/21175/la-grammaire/le-verbe/modes/concordance-des-temps/principes-de-la-correspondance-des-temps)

#### 35. tools/expansion-b2.json · b2-opposition-concession / sections / 0 / examples / 1 / zh

frère未提供年龄次序，不应仅译哥哥。

修改前：
```text
与她哥哥不同，她开车很谨慎。
```

修改后：
```text
与她的兄弟（哥哥或弟弟）不同，她开车很谨慎。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

### C1

覆盖记录：[strict-audit-c1.json](tools/strict-audit-c1.json)。

#### 1. tools/expansion-c1.json · c1-subj-imparfait / sections / 0 / explanation

补充构形例外，避免长音符规则绝对化。

修改前：
```text
以简单过去时第二人称单数去掉 -s，再接 -sse, -sses, -ssions, -ssiez, -ssent；第三人称单数在所得词干的末尾元音上加长音符，再加 -t；第三人称单数带长音符：tu parlas→qu’il parlât，tu finis→qu’il finît，tu eus→qu’il eût。主要用于文学、古典或刻意郑重语体。
```

修改后：
```text
以简单过去时第二人称单数去掉 -s，再接 -sse, -sses, -ssions, -ssiez, -ssent；第三人称单数在所得词干的末尾元音上加长音符，再加 -t；第三人称单数带长音符：tu parlas→qu’il parlât，tu finis→qu’il finît，tu eus→qu’il eût。haïr 和 ouïr 的第三人称单数保留分音符而不加长音符：qu’il haït、qu’elle ouït；croître 的各人称均保留 û，以区别 croire。主要用于文学、古典或刻意郑重语体。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24237/la-grammaire/le-verbe/conjugaison/formes-du-subjonctif)

#### 2. tools/expansion-c1.json · c1-subj-imparfait / sections / 2 / examples / 0 / zh

sans lui 未说明是否等待他，去除额外含义。

修改前：
```text
他遗憾她此前没等他就走了。
```

修改后：
```text
他遗憾她此前没有和他一起走。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 3. tools/grammar-c1.json · grammar / 6 / ex / 5 / zh

恢复过去反事实语义，避免译为一般现在能力。

修改前：
```text
没有你的帮助,我永远做不到。(= Si tu ne m'avais pas aidé)
```

修改后：
```text
如果当时没有你的帮助，我就不可能成功。(= Si tu ne m'avais pas aidé)
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24141/la-grammaire/le-verbe/temps-grammaticaux/conditionnel/conditionnel-passe-et-plus-que-parfait-du-subjonctif)

#### 4. tools/grammar-c1.json · grammar / 11 / ex / 3 / zh

faux 在该语境不必表示故意伪造。

修改前：
```text
事实证明,那些数字是假的。
```

修改后：
```text
事实证明，那些数据是错误的。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 5. tools/grammar-c1.json · grammar / 1 / tip

区分现代替代形式的时间关系。

修改前：
```text
<b>易混:</b>qu'il <b>fût</b>(虚拟式未完成,带 ^)≠ il <b>fut</b>(简单过去)。日常写作用虚拟式现在时即可。
```

修改后：
```text
<b>易混:</b>qu'il <b>fût</b>(虚拟式未完成,带 ^)≠ il <b>fut</b>(简单过去)。现代日常表达中，同期或后续事件一般用虚拟式现在时；先于主句参照点的已完成事件一般用虚拟式过去时。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24237/la-grammaire/le-verbe/conjugaison/formes-du-subjonctif)

#### 6. tools/grammar-c1.json · grammar / 8 / zh

限定规则句法条件，避免把动作施动者当作唯一判据。

修改前：
```text
几类难配合:① <b>fait</b> + 原形<strong>永不配合</strong>(elle s'est fait couper les cheveux;les robes qu'elle a fait faire);② 过去分词 + 原形:提前的 COD 是原形动作的<strong>施动者</strong>则配合,否则不配合;③ COD 是 <b>en</b> 时一般<strong>不配合</strong>。
```

修改后：
```text
几类难配合:① <b>fait</b> + 原形<strong>永不配合</strong>(elle s'est fait couper les cheveux;les robes qu'elle a fait faire);② avoir 助动词后的过去分词（如 vu、entendu）+ 原形：提前的 COD 同时是该分词的直接宾语、又是原形动作的<strong>施动者</strong>则配合,否则不配合;③ COD 是 <b>en</b> 时一般<strong>不配合</strong>。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21859/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/accord-du-participe-passe-suivi-dun-infinitif)

#### 7. tools/grammar-c1.json · grammar / 8 / fr

补充avoir及提前COD条件；en的不变为一般规则。

修改前：
```text
Cas pièges : fait + inf. invariable ; participe + infinitif (accord si le COD fait l'action) ; COD = en → pas d'accord.
```

修改后：
```text
Cas pièges : fait + inf. invariable ; avec avoir, participe suivi d’un infinitif (accord si le COD antéposé du participe est aussi le sujet sous-entendu de l’infinitif) ; COD = en → généralement pas d’accord.
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21859/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/accord-du-participe-passe-suivi-dun-infinitif), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/21037/la-grammaire/le-verbe/accord-du-participe-passe/cas-particuliers-daccord-du-participe-passe/accord-du-participe-passe-avec-le-pronom-en)

#### 8. tools/grammar-c1.json · practice / c1-accord-avance / 2 / note

标明通常规则与文学变体。

修改前：
```text
COD 是 en 时过去分词不配合:fait
```

修改后：
```text
本题 COD 是 en，采用一般不配合规则，写 fait；文学中偶见配合。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/21037/la-grammaire/le-verbe/accord-du-participe-passe/cas-particuliers-daccord-du-participe-passe/accord-du-participe-passe-avec-le-pronom-en)

#### 9. tools/grammar-c1.json · grammar / 5 / ex / 5 / use

避免把不同结构的选式绝对化。

修改前：
```text
对比(quoique vs quoi que):quoique 一个词 = bien que『尽管』;quoi que 两个词 = 『无论什么』,均接虚拟式
```

修改后：
```text
对比(quoique vs quoi que):quoique 一个词 = bien que『尽管』;quoi que 两个词 = 『无论什么』,本例均用虚拟式。quoi que 接虚拟式；quoique 通常接虚拟式，OQLF 亦记录直陈式用法，不能概括为毫无例外
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 10. tools/grammar-c1.json · practice / c1-subj-imparfait / 2 / q

明确题目预期规范，避免忽略实际变体。

修改前：
```text
Choisissez la bonne forme (fût ou fut ?) : Bien qu'il ___ (être) tard, personne ne partit. <span class=hint>提示:bien que 要求虚拟式,文学语体</span>
```

修改后：
```text
Choisissez la bonne forme (fût ou fut ?) : Bien qu'il ___ (être) tard, personne ne partit. <span class=hint>提示:本题按规范文学语体选虚拟式</span>
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 11. tools/grammar-c1.json · practice / c1-subj-imparfait / 2 / note

说明规范答案与实际变体。

修改前：
```text
考查 fût(虚拟式未完成,带长音符)与 fut(简单过去时)的辨析:bien que 后须用虚拟式。
```

修改后：
```text
考查 fût(虚拟式未完成,带长音符)与 fut(简单过去时)的辨析:本题选规范文学虚拟式；直陈式实际亦见，但受到若干语法书批评。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 12. tools/grammar-c1.json · practice / c1-concession-indefinie / 5 / q

明确无论什么语义，避免对不同解读一概排斥。

修改前：
```text
Un mot ou deux ? Choisissez : ___ (quoique / quoi que) tu dises, il ne changera pas d'avis.
```

修改后：
```text
Un mot ou deux ? Choisissez pour exprimer « 无论你说什么 » : ___ (quoique / quoi que) tu dises, il ne changera pas d'avis.
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 13. tools/grammar-c1.json · grammar / 10 / zh

不把实际选式差异误归因于过度纠正。

修改前：
```text
<b>après que</b> 按规范接<strong>直陈式</strong>(将前一事件视为后续事件的完成前提,未来安排亦如此),而 <b>avant que</b> 接<strong>虚拟式</strong>——这是高频「过度纠正」错点(连母语者也常误用虚拟)。
```

修改后：
```text
<b>après que</b> 按规范接<strong>直陈式</strong>(将前一事件视为后续事件的完成前提,未来安排亦如此),而 <b>avant que</b> 接<strong>虚拟式</strong>。实际用法中也常见 après que + 虚拟式；本章按 Académie française 的规范要求练习直陈式。
```

依据：[资料1](https://www.academie-francaise.fr/apres-que)

#### 14. tools/expansion-c1.json · c1-cond-2e / sections / 2 / examples / 0 / zh

原文未出现一夜，去除无依据的时长。

修改前：
```text
看他的脸色，仿佛他一夜没睡。
```

修改后：
```text
看他的脸色，仿佛他没睡觉。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 15. tools/sources-c1.json · (整体数组)

补充本轮实际浏览核查的权威条目。

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24237/la-grammaire/le-verbe/conjugaison/formes-du-subjonctif), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes), [资料3](https://vitrinelinguistique.oqlf.gouv.qc.ca/21859/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/accord-du-participe-passe-suivi-dun-infinitif), [资料4](https://vitrinelinguistique.oqlf.gouv.qc.ca/21037/la-grammaire/le-verbe/accord-du-participe-passe/cas-particuliers-daccord-du-participe-passe/accord-du-participe-passe-avec-le-pronom-en), [资料5](https://vitrinelinguistique.oqlf.gouv.qc.ca/22467/la-syntaxe/la-negation-et-la-restriction/constructions-avec-un-ne-expletif), [资料6](https://www.academie-francaise.fr/apres-que), [资料7](https://vitrinelinguistique.oqlf.gouv.qc.ca/24141/la-grammaire/le-verbe/temps-grammaticaux/conditionnel/conditionnel-passe-et-plus-que-parfait-du-subjonctif)

#### 16. tools/expansion-c1.json · c1-inversion / sections / 0 / explanation

主任务跨级复核：明确按动词末尾拼写判断连接t，补vaincre/convaincre的-c例外；加拿大语言官方明确a/c/e而不是所有发音元音。

修改前：
```text
正式书面语句首 peut-être、sans doute 可采用动词—主语代词倒装。动词与代词用连字符；第三人称单数元音衔接补 -t-：viendra-t-il；动词已有 t/d 不补：vient-il, prend-elle。名词主语一般保留在前，另用代词复指。
```

修改后：
```text
正式书面语句首 peut-être、sans doute 可采用动词—主语代词倒装。动词与代词用连字符；第三人称单数动词拼写以 a/e 结尾且后接 il/elle/on 时加 -t-：viendra-t-il、parle-t-elle；vaincre/convaincre 的 c 结尾也加：vainc-t-il。动词已有 t/d 不补：vient-il、prend-elle。这里看拼写，不能只凭发音是否元音。名词主语一般保留在前，另用代词复指。
```

依据：[资料1](https://nos-langues.canada.ca/fr/cles-de-la-redaction/t-euphonique-t-on-t-en-t-il)

#### 17. tools/sources-c1.json · (整体数组)

补主任务实读的连接t官方来源。

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://nos-langues.canada.ca/fr/cles-de-la-redaction/t-euphonique-t-on-t-en-t-il)

### C2

覆盖记录：[strict-audit-c2.json](tools/strict-audit-c2.json)。

#### 1. tools/grammar-c2.json · practice / c2-passe-anterieur / 0 / note

准确命名a eu fini的超复合时

修改前：
```text
考查时间连词从句:quand + 先过去时,主句简单过去时,替代口语的『复合过去时组合』。
```

修改后：
```text
考查时间连词从句:文学先过去时 + 简单过去时。原句 a eu fini 是过去超复合时（passé surcomposé）,不是普通复合过去时;此处表达先行完成。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/26576923/temps-surcompose)

#### 2. tools/grammar-c2.json · practice / c2-passe-anterieur / 1 / q

源句用自然日常复合过去时，不混用突兀的dès que愈过去背景

修改前：
```text
改为先过去时 + 简单过去时 : « Dès qu'elle était partie, le silence est retombé. »
```

修改后：
```text
改为先过去时 + 简单过去时 : « Dès qu'elle est partie, le silence est retombé. »
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 3. tools/grammar-c2.json · grammar / 0 / ex / 0 / use

quand不保证所有动作刚刚完成

修改前：
```text
时间连词从句:quand 引导的从句用先过去时,表示先于主句简单过去时动作的刚刚完成
```

修改后：
```text
时间连词从句:quand 引导的从句用先过去时,表示完成动作先于主句简单过去时;是否紧接发生由语境和连词共同决定。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 4. tools/grammar-c2.json · grammar / 2 / ex / 3 / use

纠正例句标签n’était与实际n’eût été不匹配

修改前：
```text
n'était:文学变体 n'eût été 表对过去情形的『若非』
```

修改后：
```text
n'eût été:本句为过去反事实条件『若非那场风暴』;后面的 serions arrivés 表未实现的过去结果。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24117/la-grammaire/le-verbe/accord-du-verbe-avec-le-sujet/cas-particuliers-daccord-du-verbe/accord-et-emploi-de-neut-ete-et-neussent-ete)

#### 5. tools/expansion-c2.json · c2-concession-soutenue / sections / 3 / explanation

OQLF列举现在与过去的对应解释，保留通常过去而去除排他限制

修改前：
```text
n'était + 名词相当于 si ce n'était…；n'eût été 相当于 sans… / si… n'avait pas été…，突出过去若无某因素。该结构是书面条件表达，不是让步连词；ne 在该书面结构中单独使用；名词是后置主语，复数须 n’étaient / n’eussent été，不能插入 de。
```

修改后：
```text
n’était + 名词通常对应 si ce n’était…，主句常为条件式现在。n’eût été 对应 si ce n’était / si ce n’avait été / sans…，主句通常为条件式过去，常表过去未实现结果；但该形式不能仅凭名称一律限定为过去，应结合主句和语境。此结构是书面条件表达，不是让步连词；ne 在结构中单独使用；后置名词为主语，复数用 n’étaient / n’eussent été，不插入 de。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24117/la-grammaire/le-verbe/accord-du-verbe-avec-le-sujet/cas-particuliers-daccord-du-verbe/accord-et-emploi-de-neut-ete-et-neussent-ete)

#### 6. tools/grammar-c2.json · grammar / 2 / zh

原概览与允许其他语气的扩写边界一致

修改前：
```text
<b>quand bien même</b>(+条件式,即便)、<b>n'était / n'eût été</b>(+名词,若非)、<b>encore que</b>(+虚拟,虽然)、<b>tout + 形容词 + que</b>(常+直陈,亦可用虚拟,尽管)、<b>pour autant que</b>(+虚拟,就…而言)。
```

修改后：
```text
<b>quand bien même</b>(+条件式,即便)、<b>n'était / n'eût été</b>(+名词,若非)、<b>encore que</b>(通常+虚拟,虽然)、<b>tout + 形容词 + que</b>(常+直陈,亦可用虚拟,尽管)、<b>pour autant que</b>(常+虚拟,在…范围内;具体语气随意义变化)。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 7. tools/grammar-c2.json · grammar / 2 / tip

不给encore que无条件必用虚拟式禁令

修改前：
```text
<b>关键:</b>quand bien même + <strong>条件式</strong>;tout… que 常用<strong>直陈式</strong>(强调事实),亦可用虚拟式;encore que + <strong>虚拟式</strong>。
```

修改后：
```text
<b>关键:</b>quand bien même + <strong>条件式</strong>;tout… que 常用<strong>直陈式</strong>(强调事实),亦可用虚拟式;encore que 通常 + <strong>虚拟式</strong>;特定文学语境可见其他语气。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 8. tools/grammar-c2.json · practice / c2-subj-fin / 4 / q

le fait que也有合法直陈，题目指定目标语气

修改前：
```text
« Le fait qu'il ___ (être) étranger ne change rien à l'affaire. » (le fait que 句首)
```

修改后：
```text
« Le fait qu’il ___ (être) étranger ne change rien à l’affaire. » (本题练习常见的虚拟式现在)
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 9. tools/grammar-c2.json · practice / c2-subj-fin / 4 / note

记录合法替代的条件

修改前：
```text
考查 le fait que 作主语时常接虚拟式。
```

修改后：
```text
本题按要求用 soit；le fait que 作主语时虚拟式常见，但 est 可在突出已知事实的语境成立，不能一律判错。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 10. tools/expansion-c2.json · c2-inversion-style / sections / 0 / explanation

元音结尾过宽，限定插入t条件

修改前：
```text
引语后的 dit-il / demanda-t-elle 是陈述插入语，不是疑问句。代词主语与动词用连字符；动词以元音结尾且后接 il/elle/on 时补 -t-。名词主语也可后置。
```

修改后：
```text
引语后的 dit-il / demanda-t-elle 是陈述插入语，不是疑问句。代词主语与动词用连字符；第三人称单数动词以 a/e 结尾且后接 il/elle/on 时通常补 -t-，末尾已有 t/d 时不再补。名词主语也可后置。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 11. tools/grammar-c2.json · grammar / 7 / ex / 1 / zh

消息来源保留不只表示数量可能，译据称对应新闻条件式

修改前：
```text
据媒体,死亡人数或达十人。
```

修改后：
```text
据媒体报道，死亡人数据称达到十人。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 12. tools/expansion-c2.json · c2-conjecture / sections / 1 / examples / 0 / zh

保留来源与未核实态度，避免仅译概率

修改前：
```text
据多名目击者称，嫌疑人可能在里昂。
```

修改后：
```text
据多名目击者称，嫌疑人据说在里昂。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 13. tools/expansion-c2.json · c2-rection / sections / 0 / examples / 2 / fr

以更自然完整语境说明tenir de的继承特征意义

修改前：
```text
Il tient de sa mère pour la patience.
```

修改后：
```text
Il tient de sa mère : il est tout aussi patient.
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 14. tools/expansion-c2.json · c2-rection / sections / 0 / examples / 2 / zh

对应修订后的完整法语例句

修改前：
```text
他的耐心像母亲。
```

修改后：
```text
他像母亲一样有耐心。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 15. tools/expansion-c2.json · c2-cause-niee / sections / 1 / examples / 1 / use

非因果否定不自动断言从句事实的反面

修改前：
```text
双层否定：排除“没尝试”这个解释，承认她尝试过。
```

修改后：
```text
外层否定排除“没有尝试”这一原因；在本句通常理解为她确实尝试过。该结构本身首先否定因果解释，不是在所有语境中逻辑证明尝试一定发生。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes)

#### 16. tools/grammar-c2.json · grammar / 1 / ex / 2 / use

明确craindre后的ne为赘词，避免反译

修改前：
```text
虚拟式未完成过去:主句 imparfait,从句同时的状态用 fût,现代法语作 soit
```

修改后：
```text
虚拟式未完成过去:主句 imparfait,从句同时的状态用 fût,现代可作 soit；ne 为可省略的赘词，不表示她没有走远。
```

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/22467/la-syntaxe/la-negation-et-la-restriction/constructions-avec-un-ne-expletif)

#### 17. tools/grammar-c2.json · practice / c2-cohesion / 0 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« ___ , la décision est prise. » (无论如何)
```

修改后：
```text
« ___ , la décision est prise. » (无论如何)（本题指定使用 quoi qu’il en soit。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 18. tools/grammar-c2.json · practice / c2-cohesion / 1 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« ___ , il avait raison. » (就此事而言)
```

修改后：
```text
« ___ , il avait raison. » (就此事而言)（本题指定使用 en l’occurrence。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 19. tools/grammar-c2.json · practice / c2-cohesion / 2 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« Le projet coûte cher ; ___ , il est nécessaire. » (话虽如此)
```

修改后：
```text
« Le projet coûte cher ; ___ , il est nécessaire. » (话虽如此)（本题指定使用 cela étant。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 20. tools/grammar-c2.json · practice / c2-cohesion / 3 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« Il se dit pauvre ; ___ , il vient d'acheter une villa. » (然而,引入新论据)
```

修改后：
```text
« Il se dit pauvre ; ___ , il vient d'acheter une villa. » (然而,引入新论据)（本题指定使用 or。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 21. tools/grammar-c2.json · practice / c2-cohesion / 4 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« La route est longue ; elle est, ___ , fort belle. » (再者/不过)
```

修改后：
```text
« La route est longue ; elle est, ___ , fort belle. » (再者/不过)（本题指定使用 au demeurant。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 22. tools/grammar-c2.json · practice / c2-cohesion / 5 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« Les coûts augmentent ; ___ , les marges diminuent. » (因而,文语)
```

修改后：
```text
« Les coûts augmentent ; ___ , les marges diminuent. » (因而,文语)（本题指定使用 partant。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 23. tools/grammar-c2.json · practice / c2-cohesion / 6 / q

同义连接词可能满足中文提示，指定本题结构避免唯一答案错觉

修改前：
```text
« ___ , votre proposition mérite examen. » (在这方面)
```

修改后：
```text
« ___ , votre proposition mérite examen. » (在这方面)（本题指定使用 à cet égard。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 24. tools/grammar-c2.json · practice / c2-cohesion / 6 / note

练习孤立句需说明指代依赖上下文

修改前：
```text
考查 à cet égard 限定论述的方面。
```

修改后：
```text
考查 à cet égard 指回前文某方面；本题是句型填空，独立使用需补足所指方面。
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 25. tools/grammar-c2.json · practice / c2-exclamation / 0 / q

数量感叹可有其他表达，限定练习目标

修改前：
```text
« ___ temps perdu ! » (多么多…!表数量)
```

修改后：
```text
« ___ temps perdu ! » (多么多…!表数量)（指定 Que de 结构。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 26. tools/grammar-c2.json · practice / c2-exclamation / 3 / q

Que/Comme也可感叹，不把合法变体判错

修改前：
```text
« ___ je regrette ces années ! » (多么,文学感叹)
```

修改后：
```text
« ___ je regrette ces années ! » (多么,文学感叹)（指定 Combien。）
```

依据：原句词义、句法或题目与答案的内部一致性；未伪造新增外部引用。

#### 27. tools/sources-c2.json · (整体数组)

保留原来源条目，补入本轮实际浏览的规则核验来源

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://vitrinelinguistique.oqlf.gouv.qc.ca/24117/la-grammaire/le-verbe/accord-du-verbe-avec-le-sujet/cas-particuliers-daccord-du-verbe/accord-et-emploi-de-neut-ete-et-neussent-ete), [资料2](https://vitrinelinguistique.oqlf.gouv.qc.ca/22467/la-syntaxe/la-negation-et-la-restriction/constructions-avec-un-ne-expletif), [资料3](https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/26576923/temps-surcompose), [资料4](https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes), [资料5](https://vitrinelinguistique.oqlf.gouv.qc.ca/21484/la-grammaire/le-verbe/accord-du-participe-passe/sans-auxiliaire/emploi-de-ci-joint-ci-inclus-et-ci-annexe-comme-adjectifs-et-adverbes), [资料6](https://vitrinelinguistique.oqlf.gouv.qc.ca/21175/la-grammaire/le-verbe/modes/concordance-des-temps/principes-de-la-correspondance-des-temps), [资料7](https://vitrinelinguistique.oqlf.gouv.qc.ca/22907/la-grammaire/ladverbe/tout-employe-comme-adverbe), [资料8](https://www.academie-francaise.fr/questions-de-langue)

#### 28. tools/expansion-c2.json · c2-inversion-style / sections / 0 / explanation

主任务跨级复核：明确按动词末尾拼写判断连接t，补vaincre/convaincre的-c例外；加拿大语言官方明确a/c/e而不是所有发音元音。

修改前：
```text
引语后的 dit-il / demanda-t-elle 是陈述插入语，不是疑问句。代词主语与动词用连字符；第三人称单数动词以 a/e 结尾且后接 il/elle/on 时通常补 -t-，末尾已有 t/d 时不再补。名词主语也可后置。
```

修改后：
```text
引语后的 dit-il / demanda-t-elle 是陈述插入语，不是疑问句。代词主语与动词用连字符；第三人称单数动词拼写以 a/e 结尾且后接 il/elle/on 时补 -t-；vaincre/convaincre 的 c 结尾也补（vainc-t-il）。末尾已有 t/d 时不再补。这里看拼写，不能只凭发音是否元音。名词主语也可后置。
```

依据：[资料1](https://nos-langues.canada.ca/fr/cles-de-la-redaction/t-euphonique-t-on-t-en-t-il)

#### 29. tools/sources-c2.json · (整体数组)

补主任务实读的连接t官方来源。

参考资料数组更新；完整前后数组保存在该级审查JSON。

依据：[资料1](https://nos-langues.canada.ca/fr/cles-de-la-redaction/t-euphonique-t-on-t-en-t-il)

## 级别标签措辞的核验

共用模板中英文两项前后差异见[editorial JSON](tools/strict-audit-editorial.json)。[Council of Europe](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions)将级别定义为能力描述，并说明描述不针对某一种语言；本站分组不声称是官方穷尽语法表。
