export default async function Page() {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="woocommerce-notices-wrapper"></div>
                    <div className="title">
                        <h3>Your recent orders</h3>
                    </div>

                    <table className="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table usr221700">
                        <thead>
                            <tr>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-number"><span className="nobr">Order</span></th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-date"><span className="nobr">Date</span></th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-status"><span className="nobr">Status</span></th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-total"><span className="nobr">Total</span></th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-actions"><span className="nobr">Actions</span></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="woocommerce-orders-table__row woocommerce-orders-table__row--status-completed order order3096024">
                                <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-number" data-title="Order">
                                    <a href="https://staging.luckydaycompetitions.com/my-account/view-order/3096024/">
                                        #3096024								</a>

                                </td>
                                <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-date" data-title="Date">
                                    <time dateTime="2025-05-30T10:34:57+00:00">30th May 2025</time>

                                </td>
                                <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-status" data-title="Status">
                                    Completed
                                </td>
                                <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-total" data-title="Total">
                                    <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">£</span>0.00</span> for 10 items
                                </td>
                                <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-actions" data-title="Actions">
                                    <a href="https://staging.luckydaycompetitions.com/my-account/view-order/3096024/" className="woocommerce-button button view">View</a>													</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}