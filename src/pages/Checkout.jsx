import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart, completePurchase } = useCart();
  const { language } = useLanguage();
  const t = translations[language].cart;
  const navigate = useNavigate();
  
  // State management
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  
  // Format price to INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Format price to APT tokens (mock conversion: 1 INR = 0.05 APT for demo)
  const formatAPT = (price) => {
    const aptValue = price * 0.05;
    return aptValue.toFixed(2);
  };
  
  // Handle wallet connection
  const connectWallet = () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      // Generate a random Aptos address
      const randomAddress = '0x' + Array.from({length: 24}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      setWalletAddress(randomAddress);
      setCurrentStep(2);
    }, 1500);
  };
  
  // Handle payment processing
  const processPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      completePurchase();
      clearCart();
      
      // Redirect to home after successful payment
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  // Truncate wallet address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-900">
        <Navbar />
        <div className="pt-16 text-white">
          <div className="max-w-lg mx-auto px-4 py-12 text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 shadow-xl border border-white/10">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{t.paymentSuccessful}</h1>
              <div className="text-emerald-400 text-lg font-medium mb-6">
                Transaction ID: {walletAddress.substring(0, 10)}...
              </div>
              <p className="text-gray-300 mb-8">{t.thankYou}</p>
              <p className="text-gray-400 mb-8">{t.redirecting}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-900">
      <Navbar />
      <div className="pt-16 text-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-center">Secure Checkout</h1>
          <p className="text-gray-400 text-center mb-10">Complete your rental transaction securely with Aptos</p>
          
          {/* Step indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-emerald-500' : 'bg-gray-700'} text-white`}>
                1
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-700'} text-white`}>
                2
              </div>
              <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-gray-700'} text-white`}>
                3
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            {/* Step 1: Connect Wallet */}
            {currentStep === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-8">Connect Your Wallet</h2>
                
                <div className="max-w-sm mx-auto mb-10">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-6 rounded-xl mb-6">
                    <svg className="h-16 w-16 mx-auto mb-4" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M37.333 4.667H4.667c-2.574 0-4.667 2.093-4.667 4.667v23.333c0 2.574 2.093 4.667 4.667 4.667h32.666c2.574 0 4.667-2.093 4.667-4.667V9.334c0-2.574-2.093-4.667-4.667-4.667z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M37.333 16.334H4.667M14 30.334h-4.667" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-300 mb-4">Connect your Petra wallet to continue with the payment process</p>
                  </div>
                  
                  <button 
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isConnecting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Connect Petra Wallet
                      </>
                    )}
                  </button>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold mb-4">What is Petra Wallet?</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Petra is a wallet for the Aptos blockchain, designed to provide secure
                    transactions and easy access to decentralized applications.
                  </p>
                  <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm">
                    Learn more about Petra Wallet →
                  </a>
                </div>
              </div>
            )}
            
            {/* Step 2: Review Transaction */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Review Transaction</h2>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Connected Wallet</span>
                    <div className="flex items-center">
                      <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
                      <span className="font-mono">{truncateAddress(walletAddress)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 my-4"></div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Network</span>
                      <span>Aptos Mainnet</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Estimated Gas Fee</span>
                      <span>0.001 APT</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Order Summary</h3>
                    <button 
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-emerald-400 hover:text-emerald-300 text-sm underline"
                    >
                      {showDetails ? 'Hide details' : 'Show details'}
                    </button>
                  </div>
                  
                  {showDetails && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-700 last:border-0">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p>{formatPrice(item.price * item.quantity)}</p>
                            <p className="text-sm text-emerald-400">{formatAPT(item.price * item.quantity)} APT</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-6 mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg">Total Amount</span>
                    <div className="text-right">
                      <div className="text-xl font-bold">{formatPrice(getCartTotal())}</div>
                      <div className="text-emerald-400 font-medium">{formatAPT(getCartTotal())} APT</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 flex-1"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg flex-1"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirm Payment */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Confirm Payment</h2>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Ready to complete your transaction</h3>
                  <p className="text-gray-400 mb-4">
                    Please confirm the payment to complete your transaction. You'll be charged
                    <span className="text-white font-medium ml-1">{formatAPT(getCartTotal())} APT</span>
                  </p>
                  
                  <div className="border border-gray-700 rounded-lg py-2 px-4 font-mono bg-gray-800/50 mb-6 text-sm overflow-hidden text-ellipsis">
                    {walletAddress}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 flex-1"
                  >
                    Back
                  </button>
                  <button 
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : "Confirm Payment"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Security badges footer */}
      <div className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <div className="flex flex-wrap justify-center gap-6 items-center mb-6">
          <div className="flex items-center text-gray-400">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm">Secure Transaction</span>
          </div>
          <div className="flex items-center text-gray-400">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm">Privacy Protected</span>
          </div>
          <div className="flex items-center text-gray-400">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Verified by Aptos</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          All transactions are processed securely on the Aptos blockchain.
          Your payment details are never stored on our servers.
        </p>
      </div>
    </div>
  );
};

export default Checkout; 