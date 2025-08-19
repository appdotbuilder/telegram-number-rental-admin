import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { BuyerForm } from '@/components/buyer-form';

export default function BuyersCreate() {
    const handleCancel = () => {
        router.visit(route('buyers.index'));
    };

    return (
        <AppShell>
            <Head title="Add New Buyer" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        👤 Add New Buyer
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Create a new buyer account with their settings and permissions
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <BuyerForm
                        submitUrl={route('buyers.store')}
                        method="post"
                        submitLabel="Create Buyer"
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </AppShell>
    );
}