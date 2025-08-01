import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Custom render function - we'll mock UserProvider in individual tests
export const renderWithoutProvider = (ui, options = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// For tests that need the actual UserProvider (integration tests)
export const renderWithProviders = (ui, options = {}) => {
  // Import here to avoid circular dependency issues
  const { UserProvider } = require('../context/UserContext');
  
  const AllTheProviders = ({ children }) => {
    return (
      <BrowserRouter>
        <UserProvider>
          {children}
        </UserProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Mock user data for tests
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'john.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      zipcode: '12345'
    },
    company: {
      name: 'Acme Corp',
      catchPhrase: 'Innovation at its finest'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    website: 'jane.com',
    address: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      zipcode: '67890'
    },
    company: {
      name: 'Smith Inc'
    }
  }
];

// Mock fetch responses
export const mockFetchSuccess = (data = mockUsers) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};

export const mockFetchError = (errorMessage = 'Network error') => {
  global.fetch = vi.fn(() =>
    Promise.reject(new Error(errorMessage))
  );
};