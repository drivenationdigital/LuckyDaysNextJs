"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const BottomBar = () => {
    const router = useRouter();

    return (
        <div className="bottom-bar d-flex justify-content-around align-items-center d-md-none">
            {/* Back Button */}
            <button
                className="bottom-item text-center btn p-0"
                onClick={() => router.back()}
            >
                <i className="fa fa-arrow-left"></i>
                <div className="bottom-label">Back</div>
            </button>

            {/* My Account */}
            <div className="bottom-item text-center">
                <i className="fa fa-user"></i>
                <div className="bottom-label">
                    <Link href="/my-account" className="dropdown-item">
                        My Account
                    </Link>
                </div>
            </div>

            {/* Basket */}
            <div className="bottom-item text-center">
                <i className="fa fa-shopping-cart"></i>
                <div className="bottom-label">
                    <Link href="/basket" className="dropdown-item">
                        Basket
                    </Link>
                </div>
            </div>
        </div>
    );
};
