Contract: brand-contract v1

<!-- Generated from ja/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

はじめる | AIエージェントワークプレースをインストール | PassionCode.ai

PassionCode.ai のスキルをインストールし、Fabric を追加し、Claude Code または Codex で最初の Fabric エージェントを作成し、既存のプロジェクトを変換し、Fabric Dashboards で動かし、同じファミリーに次のエージェントを加えます。無料のオープンソースです。

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

ツールを入手

↓

はじめる · 無料のオープンソース

# 何もない Mac から 最初のエージェントまで

放置されて朽ち、互いに連携もしないエージェントを作るのはやめましょう。最初のエージェントから、目に見えるファミリーまで、5 つのステップで約 20 分です。各ステップはそれだけで役に立つので、結果に満足したところで止めてかまいません

Node.js 18 以降と、Claude Code または Codex が必要です Fabric には Apple silicon 搭載の macOS が必要です

01

スキルをインストール

02

Fabric を追加

03

エージェントを作成または変換

04

動かして確認

05

次のエージェントを追加

+

コントリビュート

## ステップ

01

### スキルをインストール

PassionCode.ai ランチャーは、Fabric Agent Adapter のスキル、Observatory Log、作業ルールを、Claude Code、Codex、その他の対応エージェントにインストールします。アカウントもキーも不要です。

npx @passioncode-ai/passioncode@latest update

ランチャー 0.1.31 · 固定されたバージョンでファミリーのメンバーをインストールします · 完了後はエージェントを再起動してください。自動アップデートは初期設定でオンです。ご希望の場合は、オフにすることもできます。

02

### Fabric を追加

Fabric は CEO AIエージェントです。各プロジェクトに、目的、ボード、決定事項、リリースの拠点が用意されます。早期プレビュー版のため、Docker と Supabase CLI が必要で、会話はメッセージを保存しますが、まだ応答しません。

Fabric をダウンロード

0.3.2

（macOS 向け）

↓

要件と制限

Apple silicon · 署名・公証済み · SHA-256 db0f1a2adcc3aae96100e98194268826b1514b26dd0d35e62fd2301e7337457b · リリースノート

03

### エージェントを作成または変換

Claude Code または Codex で、必要なことを依頼します。Fabric Agent Adapter スキルが、Fabric 互換のサービスを構築します。コントラクト、ダッシュボード、テスト、適合性チェックが含まれます。

新規 毎朝アプリストアのレビューを確認し、返信の下書きを作成する Fabric エージェントを作成して

変換 このリポジトリを Fabric に対応させる

既存のエージェント、MCP サーバー、コマンドラインツールのコードはそのまま残り、Fabric に必要なものをアダプターが周囲に追加します。Adapter クイックスタート · コントラクト

04

### 動かして確認

Fabric Dashboards は、ローカルのエージェントサービスをすべて 1 つのウィンドウに表示します。エージェントは MCP 経由でそれらを起動、停止、開くことができます。

Fabric Dashboards をダウンロード

0.6.5

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

続いて、作業に必要なものを追加します：Fabric Switchboard（複数のアカウントが必要なとき）、Project Observatory（プロジェクト全体の変更を確認）、Fabric Inbox（メール処理）。

05

### 次のエージェントを追加してファミリーを見渡す

必要になったら、同じ方法で次のエージェントを作成し、Fabric 内で同じプロジェクトを割り当てます。Fabric から始めた Claude Code、Kilo Code、Hermes Agent は、そのプロジェクトのボード、メモリ、引き継ぎを共有するため、一方が止まったところから他方が再開できます。Fabric Dashboards は、両方の状態と支出を 1 つのウィンドウに表示します。

次 下書きしたレビュー返信を、ボード向けの週次サマリーにまとめる Fabric エージェントを作成して

新しいエージェントはどれも、すでに目に見えるファミリーの一員になります。覚えるべきスクリプトがまた 1 つ増えることはありません。ファミリーの成長のしかた · 現在接続できるエージェント

おすすめのツール

## 始めた仕事を

## 最後までやり遂げるエージェント

エージェントが加える変更には、task-pipelineをおすすめします。独立したオープンソースのスキルで、sshlg-skillsファミリーに属します。変更をゲート付きのステージで進め、ブリーフと計画からテスト、デプロイ、受け入れまで、各ゲートを通過するまで次に進みません。

npx sshlg-skills install

GitHub の task-pipeline · PassionCode.ai には含まれず、PassionCode.ai を必要ともしません

コントリビュート

## 修正したい点を見つけましたか？

## プルリクエストを送る

すべてのプロダクトリポジトリは公開されています。各リポジトリでは、テストコマンドをAGENTS.mdに、クイックスタートを README に記載しています。コーディングエージェントは両方を読み取り、残りを実行できます。

### リポジトリを選ぶ

使っているプロダクトをフォークするか、組織のリポジトリを閲覧。ラベルが付いた Issue から始めるのがおすすめです。

### ゲートを実行

リポジトリのAGENTS.mdおよび組織のCONTRIBUTING.md。変更を加え、テストコマンドが通るまで実行します。

### プルリクエストを開く

プルリクエストを開くことは、リポジトリのCLA.mdへの同意とみなされます。チェックするボックスはありません。すべてのプルリクエストをレビューし、返信します。

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

一部のリポジトリは内部用で、共同作業者のみが閲覧できます。チームのナレッジベースと組織マップです。チームに参加したいですか？Sergey にメッセージを送る。

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

デザインシステム

プライバシー

commercial@passioncode.ai

Twitter

↗
