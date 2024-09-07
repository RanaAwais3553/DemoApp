import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "axios";

// ...
const Webview = () => {

    // Function to handle messages from WebView
    const handleMessage = (event) => {
        const { data } = event.nativeEvent;
        console.log("Token:", data);

        // Remove extra quotes from the token
        const cleanedToken = data.replace(/^"|"$/g, '');

        // You can do whatever you want with the data, like updating state, etc.
            const formData =  {
                    token: cleanedToken,
                    amount:99.99,
                    userId:'6609a81a721c38c961e30694',                    
                }

                console.log("Form:", formData);

             // Check if data is a payment token
             if (data) {
                // Send the payment token using Axios
                axios.post('http://54.253.2.145/yoomoney/create-payload-with-token',formData )
                .then(response => {
                    console.log("Payment token sent successfully by Bilal:",JSON.stringify(response.data, null, 2));
                    // You can handle the response here if needed
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code that falls out of the range of 2xx
                        console.error("Error sending payment token:", error.response.data);
                        console.error("Response status:", error.response.status);
                        console.error("Response headers:", error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error("Error sending payment token:", error.request);
                    } else {
                        // Something happened in setting up the request that triggered an error
                        console.error("Error sending payment token:", error.message);
                    }
                });
            } else {
                console.log("Received data is not a payment token:", data);
                // Handle other types of data received from WebView if needed
            }
    };

    // HTML content with minimal form
    // const htmlContent = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Payment Form</title>
    //     </head>
    //     <body>
    //         <!-- Form for entering payment details -->
    //         <input type="text" id="cardNumber" placeholder="Card Number">
    //         <input type="text" id="cvc" placeholder="CVC">
    //         <button onclick="submitForm()">Submit</button>
            
    //         <script>
    //             // Function to submit form and pass data back to React Native
    //             function submitForm() {
    //                 const cardNumber = document.getElementById('cardNumber').value;
    //                 const cvc = document.getElementById('cvc').value;
    //                 const paymentData = {
    //                     cardNumber: cardNumber,
    //                     cvc: cvc
    //                 };
    //                 // Pass payment data back to React Native
    //                 window.ReactNativeWebView.postMessage(JSON.stringify(paymentData));
    //             }
    //         </script>
    //     </body>
    //     </html>
    // `;


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
        
            .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5); 
              z-index: 999;
            }
        
           .payment-form {
              background-color: #ffffff;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              padding: 40px 20px 20px 20px;
              border-radius: 20px 20px 0 0;
              z-index: 1000;
            }
        
            .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 20px;
                cursor: pointer;
                border: none;
                background-color: transparent;
            }
        
            .row {
                display: flex;
                gap: 10px; 
            }
        
            .col {
                padding: 10px;
                text-align: center;
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
            
        </style>
        </head>
        <body>
        
            <div class="overlay"></div>
            <div class="payment-form">
            <button class="close-btn" onclick="closePaymentForm()">X</button>
            <div class="row">
                <div class="col">
                    <input type="text" class="number" placeholder="1111-2222-3333-4444" maxlength="19">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="cvc" placeholder="CVC" maxlength="3">
                </div>
                <div class="col">
                    <input type="text" class="expiry" placeholder="MM/YY" maxlength="5">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="sub-btn" onclick="tokenizePayment()">Pay</button>
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
                const expiry = document.querySelector('.expiry').value.split('/');
                const month = expiry[0];
                const year = expiry[1];
        
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
                        document.querySelector('.expiry').value = '';
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
        
        
            document.addEventListener('DOMContentLoaded', function() {
                const expiryInput = document.querySelector('.expiry');
                const numberInput = document.querySelector('.number');
        
                numberInput.addEventListener('input', function() {
                    let trimmedValue = this.value.replace(/\s+/g, ''); // Remove existing spaces
                    trimmedValue = trimmedValue.replace(/\D/g, ''); // Remove non-digit characters
        
                    // Add space after every 4 digits
                    trimmedValue = trimmedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
                    this.value = trimmedValue;
                });
        
                expiryInput.addEventListener('input', function() {
                    let trimmedValue = this.value.replace(/\D/g, ''); // Remove non-digit characters
                    if (trimmedValue.length > 2) {
                    // Insert '/' after the second character
                    trimmedValue = trimmedValue.slice(0, 2) + '/' + trimmedValue.slice(2);
                    }
                    this.value = trimmedValue;
                });
            });
            
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

export default Webview;
