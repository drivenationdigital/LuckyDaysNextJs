/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';
import { CompetitionProduct } from '@/types/posts';
import QuickBuyModal from './QuickBuyModal';


export const CompetitionGrid: React.FC<{ products: CompetitionProduct[] }> = ({ products }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<CompetitionProduct | null>(null);

    return (
        <div className="container">
            <QuickBuyModal
                show={modalVisible}
                product={selectedProduct}
                onClose={() => setModalVisible(false)}
            />
            <ul className="comp-grid row equal">
                {products.map((product) => {
                    if (!product) return null;

                    const cardProps: ProductCardProps = {
                      href: `/product/${product.slug}`,
                      imageUrl: product.image,
                      categoryLabel: product.additional_info.text || "",
                      title: product.title,
                      price: product.regular_price,
                      progressPercent: product.percentage_left,
                      ticketsRemaining: `${product.tickets_left}/${product.max_tickets}`,
                      endsText: product.draw_date_tag,
                      endTimeStamp: new Date(product.end_date).getTime(),
                      productId: product.id,
                      onQuickBuy: () => {
                        setModalVisible(true);
                        // Handle quick buy action
                        setSelectedProduct(product);
                      },
                      ticketSalesDisabled: product.disable_ticket_sales == "1",
                    };

                    return <ProductCard key={product.id} {...cardProps} />;
                })}
            </ul>
        </div>
    );
};

export default CompetitionGrid;
