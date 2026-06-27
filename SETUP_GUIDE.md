# 🚀 Complete Setup Guide

## Step-by-Step Instructions to Get Your Portfolio Running

### Phase 1: Prerequisites & Project Setup

#### Step 1: Install Node.js
- Download from [nodejs.org](https://nodejs.org)
- Choose LTS version (recommended)
- Verify installation: `node --version` and `npm --version`

#### Step 2: Clone/Setup Project
```bash
cd e:\potfpliyo
npm install
```

This installs all dependencies including React, TypeScript, Tailwind, and Supabase.

---

### Phase 2: Supabase Configuration (CRITICAL)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up (free tier is perfect for this)
3. Click "New project"
4. Name it: `portfolio-db`
5. Create a strong password
6. Wait for project to initialize (1-2 minutes)

#### Step 2: Get API Keys
1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. Keep these safe!

#### Step 3: Create Database Tables
1. Go to SQL Editor in Supabase
2. Click "New Query"
3. Paste this SQL:

```sql
-- Create projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  short_description text not null,
  sector text not null,
  image_url text,
  live_link text not null,
  code_link text,
  technologies text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.projects enable row level security;

-- Create policies (allow public read, authenticated write)
create policy "Enable read access for all users" on public.projects
  for select using (true);

create policy "Enable insert for authenticated users" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users" on public.projects
  for delete using (auth.role() = 'authenticated');
```

4. Click "Run"
5. Done! Tables created ✓

#### Step 4: Create Storage Bucket
1. Go to Storage in Supabase
2. Click "New bucket"
3. Name: `projects`
4. **IMPORTANT**: Uncheck "Private bucket" (make it public)
5. Click "Create bucket"

#### Step 5: Create Admin User
1. Go to Authentication → Users
2. Click "Add user"
3. Email: `admin@example.com`
4. Password: `password123`
5. Click "Create user"

---

### Phase 3: Environment Configuration

#### Update .env File
Edit `e:\potfpliyo\.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:3001
```

Replace with your actual values from Supabase.

#### Update Site Configuration
Edit `src/constants/config.ts`:

```typescript
export const CONTACT_EMAIL = 'your-email@example.com'; // Your email
export const WHATSAPP_NUMBER = '+1234567890'; // Your WhatsApp with country code
export const SITE_NAME = 'Your Name - Portfolio';
```

---

### Phase 4: Running Locally

#### Start Development Server
```bash
npm run dev
```

Your site opens automatically at `http://localhost:3000`

#### What You Should See
- **Homepage**: Hero section, About, Portfolio (empty), Contact, Footer
- **Navigation**: Links work, responsive mobile menu
- **WhatsApp Button**: Green button in bottom right
- **Admin Login**: Go to `/admin/login`
  - Email: `admin@example.com`
  - Password: `password123`

---

### Phase 5: Adding Your First Project

#### From Admin Panel
1. Go to `http://localhost:3000/admin`
2. Login with your credentials
3. Click "Add New Project"
4. Fill in:
   - **Title**: "My Awesome Website"
   - **Short Description**: "A beautiful e-commerce platform"
   - **Description**: "Detailed description..."
   - **Sector**: "e-Commerce"
   - **Live Link**: `https://example.com`
   - **Technologies**: React, TypeScript, Tailwind (add each, press Add)
   - **Image**: Upload a screenshot
5. Click "Add Project"

#### Verify on Homepage
- Go to `http://localhost:3000`
- Scroll to Portfolio section
- Your project appears!
- Click "Live Demo" to visit your link

---

### Phase 6: Email Integration (Optional for Local)

#### Option 1: Resend (Best for Vercel)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Create file: `api/mail.ts` in your Vercel project later

#### Option 2: EmailJS (Works Locally)
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Get: Service ID, Template ID, Public Key
3. Update `src/services/emailService.ts`

For now, testing locally uses a placeholder.

---

### Phase 7: Customization

#### Change Colors
Edit `tailwind.config.js` in `theme.extend.colors`

#### Add/Remove Sectors
Edit `src/constants/config.ts` → `PORTFOLIO_SECTORS`

#### Update Skills
Edit `src/constants/config.ts` → `SKILLS`

#### Modify Text
Edit components in `src/components/sections/`

---

### Phase 8: Deployment to Vercel

#### Before Deploying
1. Push code to GitHub
2. Verify all environment variables set
3. Test locally with `npm run build`

#### Deploy Steps
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"
6. Wait 2-3 minutes ✓

#### Your Site is Live!
- URL: `your-project.vercel.app`
- Share with clients!

---

## 🧪 Testing Checklist

- [ ] Homepage loads without errors
- [ ] Navigation works (all links)
- [ ] Portfolio page loads (no projects yet is OK)
- [ ] Contact form fields appear
- [ ] WhatsApp button visible
- [ ] Admin login page accessible
- [ ] Can login with test credentials
- [ ] Can add a new project
- [ ] Project appears on homepage
- [ ] Can edit project
- [ ] Can delete project
- [ ] Mobile view is responsive
- [ ] All images load correctly

---

## 🆘 Common Issues & Fixes

### Issue: "Cannot find module '@supabase/supabase-js'"
**Fix**: Run `npm install`

### Issue: Blank page or errors in console
**Fix**: 
- Check `.env` file has correct values
- Open DevTools (F12) and check console
- Verify Supabase project exists

### Issue: Admin login page blank
**Fix**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Images not uploading
**Fix**:
- Check `projects` bucket exists in Supabase
- Bucket must be PUBLIC
- Check file size < 5MB

### Issue: Projects not showing
**Fix**:
- Verify `projects` table exists
- Check RLS policies are set correctly
- Make sure data is actually in database

---

## 📞 Need Help?

1. **Check README.md** - Has additional info
2. **Review Code Comments** - Most files have explanations
3. **Check Browser Console** - Click F12 in browser
4. **Check Supabase Logs** - In Supabase dashboard

---

## 🎯 Next Steps After Setup

1. **Add Real Projects** - Replace demo projects with your work
2. **Customize Design** - Adjust colors, fonts, layout
3. **Set Up Email** - Configure Resend or EmailJS
4. **Deploy to Vercel** - Make it live
5. **Share Your Portfolio** - Show the world!

---

Good luck! Your portfolio is about to be live! 🚀
