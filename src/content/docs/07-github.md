---
title: 7. GitHub に保存する（発展）
---

作ったものを、イベント後も残せるように GitHub に保存します。
git の操作は **Claude に任せます**。あなたがやるのは「GitHub にログインできるようにする」ところだけです。

:::note[先に GitHub アカウントを作っておく]
https://github.com/signup （無料）
:::

## 7-1. GitHub にログインできるようにする（最初の 1 回だけ）

### 🚀 直接コース

1. **git と GitHub CLI（gh）を入れる**
   - Mac（ターミナル）
     ```bash
     brew install gh
     ```
     （git は `git --version` で確認。入っていなければ、出てきた画面で「インストール」を押す）
   - Windows（PowerShell）
     ```powershell
     winget install Git.Git
     winget install GitHub.cli
     ```
   入れたら **ターミナルを開き直す**
2. **ログインする**
   ```
   gh auth login
   ```
   質問には次のように答えます（矢印キーで選んで Enter）。

   | 質問 | 答え |
   |---|---|
   | Where do you use GitHub? | **GitHub.com** |
   | What is your preferred protocol for Git operations? | **HTTPS** |
   | Authenticate Git with your GitHub credentials? | **Y** |
   | How would you like to authenticate GitHub CLI? | **Login with a web browser** |

   画面に出た **8 文字のコード**をメモ → Enter でブラウザが開くので、コードを入れて「Authorize」
3. `gh auth status` で `Logged in to github.com` と出れば OK

### 🛡️ 安全コース

砂場の中には git と gh が最初から入っています。PC 側で「GitHub の合鍵（トークン）」を sbx に預けるだけです。
合鍵は sbx が預かり、**砂場の中の Claude には中身が見えません**。

1. **GitHub でトークンを作る**
   1. https://github.com/settings/tokens/new を開く（GitHub にログイン）
   2. Note（メモ）に `links-hackathon` などと入力
   3. Expiration（有効期限）は **7 days**
   4. Select scopes で **`repo`** にだけチェック
   5. 一番下の「Generate token」→ 表示された `ghp_…` を 📋 でコピー（**この画面を閉じると二度と表示されません**）
   <!-- TODO: スクリーンショット -->
2. **sbx に預ける**（PowerShell / ターミナルで。Claude の画面ではなく PC 側で）
   ```
   sbx secret set github
   ```
   「トークンを貼ってください」と聞かれたら貼り付けて Enter（画面には表示されません）
3. **砂場を作り直す**（合鍵は砂場を作るときに渡されるため）
   ```
   sbx env rm
   sbx env run
   ```
   <!-- TODO(verify): 作り直さず /exit → sbx env run だけで効くか -->

:::tip[☕ Coffee Break：なぜ砂場には「預ける」の？]
砂場の中の Claude に合鍵そのものを渡すと、うっかり画面に表示したり、ファイルに書いてしまうかもしれません。
sbx は合鍵を自分で持っていて、Claude が GitHub と通信するときだけ、出口で本物の合鍵に差し替えてくれます。
AWS の合鍵（`.env`）より安全なしくみです。
:::

## 7-2. Claude に保存してもらう

Claude に次のように頼みます（`my-map-app` は好きな名前に）。

```
このフォルダーを git で管理して、GitHub に my-map-app という非公開リポジトリを作って保存して。
.env が含まれていないことを確認してから push して
```

Claude が `git init` → `git commit` → `gh repo create … --private --push` を順に実行します。
最後に `https://github.com/（あなたの名前）/my-map-app` と表示されたら、ブラウザで開いて確認しましょう。

2 回目からは、これだけで OK です。

```
今の変更を GitHub に保存して
```

<!-- TODO(verify): 安全コースで gh repo create / git push が通るか（sbx secret set github 後） -->

:::caution[公開（public）にするときは]
最初は **非公開（private）** がおすすめです。公開すると世界中の誰でも見られます。
公開する前に、`.env` や個人情報が入っていないか Claude に確認してもらいましょう。
:::

:::tip[☕ Coffee Break：GitHub って何？]
コードの「置き場所」兼「変更の記録帳」です。いつ・誰が・何を変えたかが残るので、チームで作業しても安心。
ZIP と違って、間違えても前の状態に戻せます。
:::

:::tip[☕ Coffee Break：git と GitHub の違い]
**git** は、あなたの PC の中で「変更の記録帳」をつける道具です。
**GitHub** は、その記録帳をインターネット上に置いておく場所です。
「commit」は記録帳に 1 行書くこと、「push」は GitHub に送ることです。
:::

:::tip[☕ Coffee Break：GitHub に上げてはいけないもの]
- `.env`（AWS の合鍵）… このサンプルは `.gitignore` で自動的に除外しています
- `node_modules`（部品の山）… `npm install` でいつでも作り直せるので不要
:::
