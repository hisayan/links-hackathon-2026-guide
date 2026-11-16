---
title: 困ったときは
---

> 💡 まずはエラーメッセージを **そのまま Claude に貼って**「どういう意味？どうすればいい？」と聞いてください。

## Claude が動かない・返事が来ない

| 表示されるメッセージ | 原因 | 直し方 |
|---|---|---|
| `awsCredentialExport did not return a valid value` | `.env` がない／中身が見本のまま | [3章](03-credentials.md) の手順で `.env` に貼る |
| `The security token included in the request is invalid` | コピーが途中で切れた／期限切れ | 📋 ボタンでコピーし直して貼る → Claude を再起動 |
| `403 Signature expired: … is now earlier than …` | **PC の時計がずれている**（AWS は送信時刻を署名に含めるので、数分以上ずれると拒否される） | 設定 →「日付と時刻」→「時刻を自動的に設定する」をオン・タイムゾーンを「(UTC+09:00) 大阪、札幌、東京」・「今すぐ同期」（Mac は「日付と時刻」→「日付と時刻を自動的に設定」） |
| `Could not load AWS credentials` | **🚀 Node.js が入っていない**（一番多い）／上の2つのどちらか／🛡️ `sbx run claude .` で起動した | `node --version` を確認 → なければ [1章](01-prepare.md) で入れて、ターミナルを開き直す／同上／🛡️ `sbx env run` で起動する |
| ログイン画面（Anthropic アカウント）が出る | サンプルのフォルダー以外で起動した | `/exit` → [2-2](02-get-sample.md) でフォルダーに移動してから起動 |
| モデルが使えない（`AccessDeniedException`） | 使えないモデルを選んだ（例: Fable） | `/model` で Opus / Sonnet / Haiku 5.5 を選ぶ（[4-4](04-start-claude.md#4-4-使える-aiモデル)） |
| `Plugin "aws-core" is enabled … but isn't installed` | プラグイン未インストール | `/plugin` → Errors → Enter、または `claude plugin install aws-core@anthropic-plugin-directory --scope project` |
| `Plugin "aws-core" is not loaded: the Anthropic Directory's catalog is not on this machine yet` | プラグインの一覧（カタログ）をまだ取ってきていない | `/reload-plugins` を実行（だめなら `/exit` して `claude plugin marketplace update anthropic-plugin-directory`） |
| `aws-core … not found in marketplace "claude-plugins-official"` | 古いサンプル（入手先の名前が古い） | ZIP をダウンロードし直す |
| 🛡️ `aws-mcp … 403 Forbidden` | sandbox が AWS MCP サーバーへの通信を許可していない | `sbx policy allow network --sandbox links-hackathon-2026 aws-mcp.us-east-1.api.aws:443`（新しい ZIP なら自動）。aws-core のスキルとデプロイは、これがなくても使えます |

## 🛡️ 安全コース（sbx）

| 表示されるメッセージ | 直し方 |
|---|---|
| `global network policy has not been initialized` | `sbx policy init balanced` → `sbx env rm` → `sbx env run` |
| （Windows）`npm install` が `EPERM` / `syscall: 'symlink'` で失敗 | 開発者モードがオフ。[1-A](01-prepare.md) の手順で ON にしてから `sbx env rm` → `sbx env run` |
| `postCreate … exit status` で止まった | `sbx env rm` → `sbx env run` でやり直す |

## インストール

| 症状 | 直し方 |
|---|---|
| `claude` / `node` が見つからない（`用語 'node' は…認識されません`） | ターミナルを**閉じて開き直す**（インストール後は必須） |
| `winget upgrade …` で「インストール済みのパッケージが見つかりません」 | `upgrade` ではなく `winget install …` |
| Windows で `…\.local\bin is not in your PATH`（`irm … \| iex` で入れた場合） | PowerShell で次の 2 行を実行 → 開き直す<br>`$currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')`<br>`[Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:USERPROFILE\.local\bin", 'User')`<br>（または `winget install Anthropic.ClaudeCode` で入れ直す） |
| Windows で `このシステムではスクリプトの実行が無効` (npm.ps1) | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` を 1 回実行（または `npm.cmd` と打つ） |
| Windows で `'irm' is not recognized` | コマンドプロンプトで実行している → PowerShell で実行 |
| Windows で `The token '&&' is not a valid statement separator` | PowerShell で実行している → [3章](03-credentials.md) の PowerShell 用コマンドを使う |
| 人によって sbx のバージョンが違う | OS ごとに配布タイミングが違うだけ。問題なし |

## アプリ

| 症状 | 直し方 |
|---|---|
| 「backend につながりません」 | backend が起動していない → Claude に「backend を起動して」 |
| 🛡️ ブラウザで localhost が開けない | `sbx env run` で起動したか確認（`sbx ls` の PORTS 欄に 5173 があるか） |
| 3D 版の空・建物が真っ黒 | 時刻の設定（[付録B](appendix-b-navara.md)） |
| 3D 版の LOD2 で建物が出ない | その街は LOD2 未整備 → LOD1 に切り替え |

<!-- TODO: デプロイ（CDK）関連のエラー、CORS、ポート使用中、など当日出たものを追記 -->
