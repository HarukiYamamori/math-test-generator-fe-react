# Math Test Generator FE - React

## 概要

このプロジェクトは、ReactとTypeScriptを使用して数学のテストを生成するためのWebアプリケーションです。<br>`better-react-mathjax`ライブラリを活用し、数式を美しくレンダリングすることができます。

## 技術スタック

*   **フロントエンド**: React.js (Viteによる高速開発環境)
*   **言語**: TypeScript
*   **スタイル**: CSS Modules
*   **数式表示**: `better-react-mathjax`
*   **コード品質**: ESLint

## セットアップ

プロジェクトをローカル環境でセットアップするには、以下の手順に従ってください。

### 1. リポジトリのクローン

```bash
git clone https://github.com/HarukiYamamori/math-test-generator-fe-react.git
cd math-test-generator-fe-react
```

### 2. 依存関係のインストール

プロジェクトの依存関係をインストールします。npmまたはYarnを使用できます。

**npmを使用する場合:**

```bash
npm install
```

**Yarnを使用する場合:**

```bash
yarn install
```

### 3. 開発サーバーの起動

開発サーバーを起動し、ブラウザでアプリケーションを確認します。

**npmを使用する場合:**

```bash
npm run dev
```

**Yarnを使用する場合:**

```bash
yarn dev
```

通常、`http://localhost:5173` でアプリケーションにアクセスできます（ポート番号は異なる場合があります）。

### 4. アプリケーションのビルド

本番環境用にアプリケーションをビルドします。ビルドされたファイルは `dist` ディレクトリに出力されます。

**npmを使用する場合:**

```bash
npm run build
```

**Yarnを使用する場合:**

```bash
yarn build
```

### 5. Lintの実行

コードの品質チェックを行います。

**npmを使用する場合:**

```bash
npm run lint
```

**Yarnを使用する場合:**

```bash
yarn lint
```

## 使い方
1. [math-test-generator(BE)](https://github.com/HarukiYamamori/math-test-generator)を立ち上げる
2. 入力欄にプロンプトを書いて、「問題生成」をクリック