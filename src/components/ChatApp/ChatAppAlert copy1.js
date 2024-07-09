import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import girlchat from './images/ayesha.png';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const ChatAppAlert = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [email, setEmail] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchSessionId = async () => {
      const storedSessionId = localStorage.getItem('session_id');
      if (storedSessionId) {
        setSessionId(storedSessionId);
        return;
      }
      try {
        const result = await MySwal.fire({
          title: 'Welcome',
          html: '<input type="email" id="email" class="swal2-input" placeholder="Enter your email" required>',
          confirmButtonText: 'Continue',
          allowOutsideClick: false,
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
          const response = await axios.post('http://chat.indenta.ae:8000/init-session/', {
          // const response = await axios.post('http://chat.indenta.ai:8000/init-session/', {
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

        const response = await axios.post('http://chat.indenta.ae:8000/message/', {
        // const response = await axios.post('http://chat.indenta.ai:8000/message/', {
          message: inputValue,
          // url: 'http://chat.indenta.ai:8000/message/',
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

  // Function to scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <div class="softButtons" style="display: flex;justify-content: space-around;flex-wrap: wrap;">
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
  }, []);

  // Effect to handle click events for offer details
  // useEffect(() => {
  //   const handleOkClick = (message, imageUrl, link) => {
  //     const linkHtml = link ? `<a href="${link}" target="_blank">Click here for more details</a>` : '';
  //     const handleImage = imageUrl ? `<img src="${imageUrl}" alt="Offer Image" style="width: 100%; max-height : 450px; height: 100%; max-width: 450px;"/>` : ''
  //     MySwal.fire({
  //       html: `
  //         <div>
  //           ${handleImage}
  //           <p>${message}</p>
  //           ${linkHtml}
  //         </div>
  //       `,
  //       confirmButtonText: 'OK'
  //     });
  //   };

  //   const offers = [
  //     { id: 'cbdOne', message: 'Details about CBD One', imageUrl: '', link: 'https://www.cbd.ae/cbdnowcm/Products-v3/cbd-one-credit-card' },
  //     { id: 'platinum', message: 'Details about CBD Smiles Visa Platinum', imageUrl: '', link: 'https://www.cbd.ae/cbdnowcm/Products-v3/Visa-Platinum' },
  //     { id: 'signature', message: 'Details about CBD Smiles Visa Signature', imageUrl: '/assets/img/pics/cp.JPG' },
  //     { id: 'reward', message: 'Details about CBD Yes Rewards Credit Card', imageUrl: '/assets/img/pics/cp2.jpg' },
  //     { id: 'superSaver', message: 'Details about Super Saver Visa Signature', imageUrl: '', link: 'https://www.cbd.ae/cbdnowcm/Products-v3/super-saver-credit-card' },
  //     { id: 'visaPlatinum', message: 'Details about Visa Platinum', imageUrl: '/assets/img/pics/cp3.jpg' },
  //     { id: 'infinite', message: 'Details about Visa Infinite', imageUrl: '/assets/img/pics/S2.jpg' },
  //   ];

  //   offers.forEach(offer => {
  //     const element = document.getElementById(offer.id);
  //     if (element) {
  //       element.addEventListener('click', () => handleOkClick(offer.message, offer.imageUrl));
  //     }
  //   });

  //   // Cleanup function to remove event listeners
  //   return () => {
  //     offers.forEach(offer => {
  //       const element = document.getElementById(offer.id);
  //       if (element) {
  //         element.removeEventListener('click', () => handleOkClick(offer.message, offer.imageUrl));
  //       }
  //     });
  //   };
  // }, [messages]); 

  useEffect(() => {
    const handleOkClick = (message, imageUrl, link) => {
      const linkHtml = link ? `<a href="${link}" target="_blank" style="color : black;color: black; font-size: 15px; text-decoration: underline;">Click here for more details</a>` : '';
      const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="Offer Image" style="width: 100%; max-height: 450px; height: auto; max-width: 450px;" />` : '';
      MySwal.fire({
        html: `
          <div>
            ${imageHtml}
            <p>${message}</p>
            ${linkHtml}
          </div>
        `,
        confirmButtonText: 'OK'
      });
    };
  
    const offers = [
      { id: 'cbdOne', message: 'Details about CBD One', imageUrl: '', link: 'https://www.cbd.ae/cbdnowcm/Products-v3/cbd-one-credit-card' },
      { id: 'platinum', message: 'Details about CBD Smiles Visa Platinum', imageUrl: '', link: 'https://www.cbd.ae/cbdnowcm/Products-v3/Visa-Platinum' },
      { id: 'signature', message: 'Details about CBD Smiles Visa Signature', imageUrl: '/assets/img/pics/cp.JPG' },
      { id: 'reward', message: 'Details about CBD Yes Rewards Credit Card', imageUrl: '/assets/img/pics/cp2.jpg' },
      { id: 'superSaver', message: 'Details about Super Saver Visa Signature', imageUrl: '', link: 'https://www.cbd.ae/cbdnowcm/Products-v3/super-saver-credit-card' },
      { id: 'visaPlatinum', message: 'Details about Visa Platinum', imageUrl: '/assets/img/pics/cp3.jpg' },
      { id: 'infinite', message: 'Details about Visa Infinite', imageUrl: '/assets/img/pics/S2.jpg' },
    ];
  
    offers.forEach(offer => {
      const element = document.getElementById(offer.id);
      if (element) {
        element.addEventListener('click', () => handleOkClick(offer.message, offer.imageUrl, offer.link));
      }
    });
  
    // Cleanup function to remove event listeners
    return () => {
      offers.forEach(offer => {
        const element = document.getElementById(offer.id);
        if (element) {
          element.removeEventListener('click', () => handleOkClick(offer.message, offer.imageUrl, offer.link));
        }
      });
    };
  }, [messages]);
  
  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  // Rendering JSX
  return (
    <>
      <div style={{ height: '100vh' }} className="d-flex bg-light">
        <div className="d-flex flex-column flex-grow-1">
          <div className="p-3 bg-white border-bottom d-flex align-items-center" style={{ position: 'fixed', width: '100%' }}>
            <Image src={girlchat} alt="Bot" width={60} height={60} style={{ borderRadius: '50%' }} />
            <div className="ms-3">
              <div className="fw-semibold">Ayesha</div>
              <div className="text-muted small" style={{ display: 'inline-block' }}>
                <span style={{ height: '15px', width: '15px', backgroundColor: 'green', borderRadius: '50%', display: 'inline-block', marginTop: '2.6px', marginRight: '2px' }}></span>
                <span>Active Now</span>
              </div>
            </div>
          </div>
          <div className="flex-grow-1 p-4 overflow-auto" style={{ marginTop: '5rem' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : ''} mb-3`}
                style={{
                  marginLeft: message.sender === 'user' ? 'auto' : '0',
                  width: '50%',
                }}
              >
                {message.sender === 'bot' ? (
                  <div
                    className={`p-2 rounded bg-light border`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                ) : (
                  <div
                    className={`p-2 rounded bg-primary text-white`}
                  >
                    {message.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            {sendingMessage && (
              <div className="text-muted mt-2" style={{ marginRight: 'auto' }}>
                typing
              </div>
            )}
          </div>
          <div className="p-4 bg-white border-top d-flex align-items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="form-control flex-grow-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sendingMessage}
            />
            <button className="btn btn-primary ms-2" onClick={handleSend} disabled={sendingMessage}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAppAlert;
