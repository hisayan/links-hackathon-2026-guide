---
title: 1. 事前準備（当日までに）
---

## 1-0. コースを選ぶ

Claude（AI）にあなたの PC で作業してもらう方法は 2 つあります。

| | 🛡️ 安全コース | 🚀 直接コース |
|---|---|---|
| しくみ | AI の遊び場を「砂場（sandbox）」に限定する | Claude を PC で直接動かす |
| Claude が触れる範囲 | 砂場の中とサンプルのフォルダーだけ | PC 全体（毎回確認してくれる） |
| 入れるもの | sbx（＋ Docker アカウント） | Claude Code ＋ Node.js |
| 対象 PC | Apple シリコン Mac（M1 以降）/ Windows 11 | **どの PC でも** |
| 準備のむずかしさ | Mac：ふつう<br>Windows：**やや難しい**（管理者権限・再起動が必要） | かんたん |

**🚀 直接コース** は、準備がかんたんで、どの PC でも使えます。
Claude はあなたの PC の上で直接作業します。ファイルを書き換えたりコマンドを実行したりする前には、毎回「やっていいですか？」と確認してくれます。
ただ、Claude は「よかれと思って」動くので、**頼んでいないのに、作業とは関係のないファイルの中身を見にいったり、PC の設定を変えようとしたりすることも、絶対にないとは言い切れません**。
確認が出たら、内容を読んでから「はい」を押すようにしましょう。

