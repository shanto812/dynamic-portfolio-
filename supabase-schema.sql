-- ============================================
-- Portfolio Website Database Schema
-- Copy & paste this into Supabase SQL Editor
-- ============================================

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

-- ============================================
-- Policies: Allow public read, authenticated write/update/delete
-- ============================================

-- Read policy - Everyone can read
create policy "Enable read access for all users" on public.projects
  for select using (true);

-- Insert policy - Only authenticated users can insert
create policy "Enable insert for authenticated users" on public.projects
  for insert with check (auth.role() = 'authenticated');

-- Update policy - Only authenticated users can update
create policy "Enable update for authenticated users" on public.projects
  for update using (auth.role() = 'authenticated');

-- Delete policy - Only authenticated users can delete
create policy "Enable delete for authenticated users" on public.projects
  for delete using (auth.role() = 'authenticated');

-- ============================================
-- Indexes for better query performance
-- ============================================

create index if not exists idx_projects_sector on public.projects(sector);
create index if not exists idx_projects_created_at on public.projects(created_at desc);

-- ============================================
-- Sample data (optional - remove after testing)
-- ============================================

insert into public.projects (
  title,
  description,
  short_description,
  sector,
  image_url,
  live_link,
  code_link,
  technologies
) values (
  'Modern E-Commerce Store',
  'A fully functional e-commerce platform built with React and TypeScript. Features include product catalog, shopping cart, payment integration, and order management.',
  'Modern e-commerce platform with React',
  'ecommerce',
  'https://via.placeholder.com/400x300?text=E-Commerce',
  'https://example.com',
  'https://github.com/username/ecommerce',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js']
);

insert into public.projects (
  title,
  description,
  short_description,
  sector,
  image_url,
  live_link,
  code_link,
  technologies
) values (
  'Corporate Website Redesign',
  'A beautiful corporate website featuring company information, services showcase, team profiles, and a blog section. Fully responsive and optimized for conversions.',
  'Corporate website with modern design',
  'corporate',
  'https://via.placeholder.com/400x300?text=Corporate',
  'https://example.com',
  'https://github.com/username/corporate',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind', 'CMS']
);

insert into public.projects (
  title,
  description,
  short_description,
  sector,
  image_url,
  live_link,
  code_link,
  technologies
) values (
  'SaaS Landing Page',
  'High-converting landing page for a SaaS product. Includes pricing, features, testimonials, and call-to-action sections. Built for maximum engagement and conversions.',
  'High-converting SaaS landing page',
  'landing',
  'https://via.placeholder.com/400x300?text=Landing+Page',
  'https://example.com',
  'https://github.com/username/landing',
  ARRAY['React', 'TypeScript', 'Framer Motion', 'Tailwind']
);

-- ============================================
-- Notes:
-- 1. Replace placeholder images with real URLs after uploading to Supabase Storage
-- 2. Update example links with real project URLs
-- 3. Delete sample data when you add real projects through the admin panel
-- 4. Storage bucket 'projects' must be created manually in Supabase Storage
--    and set to PUBLIC for image URLs to work
-- ============================================
