# Development Prompts and Commands

This document contains useful prompts and commands for developing and maintaining the Email Tone Analyzer application.

## Development Commands

### Frontend Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Backend Development

```bash
# Start server in production mode
cd server && npm start

# Start server in development mode (auto-reload)
cd server && npm run dev

# Check server health
curl http://localhost:3001/api/health
```

## Git Commands

### Basic Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "feat: add new feature description"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main
```

### Branching

```bash
# Create new feature branch
git checkout -b feature/new-feature-name

# Switch between branches
git checkout main
git checkout feature/branch-name

# Merge feature branch
git checkout main
git merge feature/branch-name

# Delete branch after merge
git branch -d feature/branch-name
```

## Common Development Prompts

### Adding New Features

#### 1. Adding a New Page

```
"Create a new page called [PageName] with the following features:
- [Feature 1]
- [Feature 2]
- [Feature 3]
Include proper routing and navigation."
```

#### 2. Adding API Endpoints

```
"Add a new API endpoint:
- Method: [GET/POST/PUT/DELETE]
- Path: /api/[endpoint-name]
- Purpose: [Description]
- Request/Response format: [JSON structure]"
```

#### 3. Database Operations

```
"Add functionality to:
- Save [data type] to JSON file
- Retrieve [data type] with filtering
- Update [specific fields]
- Include error handling and validation"
```

### UI/UX Improvements

#### 1. Styling Updates

```
"Update the [component/page] styling to:
- Make it more responsive
- Improve the color scheme
- Add better hover effects
- Enhance the visual hierarchy"
```

#### 2. Component Enhancements

```
"Enhance the [ComponentName] component by:
- Adding [specific functionality]
- Improving accessibility
- Adding loading states
- Including error handling"
```

### Testing Prompts

#### 1. Manual Testing

```
"Test the following functionality:
- [Feature 1] works correctly
- Error handling displays proper messages
- All forms validate input properly
- PDF export generates correct output"
```

#### 2. API Testing

```
"Test all API endpoints:
- POST /api/contact with valid/invalid data
- GET /api/contacts returns proper format
- PATCH /api/contact/:id/status updates correctly
- Error responses are properly formatted"
```

## Code Quality Commands

### Linting and Formatting

```bash
# Run ESLint
npx eslint src/ --ext .ts,.tsx

# Fix ESLint issues automatically
npx eslint src/ --ext .ts,.tsx --fix

# Format with Prettier
npx prettier --write "src/**/*.{ts,tsx,css,md}"

# Check TypeScript errors
npx tsc --noEmit
```

### Code Analysis

```bash
# Bundle size analysis
npm run build
npx vite-bundle-analyzer

# Dependency analysis
npm audit
npm audit fix
```

## Debugging Commands

### Frontend Debugging

```bash
# Clear browser cache and storage
# In browser console:
localStorage.clear();
sessionStorage.clear();
location.reload(true);

# Check network requests in browser DevTools
# Application -> Network tab
```

### Backend Debugging

```bash
# Check backend logs
cd server && npm start

# Test API endpoints with curl
curl -X GET http://localhost:3001/api/health
curl -X GET http://localhost:3001/api/contacts
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message","type":"general"}'
```

### Data Debugging

```bash
# Check JSON data file
cat server/data/contacts.json | jq .

# Backup data
cp server/data/contacts.json server/data/contacts-backup.json

# Reset data
echo "[]" > server/data/contacts.json
```

## Performance Optimization Prompts

### Frontend Optimization

```
"Optimize the application performance by:
- Implementing lazy loading for components
- Adding React.memo for expensive components
- Optimizing bundle size
- Improving image loading"
```

### Backend Optimization

```
"Optimize the backend by:
- Adding request validation middleware
- Implementing rate limiting
- Adding compression
- Optimizing JSON file operations"
```

## Deployment Prompts

### Production Build

```
"Prepare the application for production:
- Build optimized frontend bundle
- Configure environment variables
- Set up production server configuration
- Test production build locally"
```

### Environment Setup

```
"Set up different environments:
- Development (localhost)
- Staging (test server)
- Production (live server)
Include proper environment variable management"
```

## Troubleshooting Prompts

### Common Issues

```
"Fix the following issue:
- Frontend not connecting to backend
- CORS errors in browser
- PDF export not working
- Contact form not submitting
- Admin dashboard not loading data"
```

### Error Handling

```
"Improve error handling for:
- Network request failures
- Invalid form submissions
- File operation errors
- JSON parsing errors
- Missing dependencies"
```

## Feature Enhancement Prompts

### Advanced Features

```
"Add advanced features:
- User authentication system
- Real-time notifications
- Email templates library
- Advanced analytics dashboard
- Export data in multiple formats"
```

### Integration Prompts

```
"Integrate with external services:
- Real NLP APIs (OpenAI, Google Cloud)
- Email service providers
- Database systems (MongoDB, PostgreSQL)
- Cloud storage solutions
- Analytics platforms"
```

## Code Review Checklist

### Before Committing

- [ ] Code follows TypeScript best practices
- [ ] All console.log statements removed
- [ ] Error handling is properly implemented
- [ ] Components are properly typed
- [ ] No unused imports or variables
- [ ] Code is properly formatted
- [ ] All features work as expected

### Before Deployment

- [ ] Production build works correctly
- [ ] All API endpoints tested
- [ ] PDF export functionality verified
- [ ] Contact form and admin dashboard tested
- [ ] Cross-browser compatibility checked
- [ ] Performance optimizations applied

## Useful Development Resources

### Documentation Links

- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)
- [Express.js](https://expressjs.com/en/guide/)
- [jsPDF](https://raw.githack.com/MrRio/jsPDF/master/docs/)

### Tools and Extensions

- VS Code Extensions: ES7+ React/Redux/React-Native snippets, Tailwind CSS IntelliSense
- Browser Extensions: React Developer Tools, Redux DevTools
- Testing Tools: Postman (API testing), Lighthouse (performance)

## Quick Reference

### File Structure Commands

```bash
# Create new component
mkdir src/components/NewComponent
touch src/components/NewComponent/index.tsx

# Create new page
touch src/pages/NewPage.tsx

# Add to routes
# Edit src/App.tsx to include new route
```

### Package Management

```bash
# Add new dependency
npm install package-name

# Add dev dependency
npm install --save-dev package-name

# Remove dependency
npm uninstall package-name

# Update all dependencies
npm update

# Check outdated packages
npm outdated
```
