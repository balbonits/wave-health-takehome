# User Dashboard

A React-based user management interface that combines external API data with local storage. Built as part of a take-home assignment to demonstrate modern frontend development practices.

## Live Demo

**[View Application](https://user-dash-takehome-balbonits-john-diligs-projects.vercel.app/)**

The application is deployed on Vercel and includes user listing, search, modal details, and a form to add new users.

## Features

**Core functionality:**
- User listing with search and sort capabilities
- Modal-based user detail views
- Add user form with validation
- Responsive design for mobile/desktop
- Network status monitoring
- Data persistence using localStorage

**Technical highlights:**
- Combines JSONPlaceholder API with local data
- Context-based state management
- Comprehensive test coverage with Vitest
- Error boundaries and loading states

## Tech Stack

- React 19 with hooks and functional components
- Vite for build tooling and development server
- Tailwind CSS for styling
- React Router DOM for navigation
- Vitest + React Testing Library for testing
- JSONPlaceholder API for demo data

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wave-health-takehome
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏃‍♂️ Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint code analysis
npm run test         # Run test suite with Vitest
npm run test:ui      # Run tests with UI interface
npm run test:coverage # Generate test coverage report
```

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ErrorBoundary/   # Error boundary for crash handling
│   ├── LoadingSpinner/  # Loading state component
│   ├── Modal/           # Reusable modal component
│   ├── NetworkStatus/   # Network connectivity indicator
│   └── Toast/           # Notification toast component
├── context/             # React Context providers
│   └── UserContext.jsx  # User data management context
├── hooks/               # Custom React hooks
│   └── useToast.js      # Toast notification hook
├── pages/               # Page-level components
│   ├── AddUser/         # Add new user page
│   └── Users/           # User listing page
├── utils/               # Utility functions
│   ├── storage.js       # localStorage utilities
│   └── test-utils.jsx   # Testing utilities
├── App.jsx              # Main application component
├── index.css            # Global styles with Tailwind
└── main.jsx             # Application entry point
```

## 🎯 Key Components

### User Dashboard (`/`)
- Displays paginated list of users from API and localStorage
- Search functionality filters by name or email
- Sortable columns for better data organization
- Click any row to view detailed user information in modal
- Shows user count and distinguishes between API and local users

### Add User Form (`/add-user`)
- Comprehensive form with validation for all fields
- Required fields: Name, Email, Phone
- Optional fields: Website, Address, Company
- Real-time validation with error messages
- Success feedback with automatic navigation
- Form reset after successful submission

### Data Management
- **External API**: Fetches initial user data from JSONPlaceholder
- **Local Storage**: Persists user-created data across sessions
- **Hybrid Approach**: Combines both data sources seamlessly
- **Error Handling**: Graceful fallbacks when API is unavailable

## 🧪 Testing

The project includes comprehensive test coverage with:

- **Unit Tests**: Individual component testing
- **Integration Tests**: User interaction flows
- **Form Validation Tests**: Input validation and error handling
- **API Mocking**: Simulated API responses for reliable testing
- **Accessibility Tests**: ARIA and keyboard navigation testing

Run tests with:
```bash
npm run test        # Watch mode for development
npm run test:coverage # Generate coverage report
```

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Custom Components**: Consistent design system with reusable styles
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: Focus states, ARIA labels, and keyboard navigation
- **Dark/Light Mode Ready**: Structured for easy theme implementation

## 🌐 API Integration

- **Base URL**: `https://jsonplaceholder.typicode.com/users`
- **Local Fallback**: Uses localStorage when API is unavailable
- **Error Handling**: Network error recovery with user feedback
- **Offline Support**: Continues functioning without internet connection

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Build Configuration
- **Vite Config**: Optimized for React with JSX support
- **PostCSS**: Configured for Tailwind CSS processing
- **ESLint**: Code quality and consistency rules

## 🚀 Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Preview build locally**
   ```bash
   npm run preview
   ```

3. **Deploy `dist/` folder** to your hosting platform of choice

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is part of a take-home coding challenge.

## 🙋‍♂️ Support

For questions or issues, please check the existing issues or create a new one with detailed information about the problem.
