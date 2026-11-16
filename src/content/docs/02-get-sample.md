---
title: 2. サンプルを入手する
---

## 2-1. ZIP をダウンロードして展開

1. https://github.com/hisayan/links-hackathon-2026 を開く
2. 緑の「**Code**」ボタン →「**Download ZIP**」
3. ダウンロードした ZIP を展開（ダブルクリック／Windows は右クリック→「すべて展開」）
4. できたフォルダー `links-hackathon-2026-main` を、わかりやすい場所（デスクトップなど）に置く

<!-- TODO: スクリーンショット（Code ボタン / Download ZIP） -->

:::caution[Windows の人へ]
展開すると `links-hackathon-2026-main` の中に、もう一つ同じ名前のフォルダーができることがあります。
**`README.md` が見えるフォルダー**が正解です。
:::

:::tip[☕ Coffee Break：見えないファイルがある？]
フォルダーの中には `.claude` や `.env.example` という、名前が `.`（ドット）で始まるファイルがあります。
Mac の Finder や Windows のエクスプローラーは、これを**わざと隠して**表示しません。見えなくても、ちゃんと入っています。
:::

## 2-2. ターミナルでそのフォルダーに移動する

ターミナルで `cd `（cd と半角スペース）まで打ち、**フォルダーをターミナルの画面にドラッグ＆ドロップ**して Enter。

```bash
cd /Users/あなたの名前/Desktop/links-hackathon-2026-main
```

`ls`（Windows は `dir`）で `README.md` が表示されれば成功です。

:::tip[☕ Coffee Break：「どこにいるか」が大事]
ターミナルは、いつも「どこかのフォルダーの中」にいます。Claude は **起動したフォルダー** を作業場所にします。
だから、Claude を起動する前に、必ずこのフォルダーへ移動しておきます。
:::

## （参考）Git が使える人

```bash
git clone https://github.com/hisayan/links-hackathon-2026.git
cd links-hackathon-2026
```
