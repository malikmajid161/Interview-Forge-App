# Interview Forge 🛠️

**Interview Forge** is a full-stack, AI-powered interview preparation platform designed to help candidates land their dream jobs with confidence. By leveraging AI that thinks like a real recruiter, it provides personalized question banks, mock interviews, and instant feedback.

## 🚀 Features

- **AI-Powered Mock Interviews**: Real-time practice with feedback on content, tone, and delivery.
- **Dynamic Question Bank**: 10,000+ role-specific questions across Behavioral, Technical, and Situational categories.
- **MCQ Quizzes**: Instant knowledge checks for technical roles.
- **Personalized Study Plans**: 5-day roadmaps tailored to your next interview date.
- **Instant AI Feedback**: STAR-method scoring and specific improvement tips.
- **Progress Tracking**: Visualize your growth and identify category gaps.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Lucide React
- **Backend/Auth**: [Supabase](https://supabase.com/) (Auth, Database, Edge Functions)
- **Styling**: Vanilla CSS with a custom Design System
- **Fonts**: Instrument Serif, DM Sans, DM Mono

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/malikmajid161/Mock_interviewer.git
   cd Mock_interviewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env` file or update `src/lib/supabase.js` with your Supabase credentials:
   ```js
   const supabaseUrl = 'YOUR_SUPABASE_URL'
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `src/pages/`: Contains all view components (Landing, SignUp, Dashboard, etc.)
- `src/lib/`: Backend configurations (Supabase client)
- `src/index.css`: Global design system and utility classes
- `src/App.jsx`: Main routing and session logic

## 🔒 Authentication

Auth is handled via Supabase, supporting:
- Email/Password Registration & Login
- Google OAuth
- OTP Email Verification

## 📝 Database Schema

The project expects a `profiles` table in Supabase:
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  phone text,
  target_role text,
  experience_level text,
  industry text,
  interview_date date,
  referral_source text,
  created_at timestamptz default now()
);
```

## 📄 License

This project is licensed under the MIT License.
