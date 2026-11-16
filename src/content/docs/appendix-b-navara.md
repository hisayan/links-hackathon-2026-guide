---
title: 付録B Navara で 3D 地図を作る
---

## Navara とは

PLATEAU の建物、地形、衛星写真などを **3D の地球儀** に表示できる地図エンジンです（[maplibre/navara](https://github.com/maplibre/navara)）。
サンプルの `web-navara/` で使っています。

```
web-navara を起動して
```
→ `http://localhost:5174`

- 地形: 国土地理院 標高タイル
- 建物: PLATEAU 全国の建築物（左上で切り替え）
  - **LOD1**（箱型・軽い・全国）… 最初はこちら
  - **LOD2**（屋根の形まで・重い）… LOD2 が整備されている街だけ表示されます

## Claude に Navara を教える（スキル）

サンプルには **navara-usage スキル** が入っています（`.claude/skills/navara-usage/`）。

```
Navara で、建物を高さで色分けして
```
<!-- TODO(verify): 上のプロンプトで実際に動くか。Eukarya さんおすすめのプロンプト例 -->

:::tip[☕ Coffee Break：スキルって何？]
Claude に渡す「この道具の取扱説明書」です。新しい道具でも、説明書があれば Claude は正しい使い方で作業できます。
:::

:::tip[☕ Coffee Break：夕方に開いたら真っ暗！？]
Navara は**本物の太陽の位置**で空と影を描きます。時刻を指定しないと「今」になるので、夜に開くと真っ暗です。
サンプルは「日本時間の正午」に固定しています（`view.atmosphere.date`）。
:::

## 注意

- 最初の読み込みが重め（約 30MB）です。会場の Wi-Fi が混んでいると時間がかかります
- 古い PC では動きがカクカクすることがあります <!-- TODO(verify): 内蔵 GPU の Windows ノートでの体感 -->

## 困ったら

当日は Navara の開発元 **株式会社Eukarya（ユーカリヤ）** の方がオンラインでサポートしてくれます。
<!-- TODO: 連絡方法（Slack / Discord チャンネル等） -->
