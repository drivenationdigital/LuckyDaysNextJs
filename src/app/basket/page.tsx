export const dynamic = 'force-dynamic';

import Basket from '@/components/Cart';
// meta
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cart - Lucky Day Competitions',
    description: 'Your shopping cart',
};

export default function Page() {
    return (
        <Basket/>
    )
}
