import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    buyers: {
        total: number;
        banned: number;
        active: number;
    };
    sellers: {
        total: number;
        active: number;
        pending: number;
        suspended: number;
    };
    numbers: {
        total: number;
        in_queue: number;
        accepted: number;
        finalized: number;
    };
}

interface Recent {
    buyers: Array<{
        id: number;
        name: string;
        is_banned: boolean;
        created_at: string;
    }>;
    sellers: Array<{
        id: number;
        name: string;
        status: string;
        created_at: string;
    }>;
    numbers: Array<{
        id: number;
        number: string;
        status: string;
        buyer?: { name: string };
        seller?: { name: string };
        created_at: string;
    }>;
}

interface Props {
    stats: Stats;
    recent: Recent;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recent }: Props) {
    const getStatusColor = (status: string, type: string) => {
        if (type === 'buyer') {
            return status === 'banned' ? 'text-red-600' : 'text-green-600';
        }
        if (type === 'seller') {
            switch (status) {
                case 'active': return 'text-green-600';
                case 'pending': return 'text-yellow-600';
                case 'suspended': return 'text-red-600';
                default: return 'text-gray-600';
            }
        }
        if (type === 'number') {
            switch (status) {
                case 'in_queue': return 'text-blue-600';
                case 'accepted': return 'text-yellow-600';
                case 'finalized': return 'text-green-600';
                case 'returned_to_queue': return 'text-gray-600';
                default: return 'text-gray-600';
            }
        }
        return 'text-gray-600';
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        📊 Admin Dashboard
                    </h1>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Buyers Stats */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    👥 Buyers
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.buyers.total}
                                </p>
                            </div>
                            <Link
                                href={route('buyers.index')}
                                className="rounded-lg bg-blue-50 p-3 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="mt-4 flex space-x-4 text-sm">
                            <div className="text-green-600">
                                Active: {stats.buyers.active}
                            </div>
                            <div className="text-red-600">
                                Banned: {stats.buyers.banned}
                            </div>
                        </div>
                    </div>

                    {/* Sellers Stats */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    🏪 Sellers
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.sellers.total}
                                </p>
                            </div>
                            <Link
                                href={route('sellers.index')}
                                className="rounded-lg bg-green-50 p-3 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </Link>
                        </div>
                        <div className="mt-4 flex space-x-4 text-sm">
                            <div className="text-green-600">
                                Active: {stats.sellers.active}
                            </div>
                            <div className="text-yellow-600">
                                Pending: {stats.sellers.pending}
                            </div>
                        </div>
                    </div>

                    {/* Numbers Stats */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    📱 Numbers
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.numbers.total}
                                </p>
                            </div>
                            <Link
                                href={route('numbers.index')}
                                className="rounded-lg bg-purple-50 p-3 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="mt-4 flex space-x-4 text-sm">
                            <div className="text-blue-600">
                                Queue: {stats.numbers.in_queue}
                            </div>
                            <div className="text-green-600">
                                Final: {stats.numbers.finalized}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Buyers */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Recent Buyers
                            </h2>
                            <Link
                                href={route('buyers.index')}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent.buyers.map((buyer) => (
                                <div key={buyer.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {buyer.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(buyer.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`text-sm font-medium ${getStatusColor(buyer.is_banned ? 'banned' : 'active', 'buyer')}`}>
                                        {buyer.is_banned ? 'Banned' : 'Active'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Sellers */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Recent Sellers
                            </h2>
                            <Link
                                href={route('sellers.index')}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent.sellers.map((seller) => (
                                <div key={seller.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {seller.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(seller.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`text-sm font-medium capitalize ${getStatusColor(seller.status, 'seller')}`}>
                                        {seller.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Numbers */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Recent Numbers
                            </h2>
                            <Link
                                href={route('numbers.index')}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent.numbers.map((number) => (
                                <div key={number.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {number.number}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {number.buyer?.name || number.seller?.name || 'Unassigned'}
                                        </p>
                                    </div>
                                    <span className={`text-sm font-medium capitalize ${getStatusColor(number.status, 'number')}`}>
                                        {number.status.replace('_', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        ⚡ Quick Actions
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                            href={route('buyers.create')}
                            className="flex items-center space-x-3 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
                        >
                            <div className="text-2xl">👤</div>
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">Add Buyer</div>
                                <div className="text-sm text-gray-500">Create new buyer account</div>
                            </div>
                        </Link>

                        <Link
                            href={route('sellers.create')}
                            className="flex items-center space-x-3 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-green-500 hover:bg-green-50 dark:border-gray-600 dark:hover:border-green-400 dark:hover:bg-green-900/20"
                        >
                            <div className="text-2xl">🏪</div>
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">Add Seller</div>
                                <div className="text-sm text-gray-500">Create new seller account</div>
                            </div>
                        </Link>

                        <Link
                            href={route('numbers.create')}
                            className="flex items-center space-x-3 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-purple-500 hover:bg-purple-50 dark:border-gray-600 dark:hover:border-purple-400 dark:hover:bg-purple-900/20"
                        >
                            <div className="text-2xl">📱</div>
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">Add Number</div>
                                <div className="text-sm text-gray-500">Register new phone number</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}