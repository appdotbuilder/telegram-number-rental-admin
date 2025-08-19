import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface Props {
    initialData?: Record<string, unknown>;
    submitUrl: string;
    method: 'post' | 'patch';
    submitLabel: string;
    onCancel: () => void;
}

export function BuyerForm({ initialData, submitUrl, method, submitLabel, onCancel }: Props) {
    const { data, setData, post, patch, processing, errors, transform } = useForm({
        name: (initialData?.name as string) || '',
        is_banned: Boolean(initialData?.is_banned) || false,
        ban_reason: (initialData?.ban_reason as string) || '',
        mode: (initialData?.mode as string) || '',
        branches_chat_id: (initialData?.branches_chat_id as string) || '',
        max_numbers_per_branch: Number(initialData?.max_numbers_per_branch) || 10,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Transform the data to ensure proper types
        transform((data) => ({
            ...data,
            max_numbers_per_branch: parseInt(data.max_numbers_per_branch.toString(), 10),
            is_banned: Boolean(data.is_banned),
            ban_reason: data.is_banned ? data.ban_reason : '',
        }));

        if (method === 'post') {
            post(submitUrl);
        } else {
            patch(submitUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name *
                </label>
                <input
                    type="text"
                    value={data.name as string}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    placeholder="Enter buyer name"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            {/* Mode */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mode
                </label>
                <select
                    value={data.mode as string}
                    onChange={(e) => setData('mode', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                >
                    <option value="">Select mode</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                </select>
                <InputError message={errors.mode} className="mt-2" />
            </div>

            {/* Branches Chat ID */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Branches Chat ID
                </label>
                <input
                    type="text"
                    value={data.branches_chat_id as string}
                    onChange={(e) => setData('branches_chat_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    placeholder="Enter chat ID"
                />
                <InputError message={errors.branches_chat_id} className="mt-2" />
            </div>

            {/* Max Numbers Per Branch */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max Numbers Per Branch *
                </label>
                <input
                    type="number"
                    min="1"
                    max="1000"
                    value={data.max_numbers_per_branch as number}
                    onChange={(e) => setData('max_numbers_per_branch', parseInt(e.target.value, 10) || 10)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                />
                <InputError message={errors.max_numbers_per_branch} className="mt-2" />
            </div>

            {/* Ban Status */}
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        id="is_banned"
                        type="checkbox"
                        checked={data.is_banned as boolean}
                        onChange={(e) => setData('is_banned', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="is_banned" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Ban this buyer
                    </label>
                </div>
                <InputError message={errors.is_banned} />

                {/* Ban Reason - only show if banned */}
                {data.is_banned && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ban Reason
                        </label>
                        <textarea
                            rows={3}
                            value={data.ban_reason as string}
                            onChange={(e) => setData('ban_reason', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                            placeholder="Enter reason for ban..."
                        />
                        <InputError message={errors.ban_reason} className="mt-2" />
                    </div>
                )}
            </div>

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