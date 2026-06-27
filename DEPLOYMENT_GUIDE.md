# 🚀 Deployment Guide - Vercel

## Deploy Your Portfolio Website to Vercel

Vercel is the easiest and fastest way to deploy your portfolio. It's free, lightning-fast, and integrates seamlessly with your project.

---

## Prerequisites

- GitHub account (to push your code)
- Vercel account (free signup)
- Supabase project setup (database configured)
- Environment variables ready

---

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

#### Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `portfolio-website`
4. Click "Create repository"
5. Follow the instructions to push your local code

#### Push Your Code
```bash
cd e:\potfpliyo

# If not already a git repo
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

#### Option A: Direct Vercel Signup (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

#### Option B: From Existing Account
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..."
3. Select "Project"

### Step 3: Import Your Repository

1. Click "Import Project"
2. Select "GitHub"
3. Search for `portfolio-website`
4. Click "Import"

Vercel will detect it's a Vite + React project automatically.

### Step 4: Configure Environment Variables

**IMPORTANT**: Your Supabase keys go here!

1. In Vercel project settings, go to "Environment Variables"
2. Add three variables:

```
Name: VITE_SUPABASE_URL
Value: https://your-project.supabase.co
Environment: Production, Preview, Development
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGc... (your actual key)
Environment: Production, Preview, Development
```

```
Name: VITE_API_URL
Value: https://your-project.vercel.app
Environment: Production
```

3. Click "Save"

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. See "Congratulations! Your site is live" ✓

Your portfolio is now live! 🎉

---

## Verify Deployment

### Check Everything Works

1. **Visit your site**: `your-project.vercel.app`
2. **Test navigation**: Click all menu links
3. **Check admin login**: `/admin/login`
4. **Add a test project**: Through admin panel
5. **Verify project appears**: On homepage portfolio section
6. **Test contact form**: Should work (if email configured)
7. **WhatsApp button**: Should be clickable
8. **Mobile view**: Test on mobile device

### View Logs

If something doesn't work:
1. Go to Vercel project dashboard
2. Click "Deployments"
3. Click the latest deployment
4. Go to "Logs"
5. Look for error messages

---

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel project settings
2. Click "Domains"
3. Enter your custom domain (e.g., `myportfolio.com`)
4. Follow the DNS instructions
5. Wait 24 hours for DNS to propagate

### Popular Domain Registrars
- GoDaddy
- Namecheap
- Google Domains
- Domain.com

---

## Continuous Deployment (Auto-Deploy)

Vercel automatically deploys when you push to GitHub!

### To Deploy New Changes

1. Make changes locally
2. Test locally: `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Your message here"
   git push
   ```
4. Vercel automatically builds and deploys (30-60 seconds)
5. Check your live site!

---

## Monitoring & Analytics

### View Performance

Vercel provides built-in analytics:

1. Go to Vercel dashboard
2. Click your project
3. View:
   - Page load performance
   - Function invocations
   - Error logs
   - Usage analytics

### Optimize Performance

- Images are automatically optimized
- Static content is cached globally
- Functions scale automatically
- No configuration needed!

---

## Troubleshooting Deployment

### Issue: Build Failed

**Common causes:**
- Missing environment variables
- Outdated npm packages
- TypeScript errors

**Fix:**
1. Check build logs in Vercel
2. Run `npm run build` locally to reproduce
3. Fix errors locally
4. Push fix to GitHub
5. Vercel auto-redeploys

### Issue: Site is blank / 404

**Possible causes:**
- Environment variables not set
- Supabase URL/key incorrect
- Database not accessible

**Fix:**
1. Verify environment variables in Vercel settings
2. Test Supabase connection
3. Check browser console for errors (F12)
4. Check Vercel deployment logs

### Issue: Admin login not working

**Causes:**
- Supabase credentials wrong
- User doesn't exist
- CORS issues

**Fix:**
1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Check user exists in Supabase Auth
3. Try logging in locally first
4. Check Supabase project is active

### Issue: Images not loading

**Causes:**
- Supabase Storage bucket URL wrong
- Bucket is private
- CORS not configured

**Fix:**
1. Go to Supabase Storage
2. Check `projects` bucket is PUBLIC
3. Verify image URLs are accessible
4. Test image URL directly in browser

---

## Environment Variables Reference

### For Vercel Deployment

```
VITE_SUPABASE_URL
├─ Value: https://[project-id].supabase.co
├─ Get from: Supabase Dashboard → Settings → API
└─ Required: YES

VITE_SUPABASE_ANON_KEY
├─ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
├─ Get from: Supabase Dashboard → Settings → API
└─ Required: YES

VITE_API_URL
├─ Value: https://[your-project].vercel.app
├─ Used for: API calls
└─ Required: For production
```

---

## Security Best Practices

### Protect Your Keys

1. **Never commit `.env` to GitHub** - Already in `.gitignore`
2. **Use Vercel environment variables** - Don't hardcode secrets
3. **Rotate keys regularly** - In Supabase dashboard
4. **Monitor usage** - Check Vercel analytics
5. **Enable RLS** - Database security (already configured)

### Update Dependencies Regularly

```bash
npm outdated              # Check for updates
npm update                # Update packages
npm audit                 # Check for vulnerabilities
npm audit fix             # Fix vulnerabilities
```

---

## Performance Optimization

### Your Site Will Be Fast Because:

✅ **Automatic Image Optimization** - Vercel CDN
✅ **Global Edge Network** - Served from locations worldwide
✅ **Automatic Caching** - Static content cached
✅ **Code Splitting** - Only load needed JavaScript
✅ **Compression** - Automatic gzip compression

### Additional Tips

1. **Use lazy loading** - For images and components
2. **Optimize images** - Compress before uploading
3. **Minimize bundles** - Remove unused packages
4. **Monitor performance** - Use Vercel Analytics

---

## Rollback / Revert Deployment

If something goes wrong:

1. Go to Vercel Deployments
2. Find the previous working deployment
3. Click the three dots
4. Select "Promote to Production"
5. Your site reverts instantly!

---

## Support & Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Status Page**: [vercel.com/status](https://vercel.com/status)

---

## Next Steps

✅ **Deployment complete!**

Now:
1. Add your real projects
2. Customize your portfolio
3. Set up email service (Resend/EmailJS)
4. Share your portfolio link!

Congratulations! Your portfolio is live! 🎉

---

**Need help?** Check the main README.md or SETUP_GUIDE.md
