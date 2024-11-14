'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();

	const handleLogin = () => {
		// Simulating login process
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Simulating logout process
		setIsLoggedIn(false);
		router.push('/');
	};

	return (
		<nav className="bg-background border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<Link href="/" className="text-2xl font-bold text-primary">
								Feedlify
							</Link>
						</div>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link
								href="/"
								className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
							>
								Home
							</Link>
							<Link
								href="/about"
								className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
							>
								About Us
							</Link>
							<Link
								href="/contact"
								className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
							>
								Contact Us
							</Link>
						</div>
					</div>
					<div className="hidden md:block">
						{isLoggedIn ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-8 w-8 rounded-full"
									>
										<Avatar className="h-8 w-8">
											<AvatarImage src="/placeholder.svg" alt="User avatar" />
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuItem onSelect={() => router.push('/dashboard')}>
										<User className="mr-2 h-4 w-4" />
										<span>Dashboard</span>
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={() => router.push('/profile')}>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onSelect={handleLogout}>
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button onClick={handleLogin}>Login</Button>
						)}
					</div>
					<div className="md:hidden">
						<Button
							variant="ghost"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link
							href="/"
							className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
						>
							Home
						</Link>
						<Link
							href="/about"
							className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
						>
							About Us
						</Link>
						<Link
							href="/contact"
							className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
						>
							Contact Us
						</Link>
						{isLoggedIn ? (
							<>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => router.push('/dashboard')}
								>
									Dashboard
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => router.push('/profile')}
								>
									Profile
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={handleLogout}
								>
									Log out
								</Button>
							</>
						) : (
							<Button className="w-full" onClick={handleLogin}>
								Login
							</Button>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
