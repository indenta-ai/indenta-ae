import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SendIcon from '@mui/icons-material/Send';
import girlchat from './images/ayesha.png';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Modal from 'react-modal';

const MySwal = withReactContent(Swal);
Modal.setAppElement('#__next');

const ChatAppAlert = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [email, setEmail] = useState('');
  const [welcomeMessageShown, setWelcomeMessageShown] = useState(false);
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', imageUrl: '', link: '' });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSessionId = async () => {
      const storedSessionId = localStorage.getItem('session_id');
      if (storedSessionId) {
        setSessionId(storedSessionId);
        return;
      }
      try {
        const result = await MySwal.fire({
          title: 'Welcome To CBD Bank',
          html: '<input type="email" id="email" class="swal2-input" placeholder="Enter your email" required>',
          confirmButtonText: 'Continue',
          allowOutsideClick: false,
          allowEscapeKey: false,
          customClass: {
            container: 'custom-swal', // Custom class for the container
            title: 'custom-title', // Optional: Custom class for title
            input: 'custom-input', // Optional: Custom class for input
            confirmButton: 'custom-confirm', // Optional: Custom class for confirm button
          },
          preConfirm: () => {
            const email = Swal.getPopup().querySelector('#email').value;
            if (!email || !email.includes('@') || !email.includes('.')) {
              Swal.showValidationMessage('Please enter a valid email address');
              return false;
            }
            setEmail(email);
            return email;
          }
        });

        if (result.isConfirmed) {
          const email = result.value;
          const response = await axios.post('https://chat.indenta.ai/init-session/', {
            email
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });

          if (response.status === 200) {
            const data = response.data;
            const sessionId = data.session_id;
            setSessionId(sessionId);
            localStorage.setItem('session_id', sessionId);
          } else {
            throw new Error('Failed to fetch session ID');
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error.message);
        Swal.fire('Error', 'Failed to initialize session. Please try again later.', 'error');
      }
    };

    // Call fetchSessionId function when component mounts
    fetchSessionId();
  }, []);

  // Function to handle sending messages
  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { sender: 'user', text: inputValue }];
      setMessages(newMessages);
      setInputValue('');
      setSendingMessage(true);

      try {
        const sessionId = localStorage.getItem('session_id'); // Retrieve session ID from localStorage
        console.log('bot session', sessionId);

        const response = await axios.post('https://chat.indenta.ai/message/', {
          message: inputValue,
          session_id: sessionId,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 200) {
          const data = response.data;
          let botMessage = data.response;
          botMessage = botMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
          setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Something went wrong, try again later!' }]);
      } finally {
        setSendingMessage(false);
      }
    }
  };

  const scrollToBottom = () => {
    if (messages.length > 1 || (messages.length === 1 && welcomeMessageShown)) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to initialize welcome message when component mounts
  useEffect(() => {
    const welcomeMessage = `
      Hello! I'm Ayesha,
      <br /><br />As a valued customer, we are eager to inform you about a special credit offer exclusively for you. We are proposing an opportunity to enhance your purchasing power and enjoy a more flexible shopping experience.<br />Here are the details of your special credit offer:<br /><br /><b style="font-size : 16px ">•</b> Credit Limit: Up to 4 Multiple of your salary
      <br /><b style="font-size : 16px ">•</b> NO Interest % on BT and EPP<br /><b style="font-size : 16px ">•</b> Airport lounge access for you through Lounge Key<br /><b style="font-size : 16px ">•</b> Access to a digital concierge channel in addition to telephone and email service<br /><b style="font-size : 16px ">•</b> 50% off on movie tickets at Novo, Reel & VOX cinemas<br /><b style="font-size : 16px ">•</b> Complimentary valet parking service across 30 locations<br /><b style="font-size : 16px ">•</b> Spend AED 500 for an entry into the lucky draw of AED 100,000 every week!<br /><b style="font-size : 16px ">•</b> No annual fees on Credit cards<br /><br />
      <p>We are offering the following credit cards:</p>
      <div class="softButtons" style="display: flex;justify-content: space-between;flex-wrap: wrap;margin-left : 1rem;;margin-top : 1rem">
        <ul style="list-style-type: disclosure-closed;font-weight : 550">
          <li id="cbdOne">CBD One</li>
          <li id="platinum">CBD Smiles Visa Platinum</li>
          <li id="signature">CBD Smiles Visa Signature</li>
          <li id="reward">CBD Yes Rewards Credit Card</li>
        </ul>
        <ul style="list-style-type: disclosure-closed;font-weight : 550">
          <li id="superSaver">Super Saver Visa Signature</li>
          <li id="visaPlatinum">Visa Platinum</li>
          <li id="infinite">Visa Infinite</li>
        </ul>
      </div>
    `;
    setMessages([{ sender: 'bot', text: welcomeMessage }]);
    setWelcomeMessageShown(true);
  }, []);

  useEffect(() => {
    const offers = [
      { id: 'cbdOne', message: 'Details about CBD One', imageUrl: '/assets/img/pics/pdf0.jpg' },
      { id: 'platinum', message: 'Details about CBD Smiles Visa Platinum', imageUrl: '/assets/img/pics/pdf2.jpg' },
      { id: 'signature', message: 'Details about CBD Smiles Visa Signature', imageUrl: '/assets/img/pics/cp.JPG' },
      { id: 'reward', message: 'Details about CBD Yes Rewards Credit Card', imageUrl: '/assets/img/pics/cp2.jpg' },
      { id: 'superSaver', message: 'Details about Super Saver Visa Signature', imageUrl: '/assets/img/pics/pdf3.jpg' },
      { id: 'visaPlatinum', message: 'Details about Visa Platinum', imageUrl: '/assets/img/pics/cp3.jpg' },
      { id: 'infinite', message: 'Details about Visa Infinite', imageUrl: '/assets/img/pics/S2.jpg' },
    ];

    const handleOfferClick = (offer) => {
      setModalContent({ message: offer.message, imageUrl: offer.imageUrl });
      setIsModalOpen(true);
    };

    offers.forEach(offer => {
      const element = document.getElementById(offer.id);
      if (element) {
        element.onclick = () => handleOfferClick(offer);
      }
    });

    return () => {
      offers.forEach(offer => {
        const element = document.getElementById(offer.id);
        if (element) {
          element.onclick = null; // Clean up
        }
      });
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="chat-app">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            ></div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={handleSend} disabled={sendingMessage}>
            {sendingMessage ? 'Sending...' : <SendIcon />}
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Offer Details"
        className="custom-modal"
      >
        <h2>Offer Details</h2>
        <p>{modalContent.message}</p>
        {modalContent.imageUrl && (
          <Image
            src={modalContent.imageUrl}
            alt="Offer"
            layout="responsive"
            width={450}
            height={450}
          />
        )}
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
      <style jsx>{`
        .chat-app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
        }
        .chat-message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 5px;
        }
        .user-message {
          background-color: #d1ffd6;
          align-self: flex-end;
        }
        .bot-message {
          background-color: #f1f1f1;
          align-self: flex-start;
        }
        .chat-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ccc;
        }
        .chat-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }
        .chat-input button {
          padding: 10px 15px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        .chat-input button:disabled {
          background-color: #ccc;
        }
        .custom-modal {
          background: white;
          padding: 20px;
          max-width: 500px;
          margin: auto;
          border-radius: 8px;
          overflow: auto;
        }
      `}</style>
    </>
  );
};

export default ChatAppAlert;