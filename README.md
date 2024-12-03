# GitHub Insights

![GitHub License](https://img.shields.io/github/license/yourusername/github-insights)
![Version](https://img.shields.io/github/v/tag/yourusername/github-insights)

GitHub Insights is a web application designed to provide insightful analytics for your GitHub repositories. Built with **Next.js**, it leverages **Supabase** for authentication and data management, with GitHub OAuth for seamless integration with your GitHub account.

## Features

- **Repository Analytics**: List Repositories
- **User Insights**: Track your activity, including commits, pull requests
- **Authentication**: Secure login using GitHub OAuth via Supabase.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Authentication**: [Supabase](https://supabase.com/) + GitHub OAuth
- **Data**: GitHub  API
- **Charts**: ChartJs
- **Styling**:  Scania Tegel (https://tegel.scania.com/) & Tailwind CSS 

---

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed (>= 16.x recommended).
2. **Supabase Account**: Create a Supabase account and set up a new project.
3. **GitHub OAuth App**: Set up a GitHub OAuth application.
   - **Callback URL**: `http://localhost:3000/api/auth/callback` (changing for Production)

### Installation

1 - npm Install
2 - create env.local 
    NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

3- npm run dev


**Note:** Github Auth is not going to work locally due to callback link in production