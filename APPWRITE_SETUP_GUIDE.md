# Complete Appwrite Setup Guide for FitTrack Fitness App

This guide will walk you through setting up Appwrite for the FitTrack fitness application step by step. No prior Appwrite experience required!

## Table of Contents
1. [What is Appwrite?](#what-is-appwrite)
2. [Creating Your Appwrite Account](#creating-your-appwrite-account)
3. [Setting Up Your Project](#setting-up-your-project)
4. [Configuring Authentication](#configuring-authentication)
5. [Environment Variables Setup](#environment-variables-setup)
6. [Testing Your Setup](#testing-your-setup)
7. [Setting Up Database (Optional)](#setting-up-database-optional)
8. [Setting Up Storage (Optional)](#setting-up-storage-optional)
9. [Troubleshooting Common Issues](#troubleshooting-common-issues)
10. [Next Steps](#next-steps)

## What is Appwrite?

Appwrite is a Backend-as-a-Service (BaaS) platform that provides:
- **Authentication**: User signup, login, logout
- **Database**: NoSQL database for storing app data
- **Storage**: File upload and management
- **Functions**: Serverless functions for custom logic
- **Real-time**: Live updates and subscriptions

Think of it as Firebase alternative that's open-source and developer-friendly.

## Creating Your Appwrite Account

### Step 1: Visit Appwrite Cloud
1. Open your browser and go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. You'll see the Appwrite homepage with a "Get Started" or "Sign Up" button

### Step 2: Sign Up
1. Click "Sign Up" or "Get Started"
2. You have several options:
   - **Email & Password**: Enter your email and create a password
   - **GitHub**: Sign up using your GitHub account (recommended for developers)
   - **Google**: Sign up using your Google account

3. Choose your preferred method and complete the signup process

### Step 3: Verify Your Account
1. If you signed up with email, check your inbox for a verification email
2. Click the verification link in the email
3. You'll be redirected back to Appwrite and logged in automatically

## Setting Up Your Project

### Step 1: Create a New Project
1. After logging in, you'll see the Appwrite console dashboard
2. Click the **"Create Project"** button (usually prominently displayed)
3. You'll see a project creation form

### Step 2: Configure Project Details
1. **Project Name**: Enter "FitTrack App" (or any name you prefer)
2. **Project ID**: 
   - Appwrite will auto-generate one (like `fittrack-app-xyz123`)
   - You can customize it if you want (use lowercase, numbers, hyphens only)
   - **Important**: Remember this ID - you'll need it later!
3. **Region**: Choose the region closest to your users (usually auto-selected)
4. Click **"Create"**

### Step 3: Access Your Project
1. After creation, you'll be taken to your project dashboard
2. You'll see various sections in the left sidebar:
   - Overview
   - Auth
   - Databases
   - Storage
   - Functions
   - Settings

## Configuring Authentication

Authentication is crucial for our fitness app as users need accounts to track their progress.

### Step 1: Navigate to Auth Settings
1. In your project dashboard, click **"Auth"** in the left sidebar
2. Click on the **"Settings"** tab (you might see other tabs like "Users")

### Step 2: Enable Email/Password Authentication
1. Look for the **"Auth Methods"** section
2. You'll see various authentication methods:
   - Email/Password
   - Magic URL
   - Anonymous
   - OAuth providers (Google, GitHub, etc.)
3. Make sure **"Email/Password"** is **enabled** (toggle should be ON/green)
4. If it's disabled, click the toggle to enable it

### Step 3: Configure Security Settings
1. Scroll down to find the **"Security"** section
2. Look for **"Hostnames"** or **"Allowed Origins"**
3. Add your development URL: `http://localhost:3000`
4. If you plan to deploy later, you can add your production URL here too
5. Click **"Update"** or **"Save"** to save changes

### Step 4: Configure Session Settings (Optional)
1. In the same settings page, look for **"Session"** settings
2. You can configure:
   - **Session Length**: How long users stay logged in (default is usually fine)
   - **Session Alerts**: Email notifications for new logins
3. Default settings are usually good for development

## Environment Variables Setup

Now we need to connect our Next.js app to Appwrite using environment variables.

### Step 1: Get Your Project Credentials
1. In your Appwrite project dashboard, click **"Settings"** in the left sidebar
2. Look for **"API Keys"** or **"Project Settings"**
3. You'll find:
   - **Endpoint**: Usually `https://cloud.appwrite.io/v1`
   - **Project ID**: The ID you created earlier (like `fittrack-app-xyz123`)

### Step 2: Create Environment File
1. In your project root directory (same level as `package.json`), create a file named `.env.local`
2. Add the following content:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here

# Optional: Self-hosted Appwrite (only if you're self-hosting)
# NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-instance.com/v1
```

### Step 3: Replace Placeholder Values
1. Replace `your-project-id-here` with your actual Project ID from Appwrite
2. Example:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=fittrack-app-abc123
```

### Step 4: Verify Environment File
1. Make sure the file is named exactly `.env.local` (note the dot at the beginning)
2. Make sure it's in the root directory of your project
3. The file should not be committed to Git (it's already in `.gitignore`)

## Testing Your Setup

Let's test if everything is working correctly.

### Step 1: Start Your Development Server
1. Open your terminal in the project directory
2. Run: `npm run dev`
3. Wait for the server to start (usually takes 10-30 seconds)
4. You should see: `Local: http://localhost:3000`

### Step 2: Test the Application
1. Open your browser and go to `http://localhost:3000`
2. You should see the FitTrack login/signup page
3. **No errors should appear in the browser console**

### Step 3: Test User Registration
1. Click "Don't have an account? Sign up"
2. Fill in the registration form:
   - **Full Name**: Enter any name
   - **Email**: Use a real email address
   - **Password**: At least 8 characters
3. Click "Create Account"
4. If successful, you should be automatically logged in and see the dashboard

### Step 4: Test Login/Logout
1. Click on your profile avatar in the top-right corner
2. Click "Log out"
3. You should be redirected to the login page
4. Log back in with the same credentials
5. You should successfully access the dashboard again

### Step 5: Verify in Appwrite Console
1. Go back to your Appwrite console
2. Click "Auth" in the sidebar
3. Click "Users" tab
4. You should see your newly created user account listed there

## Setting Up Database (Optional)

For storing user data like BMI calculations, calorie entries, etc.

### Step 1: Create a Database
1. In Appwrite console, click **"Databases"** in the left sidebar
2. Click **"Create Database"**
3. Enter database name: `fitness-data`
4. Click **"Create"**

### Step 2: Create Collections (Tables)
You can create collections for different data types:

#### BMI Records Collection
1. Click **"Create Collection"**
2. Collection ID: `bmi-records`
3. Name: `BMI Records`
4. Add attributes:
   - `userId` (String, required)
   - `height` (Double, required)
   - `weight` (Double, required)
   - `bmi` (Double, required)
   - `createdAt` (DateTime, required)

#### Calorie Entries Collection
1. Create another collection: `calorie-entries`
2. Add attributes:
   - `userId` (String, required)
   - `type` (String, required) // 'intake' or 'burned'
   - `description` (String, required)
   - `calories` (Integer, required)
   - `createdAt` (DateTime, required)

### Step 3: Set Permissions
1. For each collection, click on "Settings"
2. Set permissions:
   - **Create**: Users can create their own records
   - **Read**: Users can read their own records
   - **Update**: Users can update their own records
   - **Delete**: Users can delete their own records

## Setting Up Storage (Optional)

For uploading workout images and videos.

### Step 1: Create a Storage Bucket
1. Click **"Storage"** in the left sidebar
2. Click **"Create Bucket"**
3. Bucket ID: `workout-media`
4. Name: `Workout Media`
5. Set file size limit: `50MB` (for videos)
6. Allowed file extensions: `jpg,jpeg,png,gif,mp4,mov,avi`

### Step 2: Configure Permissions
1. Set permissions similar to database:
   - Users can upload their own files
   - Users can view their own files
   - Users can delete their own files

## Troubleshooting Common Issues

### Issue 1: "Project not found" Error
**Symptoms**: Error message about project not being found
**Solution**: 
1. Double-check your Project ID in `.env.local`
2. Make sure there are no extra spaces or characters
3. Restart your development server after changing `.env.local`

### Issue 2: CORS Errors
**Symptoms**: Browser console shows CORS-related errors
**Solution**:
1. Go to Appwrite Auth settings
2. Make sure `http://localhost:3000` is added to hostnames
3. Clear browser cache and try again

### Issue 3: Authentication Not Working
**Symptoms**: Can't sign up or login
**Solution**:
1. Verify Email/Password auth is enabled in Appwrite
2. Check browser network tab for error details
3. Ensure your internet connection is stable

### Issue 4: Environment Variables Not Loading
**Symptoms**: App can't connect to Appwrite
**Solution**:
1. Verify `.env.local` file name and location
2. Restart development server after creating/modifying `.env.local`
3. Check that variables start with `NEXT_PUBLIC_`

### Issue 5: "Invalid Credentials" Error
**Symptoms**: Login fails with credential error
**Solution**:
1. Make sure you're using the correct email/password
2. Try creating a new account
3. Check if account exists in Appwrite console

## Next Steps

Once your basic setup is working:

### Immediate Next Steps
1. **Test all authentication flows** (signup, login, logout)
2. **Explore the dashboard features** (BMI calculator, calorie tracker, etc.)
3. **Check browser console** for any errors

### Advanced Features (Later)
1. **Set up databases** for data persistence
2. **Configure storage** for media uploads
3. **Create cloud functions** for advanced logic
4. **Set up real-time subscriptions** for live updates
5. **Deploy to production** and update hostnames

### Development Tips
1. **Keep Appwrite console open** while developing
2. **Monitor the Users section** to see new registrations
3. **Check logs** in Appwrite for debugging
4. **Use browser dev tools** to inspect network requests

## Useful Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Web SDK](https://appwrite.io/docs/getting-started-for-web)
- [Next.js with Appwrite Tutorial](https://appwrite.io/docs/tutorials/nextjs)
- [Appwrite Discord Community](https://discord.gg/GSeTUeA)

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Search [Appwrite GitHub Issues](https://github.com/appwrite/appwrite/issues)
3. Ask on [Appwrite Discord](https://discord.gg/GSeTUeA)
4. Check [Stack Overflow](https://stackoverflow.com/questions/tagged/appwrite)

---

**Congratulations!** 🎉 You've successfully set up Appwrite for your FitTrack fitness application. Your app now has user authentication and is ready for further development!