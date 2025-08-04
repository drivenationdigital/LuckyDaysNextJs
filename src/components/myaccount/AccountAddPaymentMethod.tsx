
import { API_URL } from '@/actions/api';
import React from 'react'

export const AccountAddPaymentMethod: React.FC = async () => {
    const response = await fetch(API_URL + '/wp-json/wc/v3/payment-methods/form?method=dnapayments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    console.log(`Response from payment method form:`, data);

    return (
        <>
        <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
        </>
    )

    return (
        <div className="woocommerce-add-payment-method">
            <form id="add_payment_method" method="post" style={{ position: 'static', zoom: 1 }}>
                <div id="payment" className="woocommerce-Payment">
                    <ul className="woocommerce-PaymentMethods payment_methods methods">
                        <li className="woocommerce-PaymentMethod woocommerce-PaymentMethod--dnapayments payment_method_dnapayments">
                            <input id="payment_method_dnapayments" type="radio" className="input-radio" name="payment_method" value="dnapayments" checked />
                            <label htmlFor="payment_method_dnapayments">Pay with Card
                                <img decoding="async" src="https://staging.luckydaycompetitions.com/wp-content/plugins/woocommerce-dnapayments-gateway-master/assets/img/schemes/unionpay.svg" className="wc-dnapayments-scheme-icon" alt="unionpay" />
                                <img decoding="async" src="https://staging.luckydaycompetitions.com/wp-content/plugins/woocommerce-dnapayments-gateway-master/assets/img/schemes/mastercard.svg" className="wc-dnapayments-scheme-icon" alt="mastercard" />
                                <img decoding="async" src="https://staging.luckydaycompetitions.com/wp-content/plugins/woocommerce-dnapayments-gateway-master/assets/img/schemes/visa.svg" className="wc-dnapayments-scheme-icon" alt="visa" />
                            </label>
                            <div className="woocommerce-PaymentBox woocommerce-PaymentBox--dnapayments payment_box payment_method_dnapayments" ><p>Card payment method</p>
                                <div id="wc-dnapayments-form">
                                    <div id="dna-card-cvc-token-container" className="form-row" style={{ display: 'none' }}>
                                        <label htmlFor="dna-card-cvc-token">Card code (CVC)</label>
                                        <div id="dna-card-cvc-token" className="wc-classic-dnapayments-gateway-input">
                                            <iframe src="https://cdn.dnapayments.com/js/hosted-fields/hosted-fields-frame.html#17e4e4aa-7bea-4625-90ee-b59731ab4f6e" frameBorder="0" allowTransparency={true} scrolling="no" name="dna-payments-hosted-field-tokenizedCardCvv" id="dna-payments-hosted-field-tokenizedCardCvv" style={{ border: 'none', width: '100%', height: '100%', float: 'left' }}></iframe>
                                            <div style={{ clear: 'both' }}></div>
                                        </div>
                                    </div>

                                    <fieldset id="wc-dnapayments-cc-form" className="wc-credit-card-form wc-payment-form"
                                        style={{ background: 'transparent' }}>

                                        <div className="wc-classic-dnapayments-card-elements">
                                            <div className="wc-classic-dnapayments-gateway-container">
                                                <label htmlFor="dna-card-number">Card number</label>
                                                <div className="wc-classic-dnapayments-gateway-input-container">
                                                    <div id="dna-card-number" className="wc-classic-dnapayments-gateway-input has-error"><iframe src="https://cdn.dnapayments.com/js/hosted-fields/hosted-fields-frame.html#17e4e4aa-7bea-4625-90ee-b59731ab4f6e" frameBorder="0" allowTransparency={true} scrolling="no" name="dna-payments-hosted-field-cardNumber" id="dna-payments-hosted-field-cardNumber" style={{ border: 'none', width: '100%', height: '100%', float: 'left' }}></iframe><div style={{ clear: 'both' }}></div></div>
                                                    <img decoding="async" id="dna-card-selected" className="wc-dnapayments-card-selected" src="https://staging.luckydaycompetitions.com/wp-content/plugins/woocommerce-dnapayments-gateway-master/assets/img/schemes/none.svg" alt="Selected card" />
                                                </div>
                                            </div>

                                            <div className="wc-classic-dnapayments-gateway-container">
                                                <label htmlFor="dna-card-name">Cardholder name</label>
                                                <div id="dna-card-name" className="wc-classic-dnapayments-gateway-input has-error"><iframe src="https://cdn.dnapayments.com/js/hosted-fields/hosted-fields-frame.html#17e4e4aa-7bea-4625-90ee-b59731ab4f6e" frameBorder="0" allowTransparency={true} scrolling="no" name="dna-payments-hosted-field-cardholderName" id="dna-payments-hosted-field-cardholderName" style={{ border: 'none', width: '100%', height: '100%', float: 'left' }}></iframe><div style={{ clear: 'both' }}></div></div>
                                            </div>

                                            <div className="wc-classic-dnapayments-gateway-container wc-classic-dnapayments-card-element-small">
                                                <label htmlFor="dna-card-exp">Expiry date</label>
                                                <div id="dna-card-exp" className="wc-classic-dnapayments-gateway-input has-error"><iframe src="https://cdn.dnapayments.com/js/hosted-fields/hosted-fields-frame.html#17e4e4aa-7bea-4625-90ee-b59731ab4f6e" frameBorder="0" allowTransparency={true} scrolling="no" name="dna-payments-hosted-field-expirationDate" id="dna-payments-hosted-field-expirationDate" style={{ border: 'none', width: '100%', height: '100%', float: 'left' }}></iframe><div style={{ clear: 'both' }}></div></div>
                                            </div>

                                            <div className="wc-classic-dnapayments-gateway-container wc-classic-dnapayments-card-element-small">
                                                <label htmlFor="dna-card-cvc">Card code (CVC)</label>
                                                <div id="dna-card-cvc" className="wc-classic-dnapayments-gateway-input dna-payments-hosted-field-valid"><iframe src="https://cdn.dnapayments.com/js/hosted-fields/hosted-fields-frame.html#17e4e4aa-7bea-4625-90ee-b59731ab4f6e" frameBorder="0" allowTransparency={true} scrolling="no" name="dna-payments-hosted-field-cvv" id="dna-payments-hosted-field-cvv" style={{ border: 'none', width: '100%', height: '100%', float: 'left' }}></iframe><div style={{ clear: 'both' }}></div></div>
                                            </div>
                                        </div>

                                        <div className="clear"></div>


                                        <div className="clear"></div>
                                    </fieldset>

                                    <div className="dna-source-errors" role="alert">
                                        <div className="woocommerce-error">Some card details are incorrect. Please double-check the card number, expiry date, and CVV, then try again.</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="form-row">
                        <button type="submit" className="woocommerce-Button woocommerce-Button--alt button alt" id="place_order" value="Add payment method">Add payment method</button>
                    </div>
                </div>
            </form>
        </div>
    );
}