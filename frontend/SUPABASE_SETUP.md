# Supabase Setup for Waitlist

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be set up

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key

## 3. Set Up Environment Variables

Create a `.env` file in the `frontend` directory with:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 4. Create the Waitlist Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'notified', 'launched')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create an index on status for filtering
CREATE INDEX idx_waitlist_status ON waitlist(status);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for signups)
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reading (for admin purposes)
CREATE POLICY "Allow public read" ON waitlist
  FOR SELECT USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at 
  BEFORE UPDATE ON waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. Try submitting an email to the waitlist
3. Check your Supabase dashboard to see the entry in the waitlist table

## 6. Optional: Set Up Email Notifications

You can set up email notifications using Supabase Edge Functions or external services like:
- Resend
- SendGrid
- Mailgun

## 7. Admin Dashboard (Optional)

You can create a simple admin dashboard to view waitlist entries:

```sql
-- Create a view for admin dashboard
CREATE VIEW waitlist_summary AS
SELECT 
  COUNT(*) as total_signups,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'notified' THEN 1 END) as notified,
  COUNT(CASE WHEN status = 'launched' THEN 1 END) as launched,
  MIN(created_at) as first_signup,
  MAX(created_at) as latest_signup
FROM waitlist;
```
