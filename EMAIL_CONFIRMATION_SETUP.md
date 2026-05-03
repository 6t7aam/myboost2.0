# Email Confirmation Branding & Redirect Setup

## Overview
This guide explains how to configure Supabase email confirmation to use your production domain instead of localhost, and how to customize the email branding.

## Code Changes Made

### File: `src/hooks/useAuth.ts`

**Changed:**
```typescript
// BEFORE
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: { emailRedirectTo: window.location.origin },
});

// AFTER
const redirectUrl = window.location.hostname === 'localhost' 
  ? window.location.origin 
  : 'https://www.myboost.top';

const { error } = await supabase.auth.signUp({
  email,
  password,
  options: { emailRedirectTo: redirectUrl },
});
```

**Why:** This ensures production signups redirect to `https://www.myboost.top` instead of localhost.

---

## Supabase Dashboard Configuration

### 1. Configure Redirect URLs

**Location:** Authentication → URL Configuration

**Settings to Update:**

1. **Site URL:**
   ```
   https://www.myboost.top
   ```

2. **Redirect URLs (Add all of these):**
   ```
   https://www.myboost.top
   https://www.myboost.top/*
   https://www.myboost.top/**
   http://localhost:8080
   http://localhost:8080/*
   http://localhost:8080/**
   ```

**Screenshot Reference:**
- Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/auth/url-configuration
- Update "Site URL" field
- Add each redirect URL in the "Redirect URLs" section (click "+ Add URL" for each)

---

### 2. Customize Email Templates

**Location:** Authentication → Email Templates

You can customize the following email templates:

#### A. Confirm Signup Email

**Default Template Location:**
- Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/auth/templates
- Select "Confirm signup"

**Customization Options:**

1. **Subject Line:**
   ```
   Confirm your MyBoost account
   ```

2. **Email Body (HTML):**
   ```html
   <h2>Welcome to MyBoost!</h2>
   <p>Thanks for signing up. Please confirm your email address by clicking the button below:</p>
   <p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Confirm Email</a></p>
   <p>Or copy and paste this URL into your browser:</p>
   <p>{{ .ConfirmationURL }}</p>
   <p>If you didn't create an account with MyBoost, you can safely ignore this email.</p>
   <hr>
   <p style="color: #666; font-size: 12px;">MyBoost - Professional League of Legends Boosting Services<br>
   <a href="https://www.myboost.top">www.myboost.top</a></p>
   ```

#### B. Magic Link Email (if used)

**Subject:**
```
Your MyBoost login link
```

**Body:**
```html
<h2>Login to MyBoost</h2>
<p>Click the button below to log in to your account:</p>
<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Log In</a></p>
<p>Or copy and paste this URL into your browser:</p>
<p>{{ .ConfirmationURL }}</p>
<p>This link will expire in 1 hour.</p>
<hr>
<p style="color: #666; font-size: 12px;">MyBoost - Professional League of Legends Boosting Services<br>
<a href="https://www.myboost.top">www.myboost.top</a></p>
```

#### C. Reset Password Email

**Subject:**
```
Reset your MyBoost password
```

**Body:**
```html
<h2>Reset Your Password</h2>
<p>You requested to reset your password for your MyBoost account.</p>
<p>Click the button below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a></p>
<p>Or copy and paste this URL into your browser:</p>
<p>{{ .ConfirmationURL }}</p>
<p>If you didn't request a password reset, you can safely ignore this email.</p>
<hr>
<p style="color: #666; font-size: 12px;">MyBoost - Professional League of Legends Boosting Services<br>
<a href="https://www.myboost.top">www.myboost.top</a></p>
```

**Note:** The color `#8B5CF6` matches your primary purple brand color.

---

### 3. SMTP Settings (Optional - For Custom Email Domain)

**Location:** Project Settings → Auth → SMTP Settings

**Current Setup:**
- By default, Supabase sends emails from `noreply@mail.app.supabase.io`
- Emails will show "via supabase.io" in Gmail

**To Use Custom Domain (e.g., noreply@myboost.top):**

You need to configure SMTP with a service like:
- **SendGrid** (Recommended - Free tier: 100 emails/day)
- **AWS SES** (Very cheap, requires domain verification)
- **Mailgun** (Free tier: 5,000 emails/month)
- **Postmark** (Free tier: 100 emails/month)

**Example SendGrid Configuration:**

