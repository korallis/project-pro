# Supabase Cloud Setup Instructions

This guide will help you set up a Supabase cloud project for Project Pro.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Access to the Supabase dashboard

## Steps to Set Up Supabase

### 1. Create a New Supabase Project

1. Go to the [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Select your organization
4. Enter project details:
   - **Project Name**: `Project Pro`
   - **Database Password**: Choose a strong password
   - **Region**: Select a region close to your users
5. Click "Create new project"
6. Wait for the project to be set up (this may take a few minutes)

### 2. Get Project Credentials

1. In your project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **service_role** key (SUPABASE_SERVICE_ROLE_KEY)

### 3. Set Up Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Replace the placeholder values with the credentials you copied in step 2.

### 4. Run the Database Migration

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste the SQL code into the editor
5. Click "Run" to execute the migration

### 5. Configure Authentication

1. In your Supabase project dashboard, go to **Authentication** > **Settings**
2. Configure the following:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`
3. Enable any additional auth providers you want to use (Google, GitHub, etc.)

### 6. Set Up Row Level Security (RLS) Policies

1. In your Supabase project dashboard, go to **Authentication** > **Policies**
2. Create policies for each table to control access
3. For now, you can enable access for all users (we'll implement proper policies later)

### 7. Test the Connection

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Check the console for any Supabase connection errors

## Next Steps

Once your Supabase project is set up, you can:

1. Implement authentication in your Next.js app
2. Create API routes for CRUD operations
3. Set up real-time subscriptions
4. Configure storage for file uploads

## Troubleshooting

- If you get a "Invalid JWT" error, make sure your environment variables are set correctly
- If you can't connect to the database, check that your migration ran successfully
- For more help, refer to the [Supabase Documentation](https://supabase.com/docs)