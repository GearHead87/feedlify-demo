import React from 'react';
import { AuthProvider } from './AuthContext';

const Provider = ({ children }: { children: React.ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};

export default Provider;
