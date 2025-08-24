# 🚀 Azure Direct Deployment Guide

## Step 1: Create Azure App Service

### Azure Portal Setup:

1. **Go to Azure Portal:** https://portal.azure.com
2. **Create Resource** → **Web App**
3. **Configure:**
   - **Resource Group:** Create new or use existing
   - **Name:** `email-tone-analyzer-[unique-suffix]`
   - **Runtime:** Node 18 LTS
   - **Operating System:** Windows (for web.config support)
   - **Region:** Choose closest to your users
   - **App Service Plan:** Basic B1 or higher

## Step 2: Get Azure Git URL

After creating the App Service:

1. Go to **Deployment Center**
2. Select **Local Git** as source
3. Copy the **Git Clone URL**
4. Set up **Deployment Credentials** (username/password)

## Step 3: Connect Local Repository

Run these commands in your terminal:

```bash
# Add Azure remote
git remote add azure <YOUR_AZURE_GIT_URL>

# Push to Azure (this will trigger deployment)
git push azure main
```

## Step 4: Configure App Settings (Optional)

In Azure Portal → App Service → Configuration:

- `NODE_ENV=production`
- `WEBSITE_NODE_DEFAULT_VERSION=18.17.0`

## 🎯 Your deployment is configured to:

- ✅ Install frontend dependencies
- ✅ Build React TypeScript app
- ✅ Install backend dependencies
- ✅ Copy built files to server/public/
- ✅ Start Node.js server

Ready for Azure deployment! 🌐
