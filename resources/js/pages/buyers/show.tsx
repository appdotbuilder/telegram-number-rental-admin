import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Buyer {
    id: number;
    name: string;
    is_banned: boolean;
    ban_reason?: string;
    mode?: string;
    branches_chat_id?: string;
    max_numbers_per_branch: number;
    created_at: string;
    updated_at: string;
    numbers?: Array<{
        id: number;
        number: string;
        status: string;
        type: string;
        country: string;
        created_at: string;
    }>;
}

interface Props {
    buyer: Buyer;
    [key: string]: unknown;
}

export default function BuyersShow({ buyer }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this buyer? This action cannot be undone.')) {
            router.delete(route('buyers.destroy', buyer.id));
        }
    };

    return (
        <AppShell>
            <Head title={`Buyer: ${buyer.name}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👤 {buyer.name}
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Buyer details and associated numbers
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('buyers.edit', buyer.id)}
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Edit Buyer
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Status Banner */}
                {buyer.is_banned && (
                    <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                🚫
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                    This buyer is banned
                                </h3>
                                {buyer.ban_reason && (
                                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                        <p>Reason: {buyer.ban_reason}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Buyer Details */}
                    <div className="lg:col-span-2">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Buyer Information
                            </h2>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{buyer.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                                    <dd className="mt-1">
                                        {buyer.is_banned ? (
                                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                                🚫 Banned
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                ✅ Active
                                            </span>
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mode</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{buyer.mode || 'Not set'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Max Numbers Per Branch</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{buyer.max_numbers_per_branch}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Branches Chat ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{buyer.branches_chat_id || 'Not set'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {new Date(buyer.created_at).toLocaleString()}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Quick Stats
                            </h2>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{buyer.numbers?.length || 0}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Associated Numbers</div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Quick Actions
                            </h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('numbers.create', { buyer_id: buyer.id })}
                                    className="block w-full rounded-lg border-2 border-dashed border-gray-300 p-3 text-center text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-400"
                                >
                                    📱 Add Number
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Associated Numbers */}
                {buyer.numbers && buyer.numbers.length > 0 && (
                    <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Associated Numbers
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Country
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {buyer.numbers.map((number) => (
                                        <tr key={number.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {number.number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                                                {number.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 capitalize">
                                                    {number.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 uppercase">
                                                {number.country}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('numbers.show', number.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}