Contract: brand-contract v1

<!-- Generated from ja/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | エージェントが運用するプロジェクトのローカルダッシュボード | PassionCode.ai

プロジェクト全体の変更点、対応が必要なもの、既知の API キーのコピーが残っている場所を確認できます。Project Observatory は PassionCode.ai のオープンソースのローカルダッシュボードで、英語またはロシア語で使えます。

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

ダウンロード対象：

↓

PROJECT OBSERVATORY · BY PASSIONCODE

# あなたのプロジェクトを

# もう一度見える状態に

エージェントが扱うプロジェクトの変更点、対応が必要なもの、既知の API キーのコピーが残っている場所を、英語またはロシア語で使えるローカルダッシュボードで確認できます

ファミリーの一員 記憶と根拠：各プロジェクトで何が変わり、何が決まり、何に対応が必要かを確認できます。ファミリー全体を見る

はじめる

↓

ソースを見る

↗

オープンソース · macOS + Linux · Python 3.11+

一つのビューで / あなたのプロジェクト

プロジェクト

+

検出事項

OBSERVATORY の中身

## まず、対応が必要なものから

実際の Observatory の概要画面。架空の会社のプロジェクトをエンジンが描画したものです。

合成データによるデモ環境 · 実際のプロジェクト、リポジトリ、認証情報は含みません

ローカルの OBSERVATORY

## 推測を減らし、

## 根拠を一目で確認

01 / 一覧

### 何があるかを把握

観察したいプロジェクトのフォルダを選びます。Observatory がその中のリポジトリを見つけ、ローカルのレジストリを保持します。各リンクの根拠となるルールも確認できます。

02 / アクティビティ

### 何が動いたかを確認

対象範囲のすべてのプロジェクトについて、コミット、作業ツリーの状態、このマシンにしかない作業を確認でき、各プロジェクトの週ごとの推移も分かります。

03 / 検出事項

### 重要なものから確認

検出事項には根拠と次のステップが付き、重大から情報の順に並びます。無効化された検出事項には、誰が、いつ、なぜ無効化したかが残ります。

04 / キー

### 既知のキーのコピーを見つける

認証情報のメタデータは値とは別に保持されます。選択したトランスクリプト、ログ、SQLite ストアを、ローカルで既知のキーと照合します。検出事項に値が繰り返し表示されることはありません。

05 / 言語

### 英語またはロシア語

ダッシュボードは初期状態では英語です。ワークスペースにはロシア語を設定でき、サイドレールの EN/RU でも切り替えられます。件数の表示には各言語の複数形が使われます。

06 / エージェント

### 次のエージェントにコンテキストを渡す

CLI、MCP ツール、Claude Code プラグインは、同じローカルの事実を共有します。連携とバックグラウンドジョブは、選択するまでオフのままです。

OBSERVATORY を入手

## 自分のワークスペースから始めましょう

最新のリリース：0.21.0。最初のローカル観察に API キーは不要です。セットアップはコーディングエージェントに任せることも、ご自身で実行することもできます。

01

### リリースをインストール

ダウンロード対象：project_observatory-0.21.0-py3-none-any.whlとSHA256SUMS（取得元：リリース 0.21.0）。確認にはshasum -a 256 -c SHA256SUMS --ignore-missingを使います。その後、SQLite 拡張に対応した分離済みの Python 3.11+ 環境で、pip install --no-depsで wheel を、続けて[full] extra を-c "$(project-observatory full-path)/requirements-full.lock"付きでインストールします。これはリリースがテストされた依存関係セットです。macOS では Homebrew の Python を使ってください。

02

### プライベートワークスペースを作成

project-observatory full init。続いて、観察するフォルダを次で選びます：full configure sources projects。設定、キー、履歴は、インストールしたコードとは別の場所に保存されます。

03

### 観察して開く

project-observatory full local。続いてfull open。ロシア語にするには：full configure interface locale ru。

04

### エージェントを接続する

MCP サーバーは stdio で動作します：claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py"。続いて、次を依頼します：observatory_overview。

インストールガイド

↗

オンボーディングと連携

↗

すべてのリリース

↗

Mac アプリ：ProjectObservatory-0.21.0-macos.zip。Developer ID で署名され、Apple による公証済みで、macOS 14 以降向けです。ダッシュボードが開き、上でインストールしたエンジンを使います。検証には上記と同じファイルを使います：SHA256SUMS。

現在のリリース 0.21.0は AGPL です。0.10.0 以降のすべてのリリースがそうで、0.10.0 が AGPL 下での最初のリリースです。0.9.1 以前は、リリース時のライセンスのままです。

既知の値のスキャンは、選択したアーティファクトを、ローカルで既知のキーと照合します。未知のシークレットは検出できず、コピーが残っていないことの証明もできません。また、ローカルにコピーがあっても、他の誰かがキーを入手した証拠にはなりません。プロバイダー側での実際のローテーションと外部の MCP ホストは、オフラインのテストスイートの対象外です。

はじめる前に

## いくつかの大切な違い

Observatory は、プロジェクトやキーをアップロードしますか？

いいえ。一覧、履歴、観察結果は、お使いのマシン上のプライベートワークスペースに保存されます。任意の連携にはそれぞれ独自のアクセスがあり、ご自身のアカウントで個別に有効にします。

何を読み取りますか？

設定したフォルダとソースだけです。full doctorは、有効なものと不足しているものを報告します。ダッシュボードは、計測されなかったソースをゼロと表示せず、計測されなかったと表示します。

Switchboard と同じものですか？

いいえ。Switchboard は Claude Code と Codex のアカウントを管理します。Observatory は、それらのエージェントが扱うプロジェクトを見える状態に保ちます。どちらも、今すぐ使える PassionCode のオープンソースツールです。

Fabric はどうですか？

Fabric は当社の CEO AIエージェントで、早期プレビュー版です。エージェントとプロジェクトの調整に焦点を当てています。Observatory は、別のローカルツールとして今すぐ使えます。Fabric を見る。

自分でソースを確認したり、ビルドしたりできますか？

はい。Project Observatory は GNU AGPL-3.0 のオープンソースです。AGPL の対象外となる利用には、商用ライセンスをご用意しています：passioncode.ai/business。リリース済みのバージョンは、そのライセンスのままです。0.8.1 以前は MIT、0.8.2 から 0.9.1 までは PolyForm Noncommercial または Internal Use です。 このリポジトリには、ソース、テスト、セキュリティモデル、リリースノートが含まれます。

オープンソース · ローカル優先

## あなたのプロジェクト、あなたの根拠

プライベートワークスペースを設定し、ご自身のフォルダを観察して、改善が必要な点をお知らせください。

はじめる

↑

問題を報告する

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
