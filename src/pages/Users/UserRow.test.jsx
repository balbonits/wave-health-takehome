import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserRow from './UserRow';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  company: { name: 'Acme Corp' },
  isLocal: false
};

const mockLocalUser = {
  ...mockUser,
  id: 11,
  name: 'Local User',
  isLocal: true
};

describe('UserRow Component', () => {
  test('renders user information correctly', () => {
    const mockOnRowClick = vi.fn();
    
    render(<UserRow user={mockUser} onRowClick={mockOnRowClick} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  test('shows local badge for local users', () => {
    const mockOnRowClick = vi.fn();
    
    render(<UserRow user={mockLocalUser} onRowClick={mockOnRowClick} />);
    
    expect(screen.getByText('Local')).toBeInTheDocument();
    expect(screen.getByText('Local User')).toBeInTheDocument();
  });

  test('does not show local badge for API users', () => {
    const mockOnRowClick = vi.fn();
    
    render(<UserRow user={mockUser} onRowClick={mockOnRowClick} />);
    
    expect(screen.queryByText('Local')).not.toBeInTheDocument();
  });

  test('calls onRowClick when row is clicked', () => {
    const mockOnRowClick = vi.fn();
    
    render(<UserRow user={mockUser} onRowClick={mockOnRowClick} />);
    
    const row = screen.getByRole('row');
    fireEvent.click(row);
    
    expect(mockOnRowClick).toHaveBeenCalledWith(mockUser);
    expect(mockOnRowClick).toHaveBeenCalledTimes(1);
  });

  test('has proper accessibility attributes', () => {
    const mockOnRowClick = vi.fn();
    
    render(<UserRow user={mockUser} onRowClick={mockOnRowClick} />);
    
    const row = screen.getByRole('row');
    expect(row).toHaveClass('clickable-row');
  });
});