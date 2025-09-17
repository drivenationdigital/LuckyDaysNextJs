'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useObservedQuery } from '@/app/context/competitions-context';
import Link from 'next/link';
import classNames from 'classnames';
import { CompetitionSections } from '@/types/posts';
import CompetitionGrid from './competition/CompetitionGrid';


export const HomeProducts: React.FC = () => {
    const { data, isFetching } = useObservedQuery();
    const navRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        if (!navRef.current) return;

        // const navTop = navRef.current.getBoundingClientRect().top;
        // const headerOffset = 120; // adjust based on header height
        // if (navTop <= headerOffset) {
        //     setIsSticky(true);
        // } else {
        //     setIsSticky(false);
        // }

        window.scrollY > 120 ? setIsSticky(true) : setIsSticky(false); 
    };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    if (isFetching || !data) return <div className="text-center py-10 text-white mt-5 pt-2">Loading competitions...</div>;

    const sections: CompetitionSections = data.pages[0];
    
    const navItems = Object.entries(sections).map(([key, section]) => ({
        id: key,
        title: section.title,
    }));

    return (
        <>
            <div
                ref={navRef}
                className={classNames("nav-bar-wrapper sticky-header-nav", {
                    'sticky-nav': isSticky,
                })}
            >
                <div className="nav-bar-list">
                    <ul className="nav-bar-ul">
                        {navItems.map(({ id, title }) => (
                            <li key={id}>
                                <a href={`#${id}`}>{title}</a>
                            </li>
                        ))}
                        <li>
                            <Link href="/all-competitions">All Prizes</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {Object.entries(sections).map(([sectionId, section]) => (
                section.products?.length > 0 && (
                    <section
                        key={sectionId}
                        id={sectionId}
                        className={classNames("top-competition-section text-center", section.class || '')}
                    >
                        <div className="container">
                            {section?.sectionHeading && (
                                <div className="home-sub-titless">{section.sectionHeading}</div>
                            )}
                            <h5 className="title-line wow fadeIn title-with-subtitle">
                                <span className="bg-white">{section.title}</span>
                            </h5>
                            <div className="title-subtitle">Cash Alternative Available For All Prizes</div>
                            <div className="top-copetition-item">
                                <CompetitionGrid products={section.products} />
                            </div>
                        </div>
                    </section>
                )
            ))}
        </>
    );
};
