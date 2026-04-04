# 🚀 NextHire

🔗 Live Demo: https://next-hire-eosin.vercel.app/

NextHire is a full-stack job portal that connects candidates and recruiters on a single platform. Candidates can explore and apply for jobs, while recruiters can manage job postings and track applications efficiently.

---

## 🧠 Tech Stack

* **Frontend:** React (Vite)
* **Backend / Database:** Supabase
* **Authentication:** Clerk
* **Deployment:** Vercel

---

## ✨ Features

### 👨‍💼 For Candidates

* 🔐 Authentication using Clerk
* 🔍 Search jobs by title, location, and company
* 📄 Apply with skills, resume, and experience
* ❤️ Save / Unsave jobs
* 📂 Track applications in **My Jobs**

---

### 🧑‍💼 For Recruiters

* 📝 Post jobs with description, requirements, location, and company
* ❌ Delete jobs
* 🔄 Change hiring status (Open / Closed)
* 👀 View applicants
* 🎯 Update application status (Applied, Interviewing, Hired, Rejected)
* 📊 Manage all jobs in **My Jobs**

---

## 📁 Folder Structure

```bash
src/
│
├── api/                  # API functions (Supabase interactions)
│   ├── apiApplications.js
│   ├── apiCompanies.js
│   └── apiJobs.js
│
├── assets/               # Static assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/           # Reusable UI components
│   ├── ui/
│   ├── add-company-drawer.jsx
│   ├── application-card.jsx
│   ├── apply-job.jsx
│   ├── created-applications.jsx
│   ├── created-jobs.jsx
│   ├── header.jsx
│   ├── job-card.jsx
│   ├── protected-route.jsx
│   └── theme-provider.jsx
│
├── data/                 # Static JSON data
│   ├── companies.json
│   └── faqs.json
│
├── hooks/                # Custom React hooks
│   ├── use-fetch.js
│   └── use-mobile.js
│
├── layouts/              # Layout components
│   └── app-layout.jsx
│
├── lib/                  # Utility/helper functions
│   └── utils.js
│
├── pages/                # Application pages
│   ├── job-listing.jsx
│   ├── job.jsx
│   ├── landing.jsx
│   ├── my-jobs.jsx
│   ├── onboarding.jsx
│   ├── post-job.jsx
│   └── saved-jobs.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## 🛠️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Prateek-agrawal04/NextHire.git
cd nexthire
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_default_key
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

4. Run locally:

```bash
npm run dev
```

---

## 👨‍💻 Author

**Prateek Agrawal**
🔗 https://www.linkedin.com/in/prateek-agrawal-a87301251/

