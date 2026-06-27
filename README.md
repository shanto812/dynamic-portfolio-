# Portfolio Website - React TypeScript

A modern, high-performance portfolio website built with React, TypeScript, and Tailwind CSS. Features a public portfolio showcase and a secure admin panel for project management.

## 🚀 Features

- **Public Portfolio Showcase**: Display your projects in a beautiful, responsive layout
- **Sector-Wise Filtering**: Organize projects by categories with smooth filtering
- **Secure Admin Panel**: Protected dashboard to manage projects (add, edit, delete)
- **WhatsApp Integration**: Direct messaging button for client inquiries
- **Contact Form**: Email integration for visitor submissions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript support for robust development

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend & Auth**: Supabase
- **Hosting**: Vercel (recommended)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Email**: Resend or EmailJS (integration ready)

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Supabase account
- GitHub account (for deployment)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Configure the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3001
```

### 4. Supabase Setup

You need to create the following tables in your Supabase database:

#### `projects` Table

```sql
create table projects (
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

create table auth.users (
  id uuid primary key,
  email text unique not null,
  encrypted_password text not null,
  email_confirmed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

#### Storage Bucket

Create a `projects` bucket in Supabase Storage for project images:

1. Go to Supabase Dashboard
2. Click on "Storage"
3. Create a new bucket named `projects`
4. Set it to public

### 5. Run Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/              # Admin components
│   ├── common/             # Reusable UI components
│   ├── layout/             # Header, Footer, Layout
│   └── sections/           # Page sections
├── pages/
│   ├── admin/              # Admin pages
│   └── HomePage.tsx        # Home page
├── context/                # React Context (Auth, Projects)
├── services/               # API services
├── types/                  # TypeScript types
├── utils/                  # Helper functions
├── hooks/                  # Custom React hooks
├── constants/              # App constants
├── styles/                 # Global styles
└── App.tsx                 # Main app component
```

## 🔐 Admin Authentication

### Creating an Admin Account

1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Create a new user with:
   - Email: `admin@example.com`
   - Password: `password123`

### Login

Visit `/admin/login` and enter your credentials.

## 📝 Key Configurations

### Update Site Information

Edit `src/constants/config.ts` to customize:

- Site name and description
- Social media links
- WhatsApp number
- Contact email
- Skills and technologies
- Portfolio sectors

### Customize Styling

Modify `tailwind.config.js` to adjust:

- Colors and theme
- Fonts and typography
- Spacing and sizing
- Custom animations

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project" and import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Environment Variables on Vercel

Set these in your Vercel project settings:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
VITE_API_URL = https://your-vercel-url.vercel.app
```

## 📧 Email Integration

### Using Resend (Recommended for Vercel)

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key
3. Create a Vercel function at `api/mail.ts`
4. Update `emailService.ts` to use your API

### Using EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Get your Service ID, Template ID, and Public Key
3. Update the email service to use EmailJS

## 📱 Customizing WhatsApp Integration

Edit `src/constants/config.ts`:

```typescript
export const WHATSAPP_NUMBER = '+1234567890'; // Your WhatsApp number
```

## 🎨 Adding Projects

1. Log in to the admin panel (`/admin/login`)
2. Click "Add New Project"
3. Fill in project details:
   - Title
   - Description
   - Sector/Category
   - Live Link
   - Code Link (optional)
   - Technologies
   - Upload Image
4. Click "Add Project"

Projects are immediately visible on the portfolio page!

## 🔄 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🐛 Troubleshooting

### Supabase Connection Issues

- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Ensure `projects` table exists with correct schema

### Image Upload Not Working

- Verify `projects` storage bucket exists in Supabase
- Check bucket is set to public
- Confirm CORS settings allow uploads

### Admin Login Failing

- Ensure user exists in Supabase Auth
- Check environment variables are loaded
- Verify Supabase authentication is enabled

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips for Success

1. **Start with Supabase Setup**: Get your database tables created first
2. **Test Locally**: Use the dev server to test before deploying
3. **Monitor Errors**: Check browser console and Supabase logs
4. **Backup Your Data**: Regularly export your Supabase data
5. **Use Git**: Commit your changes and push to GitHub regularly

## 🤝 Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Check Supabase documentation
4. Open an issue on GitHub

---

Built with ❤️ for modern web design portfolios
