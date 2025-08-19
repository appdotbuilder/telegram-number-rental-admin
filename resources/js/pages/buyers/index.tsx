import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Buyer {
    id: number;
    name: string;
    is_banned: boolean;
    ban_reason?: string;
    mode?: string;
    branches_chat_id?: string;
    max_numbers_per_branch: number;
    numbers_count: number;
    created_at: string;
}

interface Props {
    buyers: {
        data: Buyer[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function BuyersIndex({ buyers }: Props) {
    return (
        <AppShell>
            <Head title="Buyers Management" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👥 Buyers Management
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage all buyer accounts and their settings
                        </p>
                    </div>
                    <Link
                        href={route('buyers.create')}
                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Buyer
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {buyers.meta.total}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Buyers</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-green-600">
                            {buyers.data.filter(b => !b.is_banned).length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active Buyers</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-red-600">
                            {buyers.data.filter(b => b.is_banned).length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Banned Buyers</div>
                    </div>
                </div>

                {/* Buyers Table */}
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
                                        Mode
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Numbers
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Max Per Branch
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
                                {buyers.data.map((buyer) => (
                                    <tr key={buyer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                    👤
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {buyer.name}
                                                    </div>
                                                    {buyer.branches_chat_id && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Chat: {buyer.branches_chat_id}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {buyer.is_banned ? (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                                    🚫 Banned
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                    ✅ Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {buyer.mode || 'Not set'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {buyer.numbers_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {buyer.max_numbers_per_branch}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(buyer.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('buyers.show', buyer.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('buyers.edit', buyer.id)}
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
                {buyers.meta.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {buyers.links.map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
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