import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Aptobot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m Aptobot, your personal assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const siteLinks = {
    'Main Pages': [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Explore', path: '/explore' },
    ],
    'User Account': [
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' },
      { name: 'Profile', path: '/profile' },
      { name: 'Forgot Password', path: '/forgetpass' },
    ],
    'Rental': [
      { name: 'Categories', path: '/categories' },
      { name: 'Listings', path: '/listings' },
      { name: 'Add Item', path: '/add-item' },
      { name: 'Cart', path: '/cart' },
      { name: 'Checkout', path: '/checkout' },
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }]);

    // Generate bot response
    const response = generateResponse(inputMessage.toLowerCase());
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
    }, 500);

    setInputMessage('');
  };

  const generateResponse = (message) => {
    // Simple response logic based on keywords
    if (message.includes('rent') || message.includes('item')) {
      return 'You can browse available items in our Categories section or check out current Listings. Would you like to see what\'s available?';
    }
    if (message.includes('account') || message.includes('login') || message.includes('sign up')) {
      return 'You can manage your account through our User Account section. Would you like to login or create a new account?';
    }
    if (message.includes('help') || message.includes('contact')) {
      return 'You can reach out to us through our Contact page or explore our About section to learn more about our services.';
    }
    if (message.includes('sell') || message.includes('list')) {
      return 'You can list your items for rent through our Add Item page. Would you like to get started?';
    }
    if (message.includes('cart') || message.includes('checkout')) {
      return 'You can view your cart and proceed to checkout through our Cart and Checkout pages.';
    }
    return 'I\'m here to help! You can ask me about renting items, managing your account, or any other questions about our services.';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-emerald-200">
          {/* Chat Header */}
          <div className="bg-emerald-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Aptobot</h3>
                <p className="text-sm text-emerald-100">Online</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.type === 'bot' && (
                    <div className="mt-2 space-y-1">
                      {Object.entries(siteLinks).map(([category, links]) => (
                        <div key={category}>
                          <p className="text-xs font-semibold text-emerald-600">{category}:</p>
                          <div className="flex flex-wrap gap-1">
                            {links.map((link) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                className="text-xs text-emerald-500 hover:text-emerald-600 underline"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-500 text-white rounded-full p-2 hover:bg-emerald-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Aptobot; 