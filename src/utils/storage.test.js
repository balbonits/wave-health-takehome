import { vi } from 'vitest';
import { getLocalUsers, saveLocalUsers, addLocalUser } from './storage';

const mockUsers = [
  { id: 11, name: 'Test User', email: 'test@example.com', isLocal: true }
];

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('getLocalUsers', () => {
    test('returns empty array when no users stored', () => {
      localStorage.getItem.mockReturnValue(null);
      
      const result = getLocalUsers();
      
      expect(result).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith('dashboard-users');
    });

    test('returns parsed users when data exists', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      const result = getLocalUsers();
      
      expect(result).toEqual(mockUsers);
    });

    test('returns empty array when JSON parsing fails', () => {
      localStorage.getItem.mockReturnValue('invalid-json');
      console.error = vi.fn(); // Mock console.error
      
      const result = getLocalUsers();
      
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('saveLocalUsers', () => {
    test('saves users to localStorage', () => {
      saveLocalUsers(mockUsers);
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'dashboard-users',
        JSON.stringify(mockUsers)
      );
    });

    test('handles localStorage errors gracefully', () => {
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });
      console.error = vi.fn();
      
      expect(() => saveLocalUsers(mockUsers)).not.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('addLocalUser', () => {
    test('adds new user with generated ID', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify(mockUsers));
      localStorage.setItem.mockImplementation(() => {});
      
      const userData = {
        name: 'New User',
        email: 'new@example.com',
        phone: '123-456-7890'
      };
      
      const result = addLocalUser(userData);
      
      expect(result.id).toBe(12); // Should be max existing ID + 1
      expect(result.name).toBe('New User');
      expect(result.isLocal).toBe(true);
      expect(result.address).toBeDefined();
      expect(result.company).toBeDefined();
    });
  });
});