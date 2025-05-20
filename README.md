# 🎨 Promptl

**Promptl** is an AI image prompt guessing game inspired by the mechanics of Wordle. Each round, an AI-generated image is shown, and your task is to guess the original prompt that was used to create it. You get 6 attempts, word-by-word feedback, and a clue after 3 tries. Think you can outsmart the AI?

Play now: https://promptl-nine.vercel.app/

---

## 🕹 Gameplay

- An image is generated using a random prompt from the OpenAI ChatGPT API and rendered via DALL·E.
- You have **6 guesses** to correctly identify the original prompt (max 10 words).
- Feedback is color-coded just like Wordle:
  - 🟩 **Green**: Correct word in the correct position
  - 🟨 **Yellow**: Correct word in the wrong position
  - ⬜ **White**: Word is not in the prompt at all
- After 3 incorrect guesses, the **Clue** button becomes available:
  - Reveals the number of words and their lengths
  - For words with 6+ letters, the first letter is revealed

---

## ✨ Features

- Fun, AI-driven challenge that blends image generation with word logic
- Real-time visual feedback and hints to help guide your guesses
- Built-in global state context to manage game state cleanly across components
- Plans for:
  - ✅ Win and lose messages
  - ✅ Score system
  - ✅ User Profile & Score tracking
  - ✅ New image each day
  - 🚧 More polish as development continues

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API (ChatGPT + DALL·E)](https://platform.openai.com/)

---

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-username/promptl.git
cd promptl
pnpm install
```

### 2. Create a `.env.local` file

Add your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

### 3. Run the development server

```bash
pnpm dev
```

Or build and start production:

```bash
pnpm build
pnpm start
```

---

## 🧪 Status

🔧 Promptl is a work-in-progress — but fully playable and fun already!
