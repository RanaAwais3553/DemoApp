import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const YooMoneyCheckoutForm = ({ onDataReceived }) => {
    // Function to handle messages from WebView
    const handleMessage = (event) => {
        const { data } = event.nativeEvent;
        // console.log("Token:", data);
        const cleanData = data.replace(/^"|"$/g, '');         // Remove extra quotes from the token
        onDataReceived(cleanData);                           // Pass the data back to the parent component
    };

        // HTML content with separated JavaScript logic
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Form</title>
        <script src="https://static.yoomoney.ru/checkout-js/v1/checkout.js"></script>
        <style>
            *{
                box-sizing: border-box;
            }
        
            body{
                margin: 0;
            }
        
            .container {
                display: flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
        
            .payment-form {
                background-color: #ffffff;
                width: 85%;
                height: auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                z-index:1;
            }
        
            .close-btn {
                position: absolute;
                top: 50px;
                left: 10px;
                font-size: 20px;
                cursor: pointer;
                border: none;
                background-color: transparent;
            }
        
            .row {
                display: flex;
                gap: 10px; 
                align-items: center;
            }
        
            .col {
                flex: 1 1 auto;
            }
        
            .col input,
            .col button {
                width: 100%; 
                padding: 10px;
                border-radius: 5px;
            }
        
            .col input[type="text"] {
                border: 1px solid gray;
            }
            
            .col .sub-btn {
                border: none;
            }

            .text-center {
                text-align: center;
            }
  
            .mb-20 {
                margin-bottom: 20px;
            }

            .mb-10 {
                margin-bottom: 10px;
            }
            .d-block {
                display:block;
            }

            .slash {
                font-size: 25px;
                font-weight: 300;
            }
            
        </style>
        </head>
        <body>
        
            <div class="container">
        
                <button class="close-btn" onclick="closePaymentForm()">
                    <svg width="25" height="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="244 400 100 256 244 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px" x1="120" x2="412" y1="256" y2="256"/></svg>
                </button>

                <svg width="100" height="100" version="1.0" id="katman_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	            viewBox="0 0 117 86" style="enable-background:new 0 0 117 86;" xml:space="preserve">
                    <style type="text/css">
	                    .st0{fill:#8B3FFD;}
                    </style>
                    <path class="st0" d="M66.3,23c-11.1,0-20,9-20,20c0,11.1,9,20,20,20c11,0,20-9,20-20S77.3,23,66.3,23z M66.3,50.3
	                c-4.1,0-7.5-3.4-7.5-7.5c0-4.1,3.4-7.5,7.5-7.5c4.1,0,7.5,3.4,7.5,7.5C73.7,47.1,70.4,50.3,66.3,50.3L66.3,50.3z M46.2,28.7v29.1
	                h-7.1L30,28.7H46.2z"/>
                </svg>

                <div class="payment-form">
                    <div class="row mb-20">
                        <div class="col">
                            <label class='d-block mb-10'>Card Number</label>
                            <input type="text" class="number" placeholder="1111 2222 3333 4444" maxlength="19">
                        </div>
                    </div>
                    <div class="row mb-20">
                        <div class="col">
                            <label class='d-block mb-10'>Code</label>
                            <input type="text" class="cvc" placeholder="CVC" maxlength="3">
                        </div>
                        <div class="col">
                            <label class='d-block mb-10'>Expiration Date</label>
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="month" placeholder="MM" maxlength="2">
                                </div>
                                <div class="col">
                                    <span class='slash'>/</span>
                                </div>
                                <div class="col">
                                    <input type="text" class="year" placeholder="YY" maxlength="2">
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button class="sub-btn" onclick="tokenizePayment()">Pay</button>
                        </div>
                    </div>
                </div>
        
            </div>
        
            <script>
            // YooMoney Checkout.js initialization
            const checkout = new window.YooMoneyCheckout('360520', {
                language: 'en'
            });
        
            // Function to tokenize payment data
            function tokenizePayment() {
                const number = document.querySelector('.number').value;
                const cvc = document.querySelector('.cvc').value;
                const month = document.querySelector('.month').value;
                const year = document.querySelector('.year').value;
        
                checkout.tokenize({
                    number: number,
                    cvc: cvc,
                    month: month,
                    year: year
                }).then(res => {
                    if (res.status === 'success') {
                        const paymentToken = res.data.response.paymentToken;
                        console.log(paymentToken);
                        // Clear all fields after successful payment
                        document.querySelector('.number').value = '';
                        document.querySelector('.cvc').value = '';
                        document.querySelector('.month').value = '';
                        document.querySelector('.year').value = '';
                        // Pass payment token back to React Native
                        window.ReactNativeWebView.postMessage(JSON.stringify(paymentToken));
                    }
                    if (res.status === 'error') {
                        // validation_error
                        const error  = response.error;
                        console.log(error);
                        window.ReactNativeWebView.postMessage(JSON.stringify(error));
                    }
                });
            }
        
            function closePaymentForm() {
                // Clear all fields after successful payment
                document.querySelector('.number').value = '';
                document.querySelector('.cvc').value = '';
                document.querySelector('.month').value = '';
                document.querySelector('.year').value = '';
                // Pass payment token back to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify('close'));
            }
            
            </script>
        
        </body>
        </html>
    `;

    return (
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={handleMessage} // Listen for messages from WebView
        />
    );
}

export default YooMoneyCheckoutForm;
  
