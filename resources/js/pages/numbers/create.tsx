import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { NumberForm } from '@/components/number-form';

interface Buyer {
    id: number;
    name: string;
}

interface Seller {
    id: number;
    name: string;
}

interface Props {
    buyers: Buyer[];
    sellers: Seller[];
    [key: string]: unknown;
}

export default function NumbersCreate({ buyers, sellers }: Props) {
    const handleCancel = () => {
        router.visit(route('numbers.index'));
    };

    return (
        <AppShell>
            <Head title="Add New Number" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        📱 Add New Number
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Register a new phone number and configure its settings
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <NumberForm
                        buyers={buyers}
                        sellers={sellers}
                        submitUrl={route('numbers.store')}
                        method="post"
                        submitLabel="Create Number"
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </AppShell>
    );
}