import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Seller {
    id: number;
    name: string;
    status: string;
    project_id?: string;
    referrer?: string;
    invite_code?: string;
    onboarding_completed: boolean;
    onboarding_completed_at?: string;
    numbers_count: number;
    created_at: string;
}

interface Props {
    sellers: {
        data: Seller[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function SellersIndex({ sellers }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'suspended':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'active': return '✅';
            case 'pending': return '⏳';
            case 'suspended': return '🚫';
            case 'inactive': return '⏸️';
            default: return '❓';
        }
    };

    return (
        <AppShell>
            <Head title="Sellers Management" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🏪 Sellers Management
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage all seller accounts and their onboarding status
                        </p>
                    </div>
                    <Link
                        href={route('sellers.create')}
                        className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Seller
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {sellers.meta.total}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Sellers</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-green-600">
                            {sellers.data.filter(s => s.status === 'active').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-yellow-600">
                            {sellers.data.filter(s => s.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-blue-600">
                            {sellers.data.filter(s => s.onboarding_completed).length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Onboarded</div>
                    </div>
                </div>

                {/* Sellers Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Onboarding
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Project ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Numbers
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {sellers.data.map((seller) => (
                                    <tr key={seller.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                                    🏪
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {seller.name}
                                                    </div>
                                                    {seller.referrer && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Ref: {seller.referrer}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(seller.status)}`}>
                                                {getStatusEmoji(seller.status)} {seller.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {seller.onboarding_completed ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                    ✅ Complete
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                                                    ⏳ Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {seller.project_id || 'Not set'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {seller.numbers_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(seller.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('sellers.show', seller.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('sellers.edit', seller.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination would go here if needed */}
                {sellers.meta.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {sellers.links.map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-green-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        className="px-3 py-2 text-sm text-gray-400"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}