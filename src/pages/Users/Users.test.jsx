import { vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from './Users';
import { renderWithoutProvider, mockUsers } from '../../utils/test-utils.jsx';

// Mock the useUsers hook directly
const mockRetryLoadUsers = vi.fn();
vi.mock('../../context/UserContext', () => ({
  useUsers: () => ({
    users: mockUsers,
    loading: false,
    error: null,
    isOnline: true,
    retryLoadUsers: mockRetryLoadUsers
  })
}));

describe('Users Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders users list correctly', async () => {
    renderWithoutProvider(<Users />);
    
    expect(screen.getByText('Users (2)')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    const user = userEvent.setup();
    renderWithoutProvider(<Users />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    
    await user.type(searchInput, 'john');
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Users (1)')).toBeInTheDocument();
  });

  test('search by email works', async () => {
    const user = userEvent.setup();
    renderWithoutProvider(<Users />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    
    await user.type(searchInput, 'jane@example.com');
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('sort functionality works', async () => {
    renderWithoutProvider(<Users />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Check that sort indicator appears
    await waitFor(() => {
      expect(screen.getByText(/Name.*↑/)).toBeInTheDocument();
    });
    
    // Click again to reverse sort
    fireEvent.click(nameHeader);
    
    await waitFor(() => {
      expect(screen.getByText(/Name.*↓/)).toBeInTheDocument();
    });
  });

  test('opens modal when user row is clicked', async () => {
    renderWithoutProvider(<Users />);
    
    const johnRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(johnRow);
    
    // Look for content that's ONLY in the modal, not in the table
    await waitFor(() => {
        expect(screen.getByText('123 Main St, Anytown 12345')).toBeInTheDocument();
    });
    
    // Also check for the "Website:" label which is only in modal
    await waitFor(() => {
        expect(screen.getByText('Website:')).toBeInTheDocument();
    });
    
    // And check for the company slogan which is only in modal
    await waitFor(() => {
        expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();
    });
    });  

  test('shows no results message when search yields no results', async () => {
    const user = userEvent.setup();
    renderWithoutProvider(<Users />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    
    await user.type(searchInput, 'nonexistent');
    
    expect(screen.getByText('No users found matching your search.')).toBeInTheDocument();
    expect(screen.getByText('Users (0)')).toBeInTheDocument();
  });
});