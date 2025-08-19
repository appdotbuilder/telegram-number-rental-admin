import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface Buyer {
    id: number;
    name: string;
}

interface Seller {
    id: number;
    name: string;
}

interface Props {
    initialData?: Record<string, unknown>;
    buyers: Buyer[];
    sellers: Seller[];
    submitUrl: string;
    method: 'post' | 'patch';
    submitLabel: string;
    onCancel: () => void;
}

export function NumberForm({ initialData, buyers, sellers, submitUrl, method, submitLabel, onCancel }: Props) {
    const { data, setData, post, patch, processing, errors, transform } = useForm({
        number: (initialData?.number as string) || '',
        type: (initialData?.type as string) || 'mobile',
        country: (initialData?.country as string) || '',
        status: (initialData?.status as string) || 'in_queue',
        buyer_id: (initialData?.buyer_id as string) || '',
        seller_id: (initialData?.seller_id as string) || '',
        bypass_the_queue: Boolean(initialData?.bypass_the_queue) || false,
        prefer_fast_queue: Boolean(initialData?.prefer_fast_queue) || false,
        accepted_at: (initialData?.accepted_at as string) || '',
        finalized_at: (initialData?.finalized_at as string) || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Transform the data to ensure proper types
        transform((data) => ({
            ...data,
            buyer_id: data.buyer_id ? parseInt(data.buyer_id.toString(), 10) : null,
            seller_id: data.seller_id ? parseInt(data.seller_id.toString(), 10) : null,
            bypass_the_queue: Boolean(data.bypass_the_queue),
            prefer_fast_queue: Boolean(data.prefer_fast_queue),
            accepted_at: data.accepted_at || null,
            finalized_at: data.finalized_at || null,
        }));

        if (method === 'post') {
            post(submitUrl);
        } else {
            patch(submitUrl);
        }
    };

    const typeOptions = [
        { value: 'mobile', label: 'Mobile', emoji: '📱' },
        { value: 'landline', label: 'Landline', emoji: '☎️' },
        { value: 'voip', label: 'VoIP', emoji: '💻' },
    ];

    const statusOptions = [
        { value: 'in_queue', label: 'In Queue', emoji: '⏳' },
        { value: 'accepted', label: 'Accepted', emoji: '✅' },
        { value: 'finalized', label: 'Finalized', emoji: '🎯' },
        { value: 'returned_to_queue', label: 'Returned to Queue', emoji: '🔄' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                {/* Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number *
                    </label>
                    <input
                        type="text"
                        value={data.number as string}
                        onChange={(e) => setData('number', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        placeholder="Enter phone number"
                    />
                    <InputError message={errors.number} className="mt-2" />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country Code *
                    </label>
                    <input
                        type="text"
                        maxLength={2}
                        value={data.country as string}
                        onChange={(e) => setData('country', e.target.value.toUpperCase())}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        placeholder="US, UK, CA..."
                    />
                    <InputError message={errors.country} className="mt-2" />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {/* Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Number Type *
                    </label>
                    <select
                        value={data.type as string}
                        onChange={(e) => setData('type', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                        {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.emoji} {option.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.type} className="mt-2" />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status *
                    </label>
                    <select
                        value={data.status as string}
                        onChange={(e) => setData('status', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.emoji} {option.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {/* Buyer */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Assigned Buyer
                    </label>
                    <select
                        value={data.buyer_id as string}
                        onChange={(e) => setData('buyer_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                        <option value="">No buyer assigned</option>
                        {buyers.map((buyer) => (
                            <option key={buyer.id} value={buyer.id}>
                                {buyer.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.buyer_id} className="mt-2" />
                </div>

                {/* Seller */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Assigned Seller
                    </label>
                    <select
                        value={data.seller_id as string}
                        onChange={(e) => setData('seller_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                        <option value="">No seller assigned</option>
                        {sellers.map((seller) => (
                            <option key={seller.id} value={seller.id}>
                                {seller.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.seller_id} className="mt-2" />
                </div>
            </div>

            {/* Queue Settings */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Queue Settings</h3>
                
                <div className="space-y-3">
                    <div className="flex items-center">
                        <input
                            id="bypass_the_queue"
                            type="checkbox"
                            checked={data.bypass_the_queue as boolean}
                            onChange={(e) => setData('bypass_the_queue', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label htmlFor="bypass_the_queue" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            🚀 Bypass the queue
                        </label>
                    </div>
                    
                    <div className="flex items-center">
                        <input
                            id="prefer_fast_queue"
                            type="checkbox"
                            checked={data.prefer_fast_queue as boolean}
                            onChange={(e) => setData('prefer_fast_queue', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label htmlFor="prefer_fast_queue" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            ⚡ Prefer fast queue
                        </label>
                    </div>
                </div>
            </div>

            {/* Timestamp Fields */}
            {(data.status === 'accepted' || data.status === 'finalized') && (
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Accepted Date
                        </label>
                        <input
                            type="datetime-local"
                            value={data.accepted_at as string}
                            onChange={(e) => setData('accepted_at', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        />
                        <InputError message={errors.accepted_at} className="mt-2" />
                    </div>

                    {data.status === 'finalized' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Finalized Date
                            </label>
                            <input
                                type="datetime-local"
                                value={data.finalized_at as string}
                                onChange={(e) => setData('finalized_at', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                            />
                            <InputError message={errors.finalized_at} className="mt-2" />
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}