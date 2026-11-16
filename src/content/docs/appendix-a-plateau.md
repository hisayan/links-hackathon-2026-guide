---
title: 付録A Project PLATEAU にふれてみよう
---

## PLATEAU とは

国土交通省が進める、**日本全国の 3D 都市モデル** のオープンデータです。
建物の形だけでなく、**用途・高さ・建てられた年** などの情報（属性）も入っています。

- 公式サイト: https://www.mlit.go.jp/plateau/
- 見てみる: PLATEAU VIEW <!-- TODO: URL -->
- データを探す: G空間情報センター <!-- TODO: URL -->

今回のテーマ例「**3D都市モデルの活用を全国に広げるには？**」に直結します。

## データの形式

| 形式 | 用途 |
|---|---|
| CityGML | 元データ（属性が一番くわしい） |
| 3D Tiles | Web で 3D 表示する用（サンプルの 3D 版で使用） |
| MVT | 2D 地図に重ねる用 |

:::tip[☕ Coffee Break：2D の地図と 3D の地図はどう違う？]
2D の地図は「上から見た絵」、3D は「街の模型」。模型なら、建物の高さや、日当たり・浸水の深さまで表現できます。
:::

## Claude に PLATEAU を教える（スキル）

サンプルには **plateau-api スキル** が入っています（`.claude/skills/plateau-api/`）。Claude は PLATEAU 配信サービスの URL の書き方や API の使い分けを知った状態で作業します。

```
plateau-api スキルを使って、横浜市の建物を表示したい。どの URL を使えばいい？
```

- 配布元: [Project-PLATEAU/skills](https://github.com/Project-PLATEAU/skills)
- データを動的に調べたい人向けに **PLATEAU MCP Server** もあります（試験提供）: https://docs.plateauview.mlit.go.jp/mcp/overview/

## 出典の書き方

PLATEAU を使ったら、画面や発表資料に出典を書きましょう。
例: 「3D都市モデル（Project PLATEAU）国土交通省」
<!-- TODO(verify): PLATEAU の正式な利用規約・出典表記ルール -->
