import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Telegram Bot Admin Panel">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 dark:text-white">
                <header className="mb-8 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                📱
                            </div>
                            <h1 className="text-xl font-bold">TeleBot Admin</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="w-full max-w-6xl">
                    <main className="text-center">
                        <div className="mb-8">
                            <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
                                📞 Telegram Bot Number Rental
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                                Complete admin panel for managing phone number rentals, buyers, sellers, and bot operations
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="mb-12 grid gap-8 md:grid-cols-3">
                            <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">👥</div>
                                <h3 className="mb-3 text-xl font-semibold">Buyer Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    View, edit, and manage all buyers. Handle bans, set limits, and track activity
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">🏪</div>
                                <h3 className="mb-3 text-xl font-semibold">Seller Operations</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Manage seller accounts, track onboarding, and monitor performance
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">📱</div>
                                <h3 className="mb-3 text-xl font-semibold">Number Database</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Complete phone number inventory with status tracking and queue management
                                </p>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-12 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                            <h2 className="mb-6 text-2xl font-bold">🚀 Key Features</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="text-center">
                                    <div className="mb-2 text-2xl">⚡</div>
                                    <div className="font-medium">Real-time Updates</div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-2xl">🔒</div>
                                    <div className="font-medium">Secure Authentication</div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-2xl">📊</div>
                                    <div className="font-medium">Analytics Dashboard</div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-2xl">🔄</div>
                                    <div className="font-medium">Queue Management</div>
                                </div>
                            </div>
                        </div>

                        {/* Management Features */}
                        <div className="mb-12 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                                <h3 className="mb-3 text-xl font-bold">📈 Advanced Analytics</h3>
                                <p className="mb-4">Track performance metrics, user activity, and system statistics</p>
                                <ul className="space-y-1 text-sm opacity-90">
                                    <li>• User engagement metrics</li>
                                    <li>• Number utilization rates</li>
                                    <li>• Revenue tracking</li>
                                </ul>
                            </div>

                            <div className="rounded-xl bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
                                <h3 className="mb-3 text-xl font-bold">⚙️ System Control</h3>
                                <p className="mb-4">Complete administrative control over all system operations</p>
                                <ul className="space-y-1 text-sm opacity-90">
                                    <li>• Ban/unban users instantly</li>
                                    <li>• Modify number statuses</li>
                                    <li>• Queue prioritization</li>
                                </ul>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                                <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
                                <p className="mb-6 text-xl opacity-90">
                                    Join the platform and start managing your Telegram bot operations today
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-gray-100"
                                    >
                                        Create Account
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-lg font-medium text-white transition hover:bg-white hover:text-blue-600"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        )}

                        <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
                            Built with ❤️ for Telegram bot administrators
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}