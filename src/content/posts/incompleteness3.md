---
title: "不完全性定理を読む #3"
date: "2026-11-17"
category: "notes"
tags: ["logic", "incompleteness"]
summary: "自然数の関係を PA の論理式で表す表現可能性について、定義と例、証明の概略を説明します"
draft: false
---

前回（#2）は、ゲーデル数を使って「$m$ は、ゲーデル数が $n$ である論理式の証明のゲーデル数である」という自然数の関係 $\mathrm{Proof}(m, n)$ を定めました。ただし、これは $\mathsf{PA}$ の外から自然数について述べたものでした。

今回は、このような自然数の関係を $\mathsf{PA}$ の論理式で表すことを扱います。証明のうち長くなる部分は概略だけを述べます。

## 表現可能性の定義

$R$ を自然数の $k$ 項関係とします。$\mathsf{PA}$ の論理式 $\varphi(x_1, \ldots, x_k)$ が次の2つの条件を満たすとき、$\varphi$ は $\mathsf{PA}$ において $R$ を表現するといいます。

- $R(n_1, \ldots, n_k)$ が成り立つならば、$\mathsf{PA} \vdash \varphi(\overline{n_1}, \ldots, \overline{n_k})$
- $R(n_1, \ldots, n_k)$ が成り立たないならば、$\mathsf{PA} \vdash \lnot \varphi(\overline{n_1}, \ldots, \overline{n_k})$

ここで $\overline{n}$ は、#1 で定めた $n$ の数項です。$R$ を表現する論理式が存在するとき、$R$ は $\mathsf{PA}$ で表現可能であるといいます。

この定義は、個々の自然数の組について、関係が成り立つかどうかを $\mathsf{PA}$ が正しく証明できることを求めています。標準モデル $\mathbb{N}$ で $\varphi$ が $R$ と同じ意味を持つというだけでは足りません。

関数についても同じように定めます。自然数の関数 $f$ に対して、論理式 $\varphi(x_1, \ldots, x_k, y)$ が次の条件を満たすとき、$\varphi$ は $f$ を表現するといいます。

$$
f(n_1, \ldots, n_k) = m \quad \text{ならば} \quad \mathsf{PA} \vdash \forall y \, \bigl( \varphi(\overline{n_1}, \ldots, \overline{n_k}, y) \leftrightarrow y = \overline{m} \bigr)
$$

## 例

### 等しいという関係

「$m$ と $n$ は等しい」という関係は、論理式 $x = y$ によって表現されます。

$m = n$ の場合、$\overline{m}$ と $\overline{n}$ は同じ項なので、$\mathsf{PA} \vdash \overline{m} = \overline{n}$ です。

$m \neq n$ の場合は、$\mathsf{PA} \vdash \lnot (\overline{m} = \overline{n})$ を示す必要があります。$m < n$ として、$\overline{m} = \overline{n}$ を仮定します。#1 の公理 2 は $S(x) = S(y) \to x = y$ というものでした。これを $m$ 回使うと、両辺から $S$ を $m$ 個ずつ取り除くことができて、次の式が得られます。

$$
0 = \overline{n - m}
$$

$n - m$ は 1 以上なので、右辺は $S(t)$ の形の項です。これは公理 1 の $\lnot (S(x) = 0)$ に反します。$m > n$ の場合も同様です。

具体的に $m = 1$、$n = 3$ とすると、$S(0) = S(S(S(0)))$ から公理 2 によって $0 = S(S(0))$ が得られ、公理 1 と矛盾します。

### 大小関係

「$m$ は $n$ より小さい」という関係は、#1 で $x < y$ の定義とした論理式 $\exists z \, (x + S(z) = y)$ によって表現されます。

$m < n$ の場合は、$k = n - m - 1$ とすると $m + (k + 1) = n$ です。#1 で見たように、具体的な数の足し算は $\mathsf{PA}$ で証明できるので、$\mathsf{PA} \vdash \overline{m} + S(\overline{k}) = \overline{n}$ となり、$\mathsf{PA} \vdash \overline{m} < \overline{n}$ が得られます。

$m < n$ でない場合に $\mathsf{PA} \vdash \lnot (\overline{m} < \overline{n})$ を示すには、次の事実を使います。これは $n$ ごとに $\mathsf{PA}$ で証明できます。

