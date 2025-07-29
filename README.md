# 🎓 SmartSpace – Virtual Classroom Platform

**SmartSpace** is a full-featured virtual classroom platform designed for modern online education. It offers a suite of collaborative tools such as real-time meetings, chat, whiteboard, quizzes, and AI-assisted content creation — all in one seamless experience.

---

## ✨ Features

- 🎥 **Collaborative Meetings** (Google Meet style)
- 💬 **Real-time Chat** with history and private rooms
- 🖊️ **Interactive Whiteboard** (like Figma canvas)
- 🧠 **AI-Generated Quizzes** and manual quiz builder
- 👨‍💻 **Coding Assessments** with test cases (like LeetCode)
- 🔐 **Clerk Authentication** (sign-in, sign-up, session handling)
- 🎨 **ShadCN UI** + Tailwind for modern, clean design
- ⚙️ **Role-based Access** (students, teachers)
- ☁️ Optional: Recordings, Notifications, Admin Dashboard

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling      | [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/) |
| Auth         | [Clerk](https://clerk.dev/) |
| State Mgmt   | React Context / Zustand (optional) |
| Icons        | Lucide, Heroicons, Custom SVGs |
| DB (optional)| PostgreSQL via Prisma or Supabase |
| Hosting      | Vercel / Render / Railway |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/smartspace.git
cd smartspace
````

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Configure environment

Create `.env.local` and set your Clerk keys, DB URL (optional), etc:

```env
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_CLERK_FRONTEND_API=...
```

### 4. Run the app

```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000`

---

## 🧭 Project Structure

```
/app
  /(auth)       → sign-in, sign-up pages
  /dashboard    → user dashboard
  /meetings     → create/join/view recordings
  /whiteboard   → collaborative whiteboard
  /chat         → real-time chat rooms
  /quiz         → create, take, and view quizzes
/components     → reusable UI elements
/constants      → sidebar links, role enums
/public/icons   → custom SVG icons
/lib            → utils, Clerk helpers
```

---

## 📦 Scripts

| Command       | Purpose               |
| ------------- | --------------------- |
| `pnpm dev`    | Start dev server      |
| `pnpm build`  | Build for production  |
| `pnpm lint`   | Lint using ESLint     |
| `pnpm format` | Format using Prettier |

---

## 📁 Assets & Design

* Custom SVG icons: `/public/icons/`
* Logo: `SmartSpace`
* Gradient backgrounds for cards
* Mobile-friendly & responsive

---

## 📌 Future Enhancements

* 📹 Meeting recording (via Daily / LiveKit)
* 🧑‍🏫 Teacher dashboard with analytics
* 🔔 Notification system
* 🌐 Multilingual support
* 🔄 Real-time collaboration using WebSockets or Liveblocks

---

## 👨‍💻 Developed By

**Vedant**
SE Project | 2025
Feel free to fork, contribute, and build on this!

---

## 📝 License

MIT – Do anything with it. Just give credit. 😉
