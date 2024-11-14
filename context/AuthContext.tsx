'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Types
interface User {
	email: string;
	id: string;
	name: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

// Fake user database
const MOCK_USERS = [
	{
		email: 'test@example.com',
		password: 'password123',
		id: '1',
		name: 'Test User',
	},
	{
		email: 'admin@example.com',
		password: 'admin123',
		id: '2',
		name: 'Admin User',
	},
];

// Helper functions
const generateFakeToken = (user: Omit<User, 'password'>) => {
	return btoa(
		JSON.stringify({
			...user,
			exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
		})
	);
};

const parseToken = (token: string): { user: User; exp: number } | null => {
	try {
		return JSON.parse(atob(token));
	} catch {
		return null;
	}
};

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Simulate authentication request
	const login = async (email: string, password: string) => {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password);

		if (!foundUser) {
			toast.error('Invalid email or password');
			throw new Error('Invalid credentials');
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = foundUser;
		const token = generateFakeToken(userWithoutPassword);

		// Store in localStorage
		localStorage.setItem('auth_token', token);
		setUser(userWithoutPassword);
		toast.success('Logged in successfully');
	};

	const logout = () => {
		localStorage.removeItem('auth_token');
		setUser(null);
		toast.info('Logged out successfully');
	};

	// Check token validity and load user on mount
	useEffect(() => {
		const initializeAuth = () => {
			const token = localStorage.getItem('auth_token');

			if (token) {
				const decoded = parseToken(token);

				if (decoded && decoded.exp > Date.now()) {
					setUser(decoded.user);
				} else {
					localStorage.removeItem('auth_token');
				}
			}

			setIsLoading(false);
		};

		// Only run on client side
		if (typeof window !== 'undefined') {
			initializeAuth();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				isAuthenticated: !!user,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

// Optional: Higher Order Component for protected routes
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
	return function WithAuthComponent(props: P) {
		const { isAuthenticated, isLoading } = useAuth();

		// If loading, return a loading component
		if (isLoading) {
			return <div>Loading...</div>;
		}

		// If not authenticated, redirect to login
		if (!isAuthenticated && typeof window !== 'undefined') {
			window.location.href = '/login';
			return null;
		}

		// If authenticated, render the protected component
		return <WrappedComponent {...props} />;
	};
}
