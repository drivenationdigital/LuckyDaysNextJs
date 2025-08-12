/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';
import { CompetitionProduct } from '@/types/posts';
import QuickBuyModal from './QuickBuyModal';


export const CompetitionGrid: React.FC<{ products: CompetitionProduct[] }> = ({ products }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    return (
        <div className="container">
            <QuickBuyModal
                show={modalVisible}
                product={selectedProduct}
                onClose={() => setModalVisible(false)}
            />
            <ul className="comp-grid row equal">
                {products.map((product) => {
                    const cardProps: ProductCardProps = {
                        href: `/product/${product.slug}`,
                        imageUrl: product.image,
                        categoryLabel: product.draw_date_tag || '',
                        title: product.title,
                        price: product.regular_price,
                        progressPercent: product.percentage_left,
                        ticketsRemaining: `${product.tickets_left}/${product.max_tickets}`,
                        endsText: product.draw_date_tag,
                        productId: product.id,
                        onQuickBuy: () => {
                            setModalVisible(true);
                            // Handle quick buy action
                            setSelectedProduct({
                                id: product.id,
                                name: product.title,
                                tickets: { left: product.tickets_left },
                                price_float: parseFloat(product.regular_price.replace(/[^0-9.-]+/g, '')),
                            });
                        },
                    };

                    return <ProductCard key={product.id} {...cardProps} />;
                })}
            </ul>
        </div>
    );
};

export default CompetitionGrid;
