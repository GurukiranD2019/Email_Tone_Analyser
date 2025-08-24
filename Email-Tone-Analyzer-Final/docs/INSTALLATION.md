# Installation Guide

This guide will help you set up and run the Email Tone Analyzer application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Check Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Email-Tone-Analyzer.git
cd Email-Tone-Analyzer
```

### 2. Install Frontend Dependencies

```bash
# In the root directory
npm install
```

### 3. Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Return to root directory
cd ..
```

## Running the Application

### Option 1: Run Both Frontend and Backend Separately

#### Terminal 1 - Frontend

```bash
# In the root directory
npm run dev
```

This will start the frontend development server on `http://localhost:5173`

#### Terminal 2 - Backend

```bash
# In the server directory
cd server
npm start
```

This will start the backend server on `http://localhost:3001`

### Option 2: Run with Development Mode (Auto-reload)

#### Frontend (Development Mode)

```bash
npm run dev
```

#### Backend (Development Mode)

```bash
cd server
npm run dev
```

## Verification

### 1. Check Frontend

- Open your browser and navigate to `http://localhost:5173`
- You should see the Email Tone Analyzer homepage

### 2. Check Backend

- Open `http://localhost:3001/api/health` in your browser
- You should see a JSON response indicating the server is running

### 3. Test Contact Form

- Navigate to the Contact page (`http://localhost:5173/contact`)
- Fill out and submit the contact form
- Check if the form submits successfully

### 4. Test Admin Dashboard

- Navigate to `http://localhost:5173/admin`
- You should see any submitted contact forms

## Directory Structure After Installation

```
Email-Tone-Analyzer/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── server/                # Backend server
│   ├── data/              # JSON data storage
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── public/                # Static assets
├── docs/                  # Documentation
├── package.json           # Frontend dependencies
└── README.md              # Main documentation
```

## Troubleshooting

### Common Issues

#### Port Already in Use

If you get a "port already in use" error:

```bash
# Kill process on port 5173 (frontend)
sudo lsof -t -i tcp:5173 | xargs kill -9

# Kill process on port 3001 (backend)
sudo lsof -t -i tcp:3001 | xargs kill -9
```

#### Backend Not Connecting

1. Ensure the backend server is running on port 3001
2. Check the console for any error messages
3. Verify the API endpoint URLs in the frontend code

#### Missing Dependencies

If you encounter dependency errors:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### CORS Issues

If you encounter CORS errors:

1. Ensure the backend CORS configuration includes your frontend URL
2. Check that both servers are running on the correct ports

### Environment-Specific Notes

#### Windows Users

- Use Command Prompt or PowerShell
- Replace `sudo` commands with Administrator privileges
- Use `npx` if global npm commands don't work

#### macOS/Linux Users

- You may need to use `sudo` for some npm global installations
- Ensure you have proper permissions for the project directory

## Data Storage

### Contact Data Location

Contact form submissions are stored in:

```
server/data/contacts.json
```

This file is automatically created when the first contact form is submitted.

## Next Steps

After successful installation:

1. **Explore the Application**: Navigate through all pages to familiarize yourself with the features
2. **Test Email Analysis**: Try the email analysis feature with sample emails
3. **Test PDF Export**: Generate and download PDF reports
4. **Submit Contact Forms**: Test the contact form and admin dashboard
5. **Read Documentation**: Check out the other documentation files for more details

## Support

If you encounter any issues during installation:

1. Check the troubleshooting section above
2. Review the console output for error messages
3. Ensure all prerequisites are correctly installed
4. Create an issue on the GitHub repository with detailed error information