1. Sign up at https://sendgrid.com
2. Verify your domain `myboost.top`
3. Create an API key
4. In Supabase SMTP Settings, enter:
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Username: apikey
   Password: <your-sendgrid-api-key>
   Sender email: noreply@myboost.top
   Sender name: MyBoost
   ```

**Benefits of Custom SMTP:**
- Emails come from `@myboost.top` instead of Supabase
- Better deliverability
- No "via supabase.io" label
- Professional appearance

**Cost:** Free tier is sufficient for most use cases (unless you have 1000+ signups per day)

---

## Verification Steps

After making these changes:

### 1. Test Signup Flow

1. Clear browser cache/cookies
2. Go to https://www.myboost.top/signup
3. Create a test account with a real email
4. Check email inbox for confirmation email
5. Click confirmation link
6. Verify it redirects to `https://www.myboost.top` (NOT localhost)
7. Verify you can log in

### 2. Test Localhost Development

1. Run dev server: `npm run dev`
2. Go to http://localhost:8080/signup
3. Create test account
4. Verify confirmation email redirects to `http://localhost:8080`

### 3. Check Email Branding

- Verify email subject line matches your custom text
- Verify email body uses MyBoost branding
- Verify button color matches your brand (#8B5CF6)
- Verify footer includes your domain

---

## Exact Dashboard Steps Summary

### Step 1: URL Configuration
1. Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/auth/url-configuration
2. Set **Site URL** to: `https://www.myboost.top`
3. Click **"+ Add URL"** and add each of these redirect URLs:
   - `https://www.myboost.top`
   - `https://www.myboost.top/*`
   - `https://www.myboost.top/**`
   - `http://localhost:8080`
   - `http://localhost:8080/*`
   - `http://localhost:8080/**`
4. Click **Save**

### Step 2: Email Templates
1. Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/auth/templates
2. Click **"Confirm signup"**
3. Update **Subject** to: `Confirm your MyBoost account`
4. Update **Message (Body)** with the HTML template provided above
5. Click **Save**
6. Repeat for other templates (Magic Link, Reset Password) if needed

### Step 3: SMTP (Optional)
1. Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/settings/auth
2. Scroll to **SMTP Settings**
3. Toggle **Enable Custom SMTP**
4. Enter your SMTP provider details
5. Click **Save**

---

## SQL Changes

**No SQL changes required for this fix.**

The email configuration is handled entirely through:
1. Supabase Dashboard settings
2. Frontend code (`useAuth.ts`)

---

## Build Verification

Run these commands to verify the build passes:

```bash
# Install dependencies (if needed)
npm install

# Type check
npm run type-check

# Build for production
npm run build
```

Expected output:
```
✓ built in [time]
✓ [number] modules transformed
```

If build fails, check for TypeScript errors in `useAuth.ts`.

---

## Troubleshooting

### Issue: Confirmation link still goes to localhost in production

**Solution:**
1. Verify Site URL is set to `https://www.myboost.top` in Supabase dashboard
2. Verify redirect URLs include `https://www.myboost.top/*`
3. Clear browser cache
4. Redeploy frontend with updated `useAuth.ts`

### Issue: "Invalid redirect URL" error

**Solution:**
1. Check that the exact URL is in the Redirect URLs list
2. Add wildcard patterns: `https://www.myboost.top/**`
3. Wait 1-2 minutes for Supabase to propagate changes

### Issue: Email not received

**Solution:**
1. Check spam folder
2. Verify email confirmation is enabled in Supabase Auth settings
3. Check Supabase logs: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/logs/edge-logs
4. If using custom SMTP, verify credentials are correct

### Issue: Email has Supabase branding

**Solution:**
1. Customize email templates in Auth → Email Templates
2. OR set up custom SMTP to send from your domain

---

## Production Checklist

Before deploying to production:

- [ ] Updated `useAuth.ts` with production redirect logic
- [ ] Set Site URL to `https://www.myboost.top` in Supabase
- [ ] Added all redirect URLs in Supabase dashboard
- [ ] Customized email templates with MyBoost branding
- [ ] Tested signup flow in production
- [ ] Tested signup flow in localhost
- [ ] Verified confirmation emails redirect correctly
- [ ] (Optional) Configured custom SMTP for branded emails
- [ ] Build passes without errors
- [ ] Deployed updated frontend code

---

## Additional Notes

- The `window.location.hostname === 'localhost'` check ensures development still works
- Production users will always redirect to `https://www.myboost.top`
- Email templates support HTML and Supabase template variables like `{{ .ConfirmationURL }}`
- Custom SMTP is optional but recommended for professional appearance
- All email settings can be changed without code deployment
