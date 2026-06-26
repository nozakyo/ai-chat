# ai-chat

Gemini APIを使った星座占いチャットアプリです。

**デモ:** https://ai-chat-hazel-five.vercel.app/

## 技術スタック

- **Next.js** 16 (App Router)
- **React** 19
- **TypeScript**
- **Sass** (CSS Modules)
- **Google Gemini API** (`gemini-2.5-flash-lite`)

## セットアップ

```bash
npm install
```

`.env.local` を作成して環境変数を設定します。

```env
GENAI_TOKEN=your_gemini_api_key
```

## 開発

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で起動します。

## 環境変数

| 変数名 | 必須 | 説明 |
|---|---|---|
| `GENAI_TOKEN` | ✅ | Gemini APIキー |

## ビルド

```bash
npm run build
npm run start
```
