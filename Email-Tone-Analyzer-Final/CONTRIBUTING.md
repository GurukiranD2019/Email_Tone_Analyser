# Contributing to Email Tone Analyzer

Thank you for your interest in contributing to Email Tone Analyzer! We welcome contributions from the community and appreciate your help in making this project better.

## 🚀 Getting Started

### Prerequisites

- Node.js (16.0 or higher)
- npm (comes with Node.js)
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/Email-Tone-Analyzer.git
   cd Email-Tone-Analyzer
   ```

### Setup Development Environment

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..

# Start development servers
npm run dev (in one terminal)
cd server && npm start (in another terminal)
```

## 📋 How to Contribute

### Reporting Bugs

- Use the [GitHub Issues](https://github.com/yourusername/Email-Tone-Analyzer/issues) page
- Check if the issue already exists
- Include detailed steps to reproduce
- Add screenshots if applicable
- Specify your environment (OS, Node.js version, browser)

### Suggesting Features

- Use GitHub Issues with the "enhancement" label
- Provide a clear description of the feature
- Explain the use case and benefits
- Include mockups or examples if helpful

### Code Contributions

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**:

   ```bash
   # Run type checking
   npm run type-check

   # Run linting
   npm run lint

   # Test the application manually
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

## 🎯 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Use Prettier for code formatting
- Follow ESLint rules
- Write self-documenting code with clear variable names

### Commit Message Format

Follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Build process or auxiliary tool changes

Examples:

```
feat: add email template library
fix: resolve PDF export issue on mobile
docs: update API documentation
style: format contact page components
refactor: optimize analysis service
```

### File Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
├── services/      # API and business logic
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Add proper error handling
- Include loading states for async operations
- Make components accessible (ARIA labels, keyboard navigation)

### API Guidelines

- Follow RESTful conventions
- Include proper error handling
- Validate input data
- Return consistent response formats
- Document all endpoints

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Email analysis works with sample emails
- [ ] PDF export generates correct output
- [ ] Contact form submits successfully
- [ ] Admin dashboard displays and updates data
- [ ] Responsive design works on mobile
- [ ] All links and navigation work

### API Testing

- Test all endpoints with valid data
- Test error cases (invalid data, missing fields)
- Verify CORS configuration
- Check response formats

## 📝 Documentation

When contributing, please:

- Update README.md if adding major features
- Add comments to complex code sections
- Update API documentation for new endpoints
- Include examples in documentation

## 🔍 Code Review Process

### What We Look For

- ✅ Code follows project conventions
- ✅ Changes are well-tested
- ✅ Documentation is updated
- ✅ No breaking changes without discussion
- ✅ TypeScript types are properly defined
- ✅ Error handling is implemented
- ✅ Performance considerations are addressed

### Review Timeline

- Small fixes: 1-2 days
- New features: 3-5 days
- Major changes: 1-2 weeks

## 🚫 What Not to Contribute

- Breaking changes without prior discussion
- Features that significantly increase bundle size
- Code that doesn't follow the project's architecture
- Unrelated or experimental features
- Code without proper TypeScript types

## 📞 Getting Help

- **Questions**: Create a GitHub Discussion
- **Bugs**: Create a GitHub Issue
- **Feature Ideas**: Create a GitHub Issue with enhancement label
- **Development Help**: Check existing issues or create a discussion

## 🎉 Recognition

Contributors will be:

- Listed in the project's README
- Mentioned in release notes for significant contributions
- Given credit in the application's About page

## 📄 License

By contributing to Email Tone Analyzer, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Thank you for taking the time to contribute! Every contribution, no matter how small, helps make Email Tone Analyzer better for everyone.

---

Happy coding! 🚀
