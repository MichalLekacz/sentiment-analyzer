# Finalyzer 💼📊

**AI-Powered Financial Sentiment Analyzer**

Finalyzer is a frontend application that analyzes financial text sentiment using AI models from Hugging Face. Enter financial statements, news, or comments and discover if the sentiment is **Positive**, **Neutral**, or **Negative** – visualized in an elegant, responsive UI.

---

## 🚀 Live Demo

[👉 View Finalyzer Online](https://finalyzer-ml.netlify.app)

---

## 📦 Tech Stack

- **Framework:** SvelteKit + TypeScript
- **Styling:** SCSS (modular, responsive)
- **API:** Hugging Face Inference API – `ProsusAI/finbert`
- **Testing:** Vitest + Testing Library
- **Code Quality:** ESLint + Prettier + Husky

---

## 🛠️ How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/MichalLekacz/sentiment-analyzer
cd finalyzer
```

2. **Install dependencies**

```bash
npm install
```

3. **Set your Hugging Face API Token**
   Create a `.env` file:

```
VITE_HUGGINGFACE_TOKEN=your_token_here
```

4. **Run the app**

```bash
npm run dev
```

---

## 🧪 Run Tests

```bash
npm run test
```

---

## 💡 Features

- Input text (max 500 characters) for financial sentiment analysis.
- REST API communication with Hugging Face using **FinBERT**.
- Dynamic UI showing results in a **modal** with:
  - Icons (✅, ⚖️, ❌)
  - Sentiment description & tips.
- Quick example buttons to test **Positive**, **Neutral**, **Negative**.
- Responsive & mobile-friendly design inspired by ChatGPT.

---

## 🧩 Challenges Faced

- **GraphQL integration** was not feasible due to Hugging Face API limitations. REST API was used instead and explained in the code/documentation.
- Ensuring UI consistency across devices – especially mobile responsiveness.
- Adapting a general sentiment model to finance required switching to **FinBERT**.

---

## ✅ Requirements Covered

- [x] TypeScript + SvelteKit
- [x] REST API with free Hugging Face model
- [x] Modal with sentiment, icons, tips
- [x] Validation & error handling
- [x] Unit tests (validation, API)
- [x] ESLint + Prettier + Husky
- [x] Responsive & intuitive UI
