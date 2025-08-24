# Quick Start Guide

Get up and running with Email Tone Analyzer in 5 minutes!

## Prerequisites

- Node.js (16.0 or higher)
- npm (comes with Node.js)

## Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/Email-Tone-Analyzer.git
cd Email-Tone-Analyzer

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Start the Application

```bash
# Terminal 1 - Start Frontend
npm run dev

# Terminal 2 - Start Backend
cd server && npm start
```

### 3. Open in Browser

- Frontend: http://localhost:5173
- Backend Health: http://localhost:3002/api/health

## Quick Test

1. **Test Email Analysis**: Go to `/analyze` and try a sample email
2. **Test PDF Export**: Analyze an email and click "Export PDF"
3. **Test Contact Form**: Go to `/contact` and submit a form
4. **Test Admin Panel**: Go to `/admin` to see submitted forms

## Application Structure

```
Email-Tone-Analyzer/
├── src/              # Frontend React app
├── server/           # Backend Express server
├── docs/             # Documentation
└── README.md         # Main documentation
```

## Key Features

- ✅ **Email Tone Analysis** - Smart emotional analysis
- ✅ **PDF Export** - Professional report generation
- ✅ **Contact System** - Form submission with backend storage
- ✅ **Admin Dashboard** - Manage contact submissions
- ✅ **Responsive Design** - Works on all devices

## Next Steps

- Read the [Installation Guide](./INSTALLATION.md) for detailed setup
- Check the [API Documentation](./API.md) for backend details
- Review [Development Prompts](./PROMPTS.md) for development tips

## Support

If you encounter issues:

1. Check the [Installation Guide](./INSTALLATION.md) troubleshooting section
2. Ensure both frontend and backend servers are running
3. Check browser console for error messages
