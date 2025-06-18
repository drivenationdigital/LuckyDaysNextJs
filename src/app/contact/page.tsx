import Link from "next/link";

export default function Page() {
    return (
        <>
            <h1>Welcome to contact page!</h1>
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
  