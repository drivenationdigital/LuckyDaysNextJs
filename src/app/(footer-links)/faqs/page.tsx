import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "FAQ - Lucky Day Competitions",
    description: "Explore the FAQ of our exciting competitions and see who has won amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default function Page() {
    return (
        <>
            <h1>Welcome to FAQ page!</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Page 1</Link>
                    </li>
                    <li>
                        <Link href="/products">Page 2</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