$$
\mathsf{PA} \vdash \forall x \, \bigl( x < \overline{n} \to x = \overline{0} \lor x = \overline{1} \lor \cdots \lor x = \overline{n - 1} \bigr)
$$

これによって、$\overline{n}$ より小さいものは $\overline{0}$ から $\overline{n - 1}$ までに限られることが $\mathsf{PA}$ の中でわかります。あとは等しいという関係の場合と同じ議論で、$\overline{m}$ がそのどれとも等しくないことを示します。

## 有界な量化

大小関係の例で使った事実は、もっと一般的な形で使えます。

$\forall x \, (x < t \to \cdots)$ や $\exists x \, (x < t \land \cdots)$ のように、変数の動く範囲が項 $t$ で制限されている量化を、有界な量化といいます。量化がすべて有界である文については、次のことが成り立ちます。

- その文が $\mathbb{N}$ で成り立つならば、$\mathsf{PA}$ で証明できる
- その文が $\mathbb{N}$ で成り立たないならば、その否定が $\mathsf{PA}$ で証明できる

有界な量化は、有限個の場合を順に調べることに置き換えられるためです。

さらに、量化がすべて有界である論理式 $\psi(x)$ の前に $\exists x$ をひとつ付けた文 $\exists x \, \psi(x)$ についても、$\mathbb{N}$ で成り立つならば $\mathsf{PA}$ で証明できます。条件を満たす自然数 $n$ が実際に存在するので、$\psi(\overline{n})$ を証明すればよいからです。

ただし、こちらは成り立たない場合に否定が証明できるとは限りません。この違いは #5 で使います。

## 表現可能性定理

表現可能性について、次の定理が成り立ちます。

> 計算可能な関係と計算可能な関数は、すべて $\mathsf{PA}$ で表現可能である。

ここで計算可能とは、成り立つかどうか（関数の場合は値）を、機械的な手順によって有限の時間で求められることを指します。正確な定義には再帰的関数やチューリング機械を使いますが、ここでは立ち入りません。

この定理の証明は長いので、方針だけを述べます。

### 計算の過程を列として表す

ある関数が計算可能であるとき、その計算は有限個のステップからなります。そこで、「入力 $n$ に対する出力が $m$ である」ということを、次のように言い換えます。

- 計算の途中経過を並べた有限の列が存在する
- その列の最初の項は入力から決まり、それぞれの項は直前の項から決まった規則で得られ、最後の項から出力 $m$ が得られる

2番目の条件は、列の長さまでの範囲で各項を調べればよいので、有界な量化で書けます。したがって、有限の列を $\mathsf{PA}$ の論理式の中で扱うことができれば、全体を「有界な量化だけの論理式の前に $\exists$ を付けた形」で書けることになります。

### β 関数

#2 では、有限の列を素数の指数を使ってひとつの自然数にまとめました。しかし $\mathsf{PA}$ の言語にあるのは足し算と掛け算だけで、指数を表す記号はありません。そのため、同じ方法をそのまま論理式として書くことはできません。

この問題は、ゲーデルの β 関数によって解決されます。β 関数は次のように定義されます。

$$
\beta(a, b, i) = a \text{ を } 1 + (i + 1) \cdot b \text{ で割った余り}
$$

割った余りは、足し算と掛け算と大小関係だけを使って書けます。実際、$\beta(a, b, i) = y$ は次の論理式で表せます。

$$
y < 1 + (i + 1) \cdot b \ \land \ \exists q \, \bigl( a = q \cdot (1 + (i + 1) \cdot b) + y \bigr)
$$

β 関数について、次の補題が成り立ちます。

> どんな自然数の有限列 $k_0, k_1, \ldots, k_n$ に対しても、自然数 $a$ と $b$ をうまく選ぶと、すべての $i \le n$ について $\beta(a, b, i) = k_i$ となる。

これは中国剰余定理から導かれます。この補題によって、有限の列を2つの自然数 $a$ と $b$ の組で表し、その $i$ 番目の項を $\beta(a, b, i)$ として取り出すことができます。

### β 関数を使った例

β 関数の使い方を、2 の累乗を例にして見てみます。$\mathsf{PA}$ の言語には指数の記号がありませんが、「$y = 2^x$」という関係は論理式で書けます。

