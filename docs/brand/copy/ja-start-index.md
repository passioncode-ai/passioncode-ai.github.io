Contract: brand-contract v1

<!-- Generated from ja/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

はじめる | AIエージェントワークプレースをインストール | PassionCode.ai

コマンド1つ、または Claude Code や Codex に貼るプロンプト1つで PassionCode.ai をセットアップできます。ツール、その MCP サーバー、スキルまでまとめて設定します。すでにある環境も、同じコマンドが点検して修復します。無料のオープンソース。

本文へスキップ

PassionCode

.ai

ビジョン

個人向け

組織向け

ツール

概要

日本語

English

Русский

Deutsch

Français

Polski

한국어

Español

Português (Brasil)

简体中文

セットアップ

↓

はじめる · 無料のオープンソース

# 何もないコンピューターから最初のエージェントまで

働き続け、ほかのエージェントがしたことを知っているエージェントを作りましょう。コマンド1つでツールをセットアップし、あとで同じコマンドが点検します

Node.js 18 以降と、Claude Code または Codex が必要です Fabric にはどのシステムでも Docker と Supabase CLI が必要です

→

コマンド1つ

01

エージェントの作成と対応

02

動かして確認

03

次のエージェントを追加

+

コントリビュート

コマンド1つ

## すべてをセットアップ、

## または今ある環境を点検

macOS では、コマンド1つで、選んだツールを署名済みリリースからインストールし、その MCP サーバーを Claude Code、Codex、Gemini CLI、Kimi Code に接続し、スキルを追加します。Windows と Linux では、アプリをそれぞれのページからダウンロードしてから、同じコマンドでスキルと MCP サーバーを設定します。すでにセットアップ済みのコンピューターでは、同じコマンドがすべてを点検し、問題を修復し、変わった点を示します。

### 自分で実行する

npx @passioncode-ai/passioncode@latest setup

Node.js 18 以上が必要 · 署名、チェックサム、公証のいずれかが合わないものは何もインストールしません · 実行後はコーディングエージェントを再起動します · 何も変えずに点検だけするには：

npx @passioncode-ai/passioncode@latest doctor

### または、コーディングエージェントに任せる

このプロンプトを Claude Code、Codex などのコーディングエージェントに貼り付けてください。エージェントがコマンドを実行し、できることを済ませ、あなたにしかできないこと（サインイン、アクセスの許可、ツール自身の入力欄へのキー入力）だけを短い一覧で伝えます。

このコンピューターに PassionCode.ai をセットアップして。すでにセットアップ済みなら点検して修復して。npx --yes @passioncode-ai/passioncode@latest setup --yes --json を実行し（Node 18 以降が必要）、その JSON を読んで。このコマンドは、macOS では足りないアプリを署名済みリリースからインストールし、Windows と Linux では代わりに各アプリのダウンロードページを示す。どのシステムでもスキルとすべての MCP サーバーを設定し、問題を修復して、すべてをもう一度点検する。何も手作業でダウンロードやインストールをせず、実行中のアプリを止めたり強制終了したりは絶対にしないで。そのあと、一覧にある製品のオンボーディング手順のうちエージェントが実行してよいものを実行し、チャットで私にキーやパスワードを絶対に尋ねず（ツールが自分の非表示の入力欄を開く）、最後に npx --yes @passioncode-ai/passioncode@latest doctor を実行して。何をセットアップまたは修復したか、何がまだ失敗しているか、サインインや、Windows と Linux ではアプリをそれぞれのページからインストールしてコマンドをもう一度実行することのように、私にしかできない手順を番号付きで短く伝え、新しいスキルと MCP サーバーを読み込むためにあなたを再起動するよう私に知らせて。

Fabric は早期プレビューで、どのシステムでも Docker と Supabase CLI が必要です。macOS では、両方がコンピューターにあればコマンドがインストールし、なければ何を追加すればよいかを伝えます。Windows と Linux では、先にFabric のページからダウンロードしてインストールしてください。

手作業で進めたい場合

01

### Fabric を追加

Fabric は、プロジェクトとそのエージェントのための拠点です。各プロジェクトの目的、ボード、決定事項、リリースがここに置かれます。最初の画面には、エージェントを作成する、お手持ちのエージェントを対応させる、プロジェクトを開く、プロジェクトを作成する、の4つの操作があります。早期プレビュー版のため、Docker と Supabase CLI が必要で、会話はメッセージを保存しますが、まだ応答しません。

Fabric をダウンロード

0.3.11

（macOS 向け）

↓

Windows と Linux 向け

要件と制限

Apple silicon・Intel · 署名・公証済み · SHA-256 283e64e7cf4ac14ef60f76aa1cbecbf1e2ef7a28c2f65ca14d00d346a249aa5e · リリースノート

02

### Fabric Dashboards を追加

Fabric Dashboards は、ローカルのエージェントサービスをすべて1つのウィンドウに表示します。ダウンロードしてから、MCP 経由でコーディングエージェントに接続します。

Fabric Dashboards をダウンロード

0.7.27

↓

Windows と Linux 向け

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Switchboard、Project Observatory、Fabric Inbox は、それぞれ個別にダウンロードできます：Switchboard · Observatory · Inbox

## 次のステップ

01

### エージェントの作成と対応

Claude Code または Codex で必要なことを依頼するか、Fabric の作成（Create）と対応（Adapt）の操作から始めます。どちらの場合も、作業はコーディングエージェントのコンソールで進みます。Fabric Agent Adapter スキルは、まず質問し、何かを変更する前に計画を示します。対応させる作業は、新しいfabric-adapterブランチで行います。コントラクト、ダッシュボード、テスト、適合性レポートが得られます。

新規 毎朝アプリストアのレビューを確認し、返信の下書きを作成する Fabric エージェントを作成して

対応させる このリポジトリを Fabric に対応させる

02

### 動かして確認

Fabric Dashboards は、ローカルのエージェントサービスをすべて1つのウィンドウに表示し、エージェントは MCP 経由でそれらを起動、停止、表示できます。同じコマンドが macOS にインストールし、コーディングエージェントに接続します。

03

### 次のエージェントを追加

次のエージェントも同じ方法で作り、Fabric の同じプロジェクトに割り当てます。Fabric につながったエージェントは、1つのプロジェクトのボード、メモリ、引き継ぎを共有するので、1つのエージェントが止めたところから別のエージェントが続けられます。現在つながるエージェント

エージェントが行う変更には、別のオープンソーススキルである task-pipeline をおすすめします：できることとインストール方法

コントリビュート

## 修正したい点を見つけましたか？

## プルリクエストを送る

すべてのプロダクトのリポジトリは公開されており、テストコマンドはAGENTS.mdに書かれています。組織のCONTRIBUTING.mdに従って、プルリクエストを開いてください。開くと、次のリポジトリ規約に同意したことになります：CLA.md。

fabric

fabric-switchboard

fabric-dashboards

fabric-inbox

project-observatory-dashboard

fabric-agent-adapter

fabric-agent-contract

passioncode

okolos

fabric-vr

passioncode-ai.github.io

組織向け

## チーム全体での

## 運用をご希望ですか？

プロセスを洗い出し、エージェントが引き受けられる範囲を見積もり、お客様とともに、またはお客様に代わってセットアップします。

見積もりとご依頼

→

PassionCode

.ai

バイブコーディングからパッションコーディングへ

はじめる

ビジョン

組織向け

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub とソース

概要

投資家の方へ

コントリビュート

報道関係の方へ

デザインシステム

プライバシー

commercial@passioncode.ai

X

↗