**🛡️ 安全コース** は、**AI の遊び場を「砂場」に限定する**方法です。Claude は PC から切り離された砂場の中だけで作業します。
Claude が見たり変えたりできるのは、砂場の中とサンプルのフォルダーだけです。PC の設定や、写真・書類などのほかのファイルには届きません。通信できる相手も、開発に必要なところだけに絞られています。
準備に少し手間がかかりますが、**より安心して Claude に任せられます**。
ただし Windows では、**管理者として PC の設定を 2 か所変えて、再起動する**必要があります（[1-A](#1-a-️-安全コースの準備)）。

| こんな人は | おすすめ |
|---|---|
| はじめてで、まずは動かしてみたい | 🚀 直接コース |
| Mac で、PC の中身をしっかり守りたい | 🛡️ 安全コース |
| Windows で、管理者権限があり、事前の設定に 30 分ほどかけられる | 🛡️ 安全コース |
| Claude にどんどん任せて作業したい | 🛡️ 安全コース |

迷ったら **🚀 直接コース** で大丈夫です。あとから安全コースに切り替えることもできます。

:::caution[会社や学校から借りている PC の人へ]
会社の PC には、**ソフトのインストールや設定の変更が制限されている**ことがよくあります。
- 🛡️ 安全コース：Windows では管理者権限が必要なので、多くの場合そのままでは準備できません
- 🚀 直接コース：Node.js などのインストールが止められることがあります

どちらのコースでも、**事前に PC の管理者（情報システム部門など）に確認**してください。
また、会社の情報が入った PC で AI に作業させてよいかも、あわせて確認しておくと安心です。
**できれば、自分で自由に使える PC を持ってきてください。**
どうしても難しいときは、[付録C](appendix-c-cloud-pc.md)（AWS 上の Windows を使う）という手もあります。
:::

:::tip[☕ Coffee Break：sandbox（砂場）って何？]
公園の砂場では、山を作っても穴を掘っても、家の中は汚れませんよね。
sandbox は PC の中に作る「区切られた作業場所」、いわば **AI 専用の遊び場** です。
AI は砂場の中なら自由に遊べますが、柵の外には出られません。うっかり変なことをしても、あなたの写真や書類には届きません。
:::

## 1-A. 🛡️ 安全コースの準備

1. **Docker アカウントを作る** … https://app.docker.com/signup
2. **（Windows だけ）Hypervisor Platform を有効にする**
   スタートメニューで「PowerShell」を右クリック →「管理者として実行」→ 次を貼り付けて Enter
   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -All
   ```
   - 進み具合を示すバーが動いたあと、**「今すぐコンピューターを再起動しますか？ [Y] Yes [N] No」** と聞かれます
   - 開いているファイルを保存してから `Y` → Enter で**再起動**します（必須）
   - 再起動したら、ここから先は**普通の（管理者ではない）PowerShell** で進めます
3. **（Windows だけ）開発者モードを ON にする**
   「設定」→「システム」→「詳細設定」→「開発者向け」→ **開発者モード** を オン →「開発者モードをオンにしますか？」で **はい**
   - これがオフだと、砂場の中で `npm install` が `EPERM`（symlink）で失敗します
   <!-- TODO(verify): Windows のバージョンによって「詳細設定」ではなく「開発者向け」が直接ある場合の表記 -->
4. **sbx をインストールする**
   - Mac（ターミナル）
     ```bash
     brew trust docker/tap
     brew install docker/tap/sbx
     ```
     <!-- TODO: Homebrew 未導入の人向けの一言（https://brew.sh） -->
   - Windows（PowerShell。管理者でなくて OK）
     ```powershell
     winget install -h Docker.sbx
     ```
5. **ログインする** … `sbx login`（ブラウザが開きます）
   - 「open / balanced / locked down」と聞かれたら **balanced** を選ぶ（開発でよく使う通信先だけ許可する設定）
6. **通信の設定を確定する**（聞かれなかった人・聞かれた人も念のため）
   ```
   sbx policy init balanced
   ```
7. **確認** … `sbx version` で数字が出れば OK

参考: [Docker Sandboxes 公式ドキュメント](https://docs.docker.com/ai/sandboxes/install/)

## 1-B. 🚀 直接コースの準備

:::caution[インストールしたら、ターミナルを必ず開き直す]
インストールが終わっても、**開いたままのターミナル（PowerShell）は新しいプログラムを見つけられません**。
「見つかりません」「認識されません」と出たら、まずターミナルを × で閉じて、開き直してください。
:::

:::note[Windows で winget を初めて使うとき]
「すべてのソース契約条件に同意しますか？ [Y] はい [N] いいえ」と聞かれます。`Y` を押して Enter で OK です（初回だけ）。
:::

1. **Claude Code と Node.js をインストールする**
   - Mac（ターミナル）
     ```bash
     curl -fsSL https://claude.ai/install.sh | bash
     ```
     Node.js は https://nodejs.org/ から **LTS** 版をダウンロードしてインストール
   - Windows（PowerShell）… 2 行だけ（**両方とも**実行する）
     ```powershell
     winget install Anthropic.ClaudeCode
     winget install OpenJS.NodeJS.LTS
     ```

   :::danger[Node.js を忘れると Claude が動きません]
   このサンプルでは、Claude が AWS の合鍵（`.env`）を読むのに Node.js を使います。
   Node.js が入っていないと、Claude は起動しても `Could not load AWS credentials` になります。
   :::
2. **ターミナルを開き直して**確認
   ```
   claude --version
   node --version
   npm --version
   ```
   **3 つとも**数字が出れば OK（1 つでもエラーなら、そのインストールをやり直す）
   - <!-- TODO(verify): Windows で npm.ps1 の「スクリプトの実行が無効」エラーが出るか -->
   - 参考: [Claude Code 公式インストール手順](https://code.claude.com/docs/en/setup)
3. （Windows・おすすめ）**Git for Windows** … https://git-scm.com/downloads/win

:::tip[☕ Coffee Break：PATH って何？]
ターミナルに `claude` と打ったとき、PC は「claude という名前のプログラムがどこにあるか」を、決められたフォルダーの一覧から探します。この一覧が PATH です。
インストールしただけでは一覧に載らないことがあるので、「ここも探してね」と追加してあげます。
:::

:::tip[☕ Coffee Break：ターミナルって何？]
マウスの代わりに「文字で PC に指示する」画面です。
Mac は「ターミナル」、Windows は「PowerShell」を使います。
Windows で画面の先頭が `PS C:\` なら PowerShell です（`PS` がなければコマンドプロンプト）。
:::

## 1-C. 当日までのチェックリスト

- [ ] コースを決めた
- [ ] 🛡️ `sbx version` が数字を返す / 🚀 `claude --version`・`node --version`・`npm --version` の **3 つ**が数字を返す
- [ ] GitHub アカウントがある（7章で使う・なくても OK）
- [ ] PC の充電器を持っていく