$2^x$ を計算する過程は、$1, 2, 4, \ldots, 2^x$ という列です。この列は、最初の項が 1 で、それぞれの項が直前の項の 2 倍になっています。そこで、$y = 2^x$ を次のように表します。

$$
\exists a \, \exists b \, \Bigl( \beta(a, b, 0) = 1 \ \land \ \forall i \, \bigl( i < x \to \beta(a, b, i + 1) = \beta(a, b, i) + \beta(a, b, i) \bigr) \ \land \ \beta(a, b, x) = y \Bigr)
$$

ここでは見やすさのために $\beta$ を関数の記号のように書いていますが、実際には上で示した論理式に展開して書きます。

一般の計算可能な関数についても、計算の過程を列として表し、同じ形の論理式を作ります。その論理式が実際に関数を表現していることは、前の節で述べた有界な量化の性質を使って確かめます。

## 証明の関係の表現

#2 で見たように、$\mathrm{Proof}(m, n)$ は計算可能な関係です。したがって、表現可能性定理によって、これを表現する論理式が存在します。その論理式を $\mathrm{Prf}(x, y)$ と書くことにします。

- $\mathrm{Proof}(m, n)$ が成り立つならば、$\mathsf{PA} \vdash \mathrm{Prf}(\overline{m}, \overline{n})$
- $\mathrm{Proof}(m, n)$ が成り立たないならば、$\mathsf{PA} \vdash \lnot \mathrm{Prf}(\overline{m}, \overline{n})$

これを使って、論理式 $\mathrm{Prov}(y)$ を次のように定めます。

$$
\mathrm{Prov}(y) \ :\equiv \ \exists x \, \mathrm{Prf}(x, y)
$$

$\mathrm{Prov}(y)$ は、「$y$ をゲーデル数とする論理式には証明が存在する」という内容を、$\mathsf{PA}$ の論理式として書いたものです。

以降、論理式の中に $\ulcorner \varphi \urcorner$ と書いたときは、$\varphi$ のゲーデル数の数項を表すことにします。すると、次のことが成り立ちます。

$$
\mathsf{PA} \vdash \varphi \quad \text{ならば} \quad \mathsf{PA} \vdash \mathrm{Prov}(\ulcorner \varphi \urcorner)
$$

$\mathsf{PA} \vdash \varphi$ であれば、$\varphi$ の証明が存在します。そのゲーデル数を $m$ とすると $\mathrm{Proof}(m, \ulcorner \varphi \urcorner)$ が成り立つので、$\mathsf{PA} \vdash \mathrm{Prf}(\overline{m}, \ulcorner \varphi \urcorner)$ です。ここから $\mathsf{PA} \vdash \exists x \, \mathrm{Prf}(x, \ulcorner \varphi \urcorner)$ が得られます。

一方で、$\mathrm{Prov}(y)$ は「証明できる」という性質を、表現可能性の定義の意味で表現しているわけではありません。$\varphi$ が証明できない場合に、$\mathsf{PA} \vdash \lnot \mathrm{Prov}(\ulcorner \varphi \urcorner)$ となることは保証されていないためです。$\mathrm{Prf}(x, y)$ の前に上限のない $\exists$ が付いていることが、その理由です。

## まとめ

- 自然数の関係 $R$ が表現可能であるとは、個々の自然数の組について、$R$ が成り立つときは対応する文が、成り立たないときはその否定が、$\mathsf{PA}$ で証明できることをいう
- 計算可能な関係と関数は、すべて $\mathsf{PA}$ で表現可能である
- 証明では、有界な量化の性質と、有限の列を足し算と掛け算だけで扱うための β 関数を使う
- $\mathrm{Proof}(m, n)$ を表現する論理式 $\mathrm{Prf}(x, y)$ から、$\mathrm{Prov}(y)$ を $\exists x \, \mathrm{Prf}(x, y)$ として定める

次回は対角化補題を扱います。これは、変数をひとつ持つ論理式 $\varphi(y)$ に対して、$\mathsf{PA} \vdash \psi \leftrightarrow \varphi(\ulcorner \psi \urcorner)$ となる文 $\psi$ が存在するという補題です。
