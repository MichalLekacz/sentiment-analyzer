# 🧠 SentiLyzer

SentiLyzer is a modern sentiment analysis app powered by Hugging Face's machine learning models.  
Built with ❤️ using **SvelteKit + TypeScript + SCSS**, and styled like a sleek AI tool :).

## ✨ Features

- 🧾 **Text input** with 500-character limit
- 🤖 **Real-time sentiment analysis** via Hugging Face API
- ✅ **Dynamic UI**: shows result with animation + emoji icon
- 🧠 **Sentiment tips**: based on result (positive, neutral, negative)
- 🎨 **Responsive, elegant UI** with dark mode & gradient styling
- 🔥 **Submit via ENTER key** or click ➤

## 📸 Demo

![demo screenshot](./preview.png)

## 🚀 Stack

- [SvelteKit](https://kit.svelte.dev/)
- TypeScript
- SCSS (with BEM-ish style)
- Axios (for API calls)
- Hugging Face Inference API
- Lucide Svelte icons

## 📦 Installation

```bash
git clone https://github.com/twoj-login/sentilyzer.git
cd sentilyzer
npm install
```

## 🔐 Environment Variables

You’ll need a free API token from [Hugging Face](https://huggingface.co/settings/tokens):

```env
VITE_HUGGINGFACE_TOKEN=your_hf_token_here
```

Put it in `.env` in the project root.

## 🧪 Running Locally

```bash
npm run dev
```

Then open `http://localhost:5173`

## 💡 Usage

- Type or paste any **English text**
- Hit **Enter** or click ➤
- Modal pops up with **sentiment result** and an AI-generated **tip**
- Supports `POSITIVE`, `NEUTRAL`, `NEGATIVE` labels

## 🧠 Limitations

- The used model only supports **English** input
- Not trained on sarcastic tone or deeper contextual analysis
- Doesn’t support batch input (single message only)

## 🔧 TODO / Improvements

- Add support for Polish NLP model
- Optional GraphQL wrapper layer
- Unit tests (validation / API)

## 🧑‍💻 Author

Built with 💜 by [Michał Lekacz](https://michallekacz.pl)  
Feel free to fork / star / roast / PR 🙃

---

## 📄 License

MIT

## 🧗 Challenges Faced

During development, one key challenge was the requirement to use **GraphQL**.  
While Hugging Face provides a powerful API, it **does not support GraphQL endpoints** for public sentiment analysis models.

### 🛠 Solution:

I explored the GraphQL capabilities but due to lack of support, I opted for a **robust REST integration using `axios`** instead.  
This allowed me to keep the app lightweight and efficient without unnecessary backend layers.

The reasoning and alternative were documented, and the app remains extensible for future GraphQL wrappers if needed.
