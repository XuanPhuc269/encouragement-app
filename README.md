<!-- filepath: /Users/xuanphuctran269/projects/nextjs_projects/encouragement_web/encouragement-app/README.md -->

<h1 align="center"> Encouragement App </h1>

<p align="center">
  <em>A simple web app that gives students special encouragement messages before their high school entrance exams.</em>
</p>

---

## 🌟 Overview

This app uses <strong>Next.js</strong> and <strong>AI</strong> to create kind, personal messages for students. Students enter their name, target score, and feelings. The app then shows a message, fun animations, and a surprise gift card to help students feel better and more confident.

---

## ✨ Features

- <strong>Personalized Messages</strong>: AI creates a special message for each student
- <strong>Fun Interface</strong>: Easy to use, with nice animations and effects
- <strong>Confetti Animation</strong>: Colorful confetti appears with each message
- <strong>Background Music</strong>: Soft music plays to make the experience nicer
- <strong>Special Gift Card</strong>: Students can open a virtual gift card with fireworks
- <strong>Works on All Devices</strong>: The app looks good on phones, tablets, and computers

---

## 🛠️ Technologies Used

- <a href="https://nextjs.org/">Next.js</a> – For building the website
- <a href="https://openai.com/">OpenAI API</a> – For making the messages
- <a href="https://www.npmjs.com/package/react-confetti">React Confetti</a> – For confetti effects
- <a href="https://www.npmjs.com/package/canvas-confetti">Canvas Confetti</a> – For fireworks
- <a href="https://tailwindcss.com/">TailwindCSS</a> – For styling
- Custom animations and UI components

---

## 🚀 Getting Started

### What You Need

- Node.js 14.x or newer
- npm or yarn

### How to Install

1. Clone this repository
2. Go to the project folder:
   ```bash
   cd encouragement_web/encouragement-app
   ```
3. Install the needed packages:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a <code>.env.local</code> file in the main folder and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### How to Run the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## 📝 How to Use

1. <strong>Home Page</strong>: Learn what the app does
2. <strong>Info Page</strong>: Enter your name, target score, and feelings
3. <strong>Message Page</strong>: See your special message and confetti
4. <strong>Special Gift</strong>: Click to open a gift card with fireworks

---

## 📁 Project Structure

<pre>
encouragement-app/
├── components/    # Reusable parts of the UI
├── lib/           # Helper functions and AI code
├── pages/         # Main pages and API routes
├── public/        # Images, music, and other files
├── styles/        # CSS and styles
└── ...            # Other config files
</pre>

---

## 📜 License

This project is for learning and personal use.
