'use client';
import React from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';
import { CompetitionProduct } from '@/types/posts';


export const CompetitionGrid: React.FC<{ products: CompetitionProduct[] }> = ({ products }) => {
    return (
        <div className="container">
            <ul className="comp-grid row equal">
                {products.map((product) => {
                    const cardProps: ProductCardProps = {
                        href: `/product/${product.id}`,
                        imageUrl: product.image,
                        categoryLabel: product.draw_date_tag || '',
                        title: product.title,
                        price: product.regular_price,
                        progressPercent: product.percentage_left,
                        ticketsRemaining: `${product.tickets_left}/${product.max_tickets}`,
                        endsText: product.draw_date_tag,
                        productId: product.id,
                    };

                    return <ProductCard key={product.id} {...cardProps} />;
                })}
            </ul>
        </div>
    );
};

export default CompetitionGrid;
