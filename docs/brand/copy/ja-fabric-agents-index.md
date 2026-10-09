Contract: brand-contract v1

<!-- Generated from ja/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabricが対応するコーディングエージェント | Fabric | PassionCode.ai

2026年10月8日時点で、Fabric 0.3.2はClaude Code、Kilo Code、Hermes Agentと連携します。CodexとClineはFabricのツールなしでFabric内で動作し、さらに5つのエージェントが計画の次にあります。

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

简体中文

ダウンロード

↓

FABRIC · 対応コーディングエージェント

# コーディングエージェント

# Fabricが対応する

Fabricがプロジェクト内で起動できるエージェント、そのうちFabric独自のツールを使えるもの、これから対応するもの

基準日：2026年10月8日 · リリース版アプリはFabric 0.3.2です

リリース版アプリでは、Fabricは次のエージェントと連携します。Claude Code, Kilo Code および Hermes Agent。プロジェクトのターミナルでエージェントを起動し、そのセッションの間、Fabricのツールを渡します。Codex および Cline はFabric内で動作しますが、Fabricのツールはまだ使えません。さらに5つのエージェントが計画の次にあり、その後に下に挙げたエージェントが続きます。Fabric Switchboardは、Claude CodeとCodexのサブスクリプションアカウントと、その他のエージェントのAPIキーアカウントをSwitchboard経由で切り替えます。

01 / 「対応」の意味

## 3つのレベル

## 各エージェントは1つのレベルに属します

Fabricとの連携にはさまざまな意味があり得るため、このページでは各エージェントのレベルを明記しています。

連携済み

### Fabricのツール付きで起動

Fabricはプロジェクトのターミナルでエージェントを起動します。そのセッションの間だけ、エージェントはFabric独自のツール（担当の確保、引き継ぎ、メモリ、ボード）を使えます。このアクセスは1セッション限りの認証情報で行われ、エージェント自身の設定には何も書き込まれません。

FABRIC内で動作

### プロジェクトフォルダで起動

Fabricはプロジェクトのフォルダでエージェントを起動するため、エージェントはそのプロジェクトのファイルで作業します。Fabricのツールはまだ使えません。

計画中

### 計画上の順序

このエージェントを連携する予定です。下の計画は順序を示すもので、日付ではありません。

02 / 連携済み

## 連携済み

## セッション用のFabricのツール

Claude Code、Kilo Code、Hermes Agentの3つで、いずれもリリース版アプリで利用できます。

連携済みのエージェント（2026年10月8日時点）

エージェント

公式サイト

現在の状況

Claude Code

claude.com

リリース済み（Fabric 0.3）

Kilo Code

kilo.ai

リリース済み（Fabric 0.3.2）

Hermes Agent

hermes-agent.nousresearch.com

リリース済み（Fabric 0.3.2）

Kilo Codeはセッション設定をKILO_CONFIG_CONTENT変数から読み込み、プロジェクト自身のkilo.jsonでは上書きできません。この動作は2026年10月5日にKilo 7.4.17で確認しました。Hermes Agentはオープンな Agent Client Protocol で接続します。Fabricがセッションを開き、ローカルのブリッジ経由でFabricのツールを渡します。こちらも同日にHermes 0.21.4で確認しました。Hermesは、応答する前に、自身のセットアップでモデルを選んでおく必要があります。

03 / FABRIC内で動作

## Fabric内で動作

## まだ未連携

Fabricはプロジェクトフォルダでエージェントを起動します。エージェントはそこでFabricのツールなしで作業します。

Fabric内で動作するエージェント（2026年10月8日時点）

エージェント

公式サイト

現在の状況

Codex

github.com/openai/codex

プロジェクトフォルダで動作、Fabricのツールはまだなし

Cline

cline.bot

リリース済み（Fabric 0.3.2）。各ツールの実行前に確認を求めます。Fabricのツールはまだなし

04 / 計画中

## 計画中

## この順序で

次の5つをまとめて対応し、最後の9つは個別に判断します。いずれもFabricのツールはまだ使えません。

計画中のコーディングエージェント（順序つき、2026年10月8日時点）

エージェント

公式サイト

順序

omp (oh-my-pi)

omp.sh

次にまとめて対応

pi

pi.dev

次にまとめて対応

OpenClaw

openclaw.ai

次にまとめて対応

OpenHands

openhands.dev

次にまとめて対応

Cursor CLI

cursor.com/cli

次にまとめて対応

Command Code

commandcode.ai

個別に判断

DeepSeek Harness

deepseek.com/harness

個別に判断

LangChain Deep Agents (dcode)

docs.langchain.com

個別に判断

Letta

letta.com

個別に判断

Strix

strix.ai

個別に判断

goose

goose-docs.ai

個別に判断

Qwen Code

github.com/QwenLM/qwen-code

個別に判断

Gemini CLI

geminicli.com

個別に判断

OpenCode

opencode.ai

個別に判断

### デスクトップアプリとエディタ

Zed、ZCode、Proto、CodeGPT、Freebuff、HackerAIは、他のプログラムから起動できないデスクトップアプリとエディタです。代わりにFabricのローカルハブのクライアントになれます。それぞれに専用の手順を文書化する必要があり、その手順は計画中で、まだ書かれていません。

計画中のデスクトップアプリとエディタ（2026年10月8日時点）

アプリ

公式サイト

経路

Zed

zed.dev

ローカルハブのクライアント、手順は計画中

ZCode

zcode.z.ai

ローカルハブのクライアント、手順は計画中

Proto

proto.erp.ai

ローカルハブのクライアント、手順は計画中

CodeGPT

codegpt.co

ローカルハブのクライアント、手順は計画中

Freebuff

freebuff.com

ローカルハブのクライアント、手順は計画中

HackerAI

hackerai.co

ローカルハブのクライアント、手順は計画中

05 / 計画中のエージェントの接続方法

## 1つのオープンプロトコル

## 計画中のエージェント向け

計画中のエージェントは、Agent Client Protocol（ACP）で接続します。セッションの開始時にそのセッションのMCPサーバーを渡せるため、FabricはこのプロトコルをサポートするどのエージェントでもFabricから動かせます。

06 / これらのエージェントを選んだ理由

## 選定の基準は

## 実際の利用状況

次をもとに選びました：OpenRouterの公開アプリランキング（2026年10月5日に確認）。日次トップ30のうち15がコーディングエージェントまたはエージェントハーネスです。Fabric 0.3.2から連携しているHermes Agentが最大のシェアを占めています。

07 / アカウント

## アカウントの切り替え

## 現在はClaude CodeとCodex

Fabric Switchboardは、Claude CodeとCodexのサブスクリプションアカウントを切り替えます。0.6.1以降は他のエージェントにも対応しています。各エージェントにSwitchboardのツールが渡され、カスタムエンドポイントを受け付けるエージェントは、リクエストをSwitchboard経由で送れます。Switchboardがそのエージェントの、APIキーのアカウントを切り替えます。各エージェントと接続方法。

macOS 版をダウンロード

↓

Switchboard を見る

↗

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
