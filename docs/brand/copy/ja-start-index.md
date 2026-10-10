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

傷んでしまい、互いに話せないエージェントを作るのは、もうやめましょう。5つのステップ、約20分で、どれも単独で役立ちます

Node.js 18 以降と、Claude Code または Codex が必要です Fabric には Apple silicon または Intel 搭載の macOS が必要です

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

PassionCode.ai ランチャーが、Fabric Agent Adapter スキル、Observatory Log、作業ルールをコーディングエージェントにインストールします。アカウントもキーも不要です。

npx @passioncode-ai/passioncode@latest update

ランチャー 0.1.31 · インストール後にエージェントを再起動 · 自動更新はオン；オフにする

02

### Fabric を追加

Fabric は CEO AIエージェントです。各プロジェクトに、目的、ボード、決定事項、リリースの拠点が用意されます。早期プレビュー版のため、Docker と Supabase CLI が必要で、会話はメッセージを保存しますが、まだ応答しません。

Fabric をダウンロード

0.3.4

（macOS 向け）

↓

要件と制限

Apple silicon・Intel · 署名・公証済み · SHA-256 4d8e8da80bcf490fed955dd627ed64b76a1c53c50aa89de49ac6eaeed91f0653 · リリースノート

03

### エージェントを作成または変換

Claude Code または Codex で、必要なことを依頼します。Fabric Agent Adapter スキルが、Fabric 互換のサービスを構築します。コントラクト、ダッシュボード、テスト、適合性チェックが含まれます。

新規 毎朝アプリストアのレビューを確認し、返信の下書きを作成する Fabric エージェントを作成して

変換 このリポジトリを Fabric に対応させる

04

### 動かして確認

Fabric Dashboards は、ローカルのエージェントサービスをすべて 1 つのウィンドウに表示します。エージェントは MCP 経由でそれらを起動、停止、開くことができます。

Fabric Dashboards をダウンロード

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### 次のエージェントを追加してファミリーを見渡す

次のエージェントも同じ方法で作り、Fabric の同じプロジェクトに割り当てます。Fabric から起動した Claude Code、Kilo Code、Hermes Agent は、そのプロジェクトのボード、メモリ、引き継ぎを共有するので、1つのエージェントが止めたところから別のエージェントが続けられます。現在つながるエージェント

おすすめのツール

## 始めた仕事を

## 最後までやり遂げるエージェント

エージェントが加える変更には、task-pipelineをおすすめします。独立したオープンソースのスキルで、sshlg-skillsファミリーに属します。ブリーフから受け入れまで各変更を運び、各ゲートを通過するまで次へ進みません。

npx sshlg-skills install

GitHub の task-pipeline · PassionCode.ai には含まれず、PassionCode.ai を必要ともしません

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

デザインシステム

プライバシー

commercial@passioncode.ai

Twitter

↗
