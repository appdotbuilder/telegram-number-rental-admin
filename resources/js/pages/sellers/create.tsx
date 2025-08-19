import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { SellerForm } from '@/components/seller-form';

export default function SellersCreate() {
    const handleCancel = () => {
        router.visit(route('sellers.index'));
    };

    return (
        <AppShell>
            <Head title="Add New Seller" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        🏪 Add New Seller
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Create a new seller account with their status and onboarding information
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <SellerForm
                        submitUrl={route('sellers.store')}
                        method="post"
                        submitLabel="Create Seller"
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </AppShell>
    );
}