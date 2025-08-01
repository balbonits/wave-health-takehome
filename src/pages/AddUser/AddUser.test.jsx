import { vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddUser from './AddUser';
import { renderWithoutProvider } from '../../utils/test-utils.jsx';

// Mock the context
const mockAddUser = vi.fn();
vi.mock('../../context/UserContext', () => ({
  useUsers: () => ({
    addUser: mockAddUser
  })
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock useToast hook
const mockShowToast = vi.fn();
const mockHideToast = vi.fn();
vi.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    toast: { message: '', type: '', isVisible: false },
    showToast: mockShowToast,
    hideToast: mockHideToast
  })
}));

describe('AddUser Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    renderWithoutProvider(<AddUser />);
    
    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
  });

  test('shows validation errors for required fields', async () => {
    renderWithoutProvider(<AddUser />);
    
    const submitButton = screen.getByText('Add User');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone is required')).toBeInTheDocument();
    });
    
    expect(mockAddUser).not.toHaveBeenCalled();
  });

    test('validates email format and prevents submission', async () => {
        renderWithoutProvider(<AddUser />);

        // Fill name and phone to be valid, but email to be invalid format
        fireEvent.change(screen.getByLabelText(/name \*/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/phone \*/i), { target: { value: '123-456-7890' } });
        fireEvent.change(screen.getByLabelText(/email \*/i), { target: { value: 'invalid-email-format' } });

        const submitButton = screen.getByText('Add User');
        fireEvent.click(submitButton);

        // The most important test: form should not submit with invalid email
        expect(mockAddUser).not.toHaveBeenCalled();

        // Wait to ensure no submission occurs
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(mockAddUser).not.toHaveBeenCalled();
    });


  test('clears errors when user starts typing', async () => {
    const user = userEvent.setup();
    renderWithoutProvider(<AddUser />);
    
    // Trigger validation errors
    const submitButton = screen.getByText('Add User');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    
    // Start typing in name field
    const nameInput = screen.getByLabelText(/name \*/i);
    await user.type(nameInput, 'John');
    
    // Error should be cleared
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockAddUser.mockResolvedValue({ id: 11, name: 'John Doe' });
    
    renderWithoutProvider(<AddUser />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/name \*/i), 'John Doe');
    await user.type(screen.getByLabelText(/email \*/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone \*/i), '123-456-7890');
    
    const submitButton = screen.getByText('Add User');
    fireEvent.click(submitButton);
    
    // Should show submitting state
    await waitFor(() => {
      expect(screen.getByText('Adding User...')).toBeInTheDocument();
    });
    
    // Should call addUser
    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        website: '',
        street: '',
        city: '',
        zipcode: '',
        company: ''
      });
    });
  });

  test('cancel button navigates back', () => {
    renderWithoutProvider(<AddUser />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});