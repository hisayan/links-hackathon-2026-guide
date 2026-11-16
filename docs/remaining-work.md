# 残作業と注意点（運営・メンター向けメモ）

最終更新: 2026-11-16 / イベント: 2026-11-28（土）・29（日）

> このファイルは手順書サイトには表示されませんが、GitHub のリポジトリ（public）からは誰でも読めます。
> 合鍵・アカウント ID・個人名・セキュリティ上の細かい弱点などは書かないこと。それらは手元のメモで管理する。

## 関係するもの

| もの | 場所 |
|---|---|
| 手順書サイト | https://hisayan.github.io/links-hackathon-2026-guide/ |
| 手順書リポジトリ | https://github.com/hisayan/links-hackathon-2026-guide （原稿は `src/content/docs/`） |
| サンプル | https://github.com/hisayan/links-hackathon-2026 |
| スクショ用スクリプト | 作成者の手元のみ（Playwright で画面・Claude Code の画面・番号付き赤枠を作るもの） |

## 確認済み（2026-11-16）

- Mac / Windows × 🛡️ 安全コース / 🚀 直接コース：地図・AI・デプロイまで全部 OK（3D は Mac・Windows とも安全コースで OK）
- Windows 安全コースの `npm install` EPERM → 開発者モード ON で解決
- sandbox の Node.js → nodejs.org から v24 を入れる（arm64 / x64 とも OK）
- aws-core プラグイン・aws-mcp：sandbox でも動く
- 6章の頼み方 6-2〜6-5：全部動く（6-3・6-5 は 10 分以上かかる）
- 準備用の Workshop アカウントでは、EC2 で Windows を起動できそう（当日のアカウントは未確認）

---

## 🔴 優先度高（当日トラブルになりそう）

- [ ] **チーム内でデプロイが上書きし合う**
  スタック名が `LinksHackathonApp` 固定。同じアカウントで 2 人が `npm run deploy` すると後の人で置き換わり、`destroy` で他人の分も消える。
  案: `-c name=xxx` でスタック名を変えられるようにする／手順書に「デプロイはチームで 1 人」と書く
- [ ] **`ThrottlingException`（AI が混んでいる）をトラブル集に追加**
  対処: 少し待つ／`/model` で Sonnet に切り替える
- [ ] **合鍵の有効期限を確認**（3章 TODO）
  長い改造（10 分以上）の途中で切れたときの症状と、貼り直し後に Claude Code を再起動する必要があるかも確認
- [ ] **Windows の `npm.ps1`「スクリプトの実行が無効」エラーが出るか確認**（1章 TODO）
  出るなら `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` の案内を 1章に（トラブル集には記載済み）
- [ ] **当日の回線対策：sandbox の初回作成を事前にやってもらう**
  sbx のイメージ・npm パッケージ・Node.js のダウンロードが全員同時に走ると重い。1章のチェックリストに「家で一度 `sbx env run` まで通しておく」を入れる

## 🟡 手順書の穴

- [ ] 8章（GitHub）：安全コースで `sbx secret set github` → `gh repo create` / `git push` が通るか。作り直しが必要か
- [ ] 付録「後片付け」：`npm run destroy`、アンインストール（sbx / Claude Code / Node.js）、開発者モード・Hypervisor Platform を OFF に戻す、CDKToolkit とアセットバケット（自分のアカウントで続ける人向け）
- [ ] サンプルの README に手順書サイトへのリンク
- [ ] プロンプト集：LINKS データの具体例（ポータル: https://www.geospatial.jp/ckan/dataset/project-links ）
- [ ] 6章の頼み方に「2D 版（web-maplibre）だけ」を付けるか（付けないと 3D 版まで直して時間がかかる）
- [ ] 4章：参加者に勧めるモード（default / auto など）の最終決定
- [ ] 4章：サンプルのフォルダー外で起動したときの画面
- [ ] 6章：`/rewind` の選択肢の表示名
- [ ] 1章：Homebrew が入っていない人向けの一言（https://brew.sh ）
- [ ] 1章：Windows のバージョンによる「開発者モード」の場所の違い
- [ ] 付録A：PLATEAU VIEW と G空間情報センターの URL
- [ ] 付録B：上のプロンプトが動くか、内蔵 GPU の Windows ノートでの体感
- [ ] 付録C：実際に EC2 Windows を立てて、接続 → Claude Code → 地図まで動くか

## 🟢 スクリーンショット

- [ ] 2章：GitHub の「Code → Download ZIP」（Playwright で撮れる）
- [ ] トップページ：3D 版（Navara）の完成画面（headless の WebGL に注意。2D は swiftshader で撮れた）
- [ ] 8章：GitHub のトークン作成画面（自分で撮る・トークンは塗りつぶし）
- [ ] 6-3 の画像に 6-5 の住所の行が写っている（気になれば撮り直し）

## ⚪ 情報待ち

- [ ] Eukarya さん：当日の連絡方法、おすすめのプロンプト
- [ ] PLATEAU：正式な利用規約・出典表記ルール
- [ ] 運営：審査基準（プロンプト集に反映）
- [ ] AWS さん：当日のアカウントで使えるモデル・EC2（付録C）・費用の上限

## その他

- [ ] 当日のスライド（Marp）
- [ ] サイトの favicon

---

## 注意点（メンター向け）

### セキュリティ

- **公開 URL（AppUrl）を知っている人は、誰でもアプリの AI を使える**。SNS などに貼らないよう案内済み（7章）。終わったら `npm run destroy` を勧める
- **`.env`（合鍵）は Claude に読ませない設定にしてあるが、万能ではない**。参加者には「合鍵を Claude に見せてと頼まない」「画面共有や写真に写さない」と伝える
- 公開リポジトリに `.env` を上げないよう、8章の頼み方に「`.env` が含まれていないか確認してから」を入れてある

### 当日よくありそうなこと

- **時計のずれ** → `403 Signature expired`。PC の時刻を自動設定に（Windows で実際に発生）
- **ターミナルを開き直していない** → `claude` / `node` が「見つかりません」
- **ZIP を 2 回ダウンロード** → `links-hackathon-2026-main (1)` のようにフォルダー名が変わる。Windows は展開すると二重フォルダーになる
- **sandbox の名前が固定**（`links-hackathon-2026`）→ 同じ PC に 2 つ目のコピーを作ると衝突する。古い方を `sbx env rm` してから
- **古い sandbox は Node.js 20 のまま** → `sbx env rm` → `sbx env run` で作り直すと v24 になる
- **安全コースは Apple シリコンの Mac か Windows 11 だけ**。Intel Mac は直接コースへ
- **会場の回線**：PLATEAU の建物（特に LOD2）は重い。初期値は LOD1
- **デプロイは約 5 分**（CloudFront の配信準備）。止まっているように見えても待つ
- **モデル**：Fable 5.2 / 5.1 は使えない（`AccessDeniedException`）。当日も変わる可能性あり
- **イベント後にアカウントごと消える**。残したい人は 8章で GitHub に保存
