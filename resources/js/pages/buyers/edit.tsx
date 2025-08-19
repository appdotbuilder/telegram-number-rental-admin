import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { BuyerForm } from '@/components/buyer-form';

interface Buyer {
    id: number;
    name: string;
    is_banned: boolean;
    ban_reason?: string;
    mode?: string;
    branches_chat_id?: string;
    max_numbers_per_branch: number;
}

interface Props {
    buyer: Buyer;
    [key: string]: unknown;
}

export default function BuyersEdit({ buyer }: Props) {
    const handleCancel = () => {
        router.visit(route('buyers.show', buyer.id));
    };

    return (
        <AppShell>
            <Head title={`Edit: ${buyer.name}`} />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        ✏️ Edit Buyer: {buyer.name}
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Update buyer information and settings
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <BuyerForm
                        initialData={buyer as unknown as Record<string, unknown>}
                        submitUrl={route('buyers.update', buyer.id)}
                        method="patch"
                        submitLabel="Update Buyer"
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </AppShell>
    );
}