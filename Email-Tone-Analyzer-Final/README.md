# Email Tone Analyzer

A Vite React TypeScript web application that analyzes the emotional tone of emails using intelligent analysis algorithms. Users can paste or upload email content and receive a breakdown of emotional tones (positive, negative, neutral, angry, enthusiastic, formal, informal) with scores, sentiment tags, and AI-generated suggestions.

## Features

- **Intelligent Email Analysis**: Advanced tone and sentiment detection
- Quantitative scores and sentiment tags with high accuracy
- AI-generated suggestions for improvement
- Sample email for demonstration
- **PDF Export**: Export analysis results as a professional PDF report
- **Backend Integration**: Contact form with JSON data storage
- **Admin Dashboard**: Manage contact submissions and inquiries
- Pages: Home, Analyze, Result (dashboard), About Us, Contact Us, API Documentation, Admin
- Beautiful, modern UI with navigation header

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **PDF Generation**: jsPDF & html2canvas
- **Backend**: Node.js, Express.js
- **Database**: JSON file storage
- **Analysis**: Intelligent pattern matching algorithms

## Getting Started

### 1. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Start backend server
npm start
```

The frontend will run on `http://localhost:5174` and the backend on `http://localhost:3002`.

## Backend Features

- **Contact Form API**: Handle form submissions with validation
- **JSON Data Storage**: Store contacts in `server/data/contacts.json`
- **Admin Endpoints**: View and manage contact submissions
- **Status Tracking**: Track contact status (new, in-progress, resolved, closed)
- **CORS Support**: Configured for frontend integration

### API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `GET /api/contact/:id` - Get specific contact
- `PATCH /api/contact/:id/status` - Update contact status
- `GET /api/health` - Health check

### Admin Interface

Access the admin dashboard at `/admin` to:

- View all contact submissions
- Filter by status and type
- Update contact status
- View detailed contact information

## PDF Export Feature

The application includes a powerful PDF export feature that allows users to:

- Generate professional PDF reports of their email tone analysis
- Download high-quality PDF files with analysis results
- Include complete tone breakdown, sentiment analysis, and AI suggestions
- Automatically formatted with timestamps and branding

## Data Storage

Contact submissions are stored in JSON format with:

- Contact information (name, email, subject, message)
- Submission timestamp and status
- Inquiry type classification
- Admin status updates

## Development

For development with auto-reload:

```bash
# Frontend (in root directory)
npm run dev

# Backend (in server directory)
npm run dev
```

## Future Scope

- Advanced NLP models (BERT, GPT integration)
- User authentication and sessions
- Database migration (PostgreSQL/MongoDB)
- More detailed analytics and reporting
- Email client integrations
- Real-time notifications

## License

MIT
