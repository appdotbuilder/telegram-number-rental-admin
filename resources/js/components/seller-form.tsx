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

export function SellerForm({ initialData, submitUrl, method, submitLabel, onCancel }: Props) {
    const { data, setData, post, patch, processing, errors, transform } = useForm({
        name: (initialData?.name as string) || '',
        status: (initialData?.status as string) || 'pending',
        project_id: (initialData?.project_id as string) || '',
        referrer: (initialData?.referrer as string) || '',
        invite_code: (initialData?.invite_code as string) || '',
        onboarding_completed: Boolean(initialData?.onboarding_completed) || false,
        onboarding_completed_at: (initialData?.onboarding_completed_at as string) || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Transform the data to ensure proper types
        transform((data) => ({
            ...data,
            onboarding_completed: Boolean(data.onboarding_completed),
            onboarding_completed_at: data.onboarding_completed && data.onboarding_completed_at ? data.onboarding_completed_at : '',
        }));

        if (method === 'post') {
            post(submitUrl);
        } else {
            patch(submitUrl);
        }
    };

    const statusOptions = [
        { value: 'active', label: 'Active', emoji: '✅' },
        { value: 'inactive', label: 'Inactive', emoji: '⏸️' },
        { value: 'pending', label: 'Pending', emoji: '⏳' },
        { value: 'suspended', label: 'Suspended', emoji: '🚫' },
    ];

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
                    placeholder="Enter seller name"
                />
                <InputError message={errors.name} className="mt-2" />
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

            <div className="grid gap-6 sm:grid-cols-2">
                {/* Project ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Project ID
                    </label>
                    <input
                        type="text"
                        value={data.project_id as string}
                        onChange={(e) => setData('project_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        placeholder="Enter project ID"
                    />
                    <InputError message={errors.project_id} className="mt-2" />
                </div>

                {/* Referrer */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Referrer
                    </label>
                    <input
                        type="text"
                        value={data.referrer as string}
                        onChange={(e) => setData('referrer', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        placeholder="Enter referrer"
                    />
                    <InputError message={errors.referrer} className="mt-2" />
                </div>
            </div>

            {/* Invite Code */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Invite Code
                </label>
                <input
                    type="text"
                    value={data.invite_code as string}
                    onChange={(e) => setData('invite_code', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    placeholder="Enter invite code"
                />
                <InputError message={errors.invite_code} className="mt-2" />
            </div>

            {/* Onboarding Status */}
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        id="onboarding_completed"
                        type="checkbox"
                        checked={data.onboarding_completed as boolean}
                        onChange={(e) => setData('onboarding_completed', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="onboarding_completed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Onboarding completed
                    </label>
                </div>
                <InputError message={errors.onboarding_completed} />

                {/* Onboarding Completed Date - only show if completed */}
                {data.onboarding_completed && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Onboarding Completed Date
                        </label>
                        <input
                            type="datetime-local"
                            value={data.onboarding_completed_at as string}
                            onChange={(e) => setData('onboarding_completed_at', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        />
                        <InputError message={errors.onboarding_completed_at} className="mt-2" />
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