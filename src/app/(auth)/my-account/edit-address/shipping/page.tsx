'use client'
import { useSession } from '@/app/hooks/useSession';
import AddressUpdateForm from '@/components/myaccount/AddressEditForm';

export default function Page() {
    const { isLoggedIn, refetch, user } = useSession();

    if (!isLoggedIn) return null;

    return (
        <div className="tab-block">
                <AddressUpdateForm
                    address_type='shipping'
                    defaultValues={user?.shipping_address}
                    onUpdate={refetch}
                />
        </div>
    );
}