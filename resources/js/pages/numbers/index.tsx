import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface NumberData {
    id: number;
    number: string;
    type: string;
    country: string;
    status: string;
    buyer?: {
        id: number;
        name: string;
    };
    seller?: {
        id: number;
        name: string;
    };
    bypass_the_queue: boolean;
    prefer_fast_queue: boolean;
    accepted_at?: string;
    finalized_at?: string;
    created_at: string;
}

interface Props {
    numbers: {
        data: NumberData[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function NumbersIndex({ numbers }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in_queue':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'accepted':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'finalized':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'returned_to_queue':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'in_queue': return '⏳';
            case 'accepted': return '✅';
            case 'finalized': return '🎯';
            case 'returned_to_queue': return '🔄';
            default: return '❓';
        }
    };

    const getTypeEmoji = (type: string) => {
        switch (type) {
            case 'mobile': return '📱';
            case 'landline': return '☎️';
            case 'voip': return '💻';
            default: return '📞';
        }
    };

    return (
        <AppShell>
            <Head title="Numbers Management" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📱 Numbers Management
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage all phone numbers and their assignments
                        </p>
                    </div>
                    <Link
                        href={route('numbers.create')}
                        className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Number
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {numbers.meta.total}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Numbers</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-blue-600">
                            {numbers.data.filter(n => n.status === 'in_queue').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">In Queue</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-yellow-600">
                            {numbers.data.filter(n => n.status === 'accepted').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Accepted</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="text-2xl font-bold text-green-600">
                            {numbers.data.filter(n => n.status === 'finalized').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Finalized</div>
                    </div>
                </div>

                {/* Numbers Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Buyer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Seller
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Queue
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
                                {numbers.data.map((number) => (
                                    <tr key={number.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                                    {getTypeEmoji(number.type)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {number.number}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                                                        {number.country}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(number.status)}`}>
                                                {getStatusEmoji(number.status)} {number.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">
                                            {number.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {number.buyer ? (
                                                <Link
                                                    href={route('buyers.show', number.buyer.id)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                >
                                                    {number.buyer.name}
                                                </Link>
                                            ) : (
                                                'Unassigned'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {number.seller ? (
                                                <Link
                                                    href={route('sellers.show', number.seller.id)}
                                                    className="text-green-600 hover:text-green-800 dark:text-green-400"
                                                >
                                                    {number.seller.name}
                                                </Link>
                                            ) : (
                                                'Unassigned'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-1">
                                                {number.bypass_the_queue && (
                                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                                        🚀 Bypass
                                                    </span>
                                                )}
                                                {number.prefer_fast_queue && (
                                                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                                                        ⚡ Fast
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(number.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('numbers.show', number.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('numbers.edit', number.id)}
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
                {numbers.meta.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {numbers.links.map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-purple-600 text-white'
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