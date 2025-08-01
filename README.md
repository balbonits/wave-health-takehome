# User Dashboard - React Application

A modern, responsive user management dashboard built with React 19, featuring user listing, search functionality, detailed user views, and the ability to add new users with comprehensive form validation.

## 🌐 Live Demo

**[View Live Application](https://user-dash-takehome-balbonits-john-diligs-projects.vercel.app/)**

Experience the full functionality of the User Dashboard deployed on Vercel. The live demo includes all features: user listing, search, sorting, detailed user views, and the ability to add new users with form validation.

## 🚀 Features

### Core Functionality
- **User Management**: View, search, and manage users from multiple data sources
- **Add User**: Create new users with comprehensive form validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Search**: Filter users by name or email with instant results
- **Sortable Columns**: Click column headers to sort user data
- **User Details Modal**: Click any user row to view detailed information

### Data Management
- **Hybrid Data Sources**: Combines external API data with local storage
- **Offline Support**: Network status monitoring with offline indicators
- **Data Persistence**: Local users are saved to browser localStorage
- **Error Recovery**: Graceful error handling with retry mechanisms

### User Experience
- **Loading States**: Elegant loading spinners during data fetching
- **Toast Notifications**: Success and error feedback for user actions
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance Optimized**: Memoized components and optimized re-renders

## 🛠️ Technical Stack

- **Frontend Framework**: React 19 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS 4.x with custom component styles
- **Routing**: React Router DOM v7 for client-side navigation
- **State Management**: React Context API with custom hooks
- **Testing**: Vitest + React Testing Library for comprehensive test coverage
- **Data Source**: JSONPlaceholder API + localStorage for user data

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
