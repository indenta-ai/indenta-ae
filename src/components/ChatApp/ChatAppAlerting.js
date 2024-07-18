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
  const [welcomeMessageShown, setWelcomeMessageShown] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
          },
          
        });

        if (result.isConfirmed) {
          const email = result.value;
          const response = await axios.post('https://chat.indenta.ai/init-session/', {
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

        const response = await axios.post('https://chat.indenta.ai/message/', {
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
          console.log('data--->', data)
          let botMessage = data.response;
          // botMessage = botMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          // botMessage = botMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          // botMessage = botMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
          botMessage = botMessage
            // .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // .replace(/\#\#(.#?)\#\#/g, '<strong>$1</strong>')
            // .replace(/\#\#\#(.#?)\#\#\#/g, '<strong>$1</strong>')
            // .replace(/\n/g, '<br />')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text with **
            .replace(/##([^#]+)##/g, '<strong>$1</strong>')   // Bold text with ##
            .replace(/###([^#]+)###/g, '<strong>$1</strong><br />')
            .replace(/#([^#]+)#/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
          // .replace(/\b([IVXLCDM]+)\b/g, '<strong>$1</strong>');
          console.log('botMessage--->', botMessage)
          setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
          console.log('Message--->', messages)
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Something went wrong, try again later!' }]);
      } finally {
        setSendingMessage(false);
        inputRef.current.focus();
      }
    }
  };

  // Function to scroll to the bottom of messages
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const scrollToBottom = () => {
    if (!welcomeMessageShown || (welcomeMessageShown && messages.length > 1)) {
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

  // useEffect(() => {
  //   const handleOkClick = (message, imageUrl, link) => {
  //     const linkHtml = link ? `<a href="${link}" target="_blank" style="color : black;color: black; font-size: 15px; text-decoration: underline;">Click here for more details</a>` : '';
  //     const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="Offer Image" style="width: 100%; max-height: 450px; height: auto; max-width: 450px;" id="popupImage" />` : '';
  //     const fullScreenIconHtml = !isMobile ? `<p style="margin-bottom: 1rem; float: right; cursor: pointer;" onclick="showFullScreenAlert()">fullscreen</p>` : '';
  //     MySwal.fire({
  //       html: `
  //         <div>
  //         ${fullScreenIconHtml}
  //           ${imageHtml}
  //           <p>${message}</p>
  //           ${linkHtml}
  //         </div>
  //       `,
  //       confirmButtonText: 'OK'
  //     });
  //   };

  //   window.showFullScreenAlert = () => {
  //     if (!isMobile) {
  //       const image = document.getElementById('popupImage');
  //       if (image) {
  //         image.style.width = '30rem';
  //         image.style.height = '31rem';
  //         image.style.maxHeight = '504px';
  //         image.style.maxWidth = '504px';
  //       }
  //     }
  //   };

  //   const offers = [
  //     { id: 'cbdOne', message: 'Details about CBD One', imageUrl: '/assets/img/pics/pdf3.jpg' },
  //     { id: 'platinum', message: 'Details about CBD Smiles Visa Platinum', imageUrl: '/assets/img/pics/pdf2.jpg' },
  //     { id: 'signature', message: 'Details about CBD Smiles Visa Signature', imageUrl: '/assets/img/pics/cp.JPG' },
  //     { id: 'reward', message: 'Details about CBD Yes Rewards Credit Card', imageUrl: '/assets/img/pics/cp2.jpg' },
  //     { id: 'superSaver', message: 'Details about Super Saver Visa Signature', imageUrl: '/assets/img/pics/pdf0.jpg' },
  //     { id: 'visaPlatinum', message: 'Details about Visa Platinum', imageUrl: '/assets/img/pics/cp3.jpg' },
  //     { id: 'infinite', message: 'Details about Visa Infinite', imageUrl: '/assets/img/pics/S2.jpg' },
  //   ];

  //   offers.forEach(offer => {
  //     const element = document.getElementById(offer.id);
  //     if (element) {
  //       element.addEventListener('click', () => handleOkClick(offer.message, offer.imageUrl, offer.link));
  //     }
  //   });

  //   // Cleanup function to remove event listeners
  //   return () => {
  //     offers.forEach(offer => {
  //       const element = document.getElementById(offer.id);
  //       if (element) {
  //         element.removeEventListener('click', () => handleOkClick(offer.message, offer.imageUrl, offer.link));
  //       }
  //     });
  //   };
  // }, [messages , isMobile]);

  // Function to handle Enter key press
  useEffect(() => {
    const handleOkClick = (message, imageUrl, link) => {
      const linkHtml = link ? `<a href="${link}" target="_blank" style="color : black;color: black; font-size: 15px; text-decoration: underline;">Click here for more details</a>` : '';
      // const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="Offer Image" style="width: 100%; max-height: 450px; height: auto; max-width: 450px;" id="popupImage" />` : '';
      // const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="Offer Image" style="${isMobile ? 'width: 100%; max-height: 504px; height: 31rem; max-width: 504px;' : 'width: 30rem; max-height: 450px; height: auto; max-width: 450px;'}" id="popupImage" />` : '';
      const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="Offer Image" style="${isMobile ? 'width: 30rem; max-height: 450px; height: auto; max-width: 320px;' : 'width: 30rem; max-height: 520px; height: 34rem; max-width: 504px;'}" id="popupImage" />` : '';
      MySwal.fire({
        html: `
          <div>
            ${imageHtml}
            <p>${message}</p>
            ${linkHtml}
          </div>
        `,
        // confirmButtonText: 'OK'
      });
    };

    const offers = [
      { id: 'cbdOne', message: 'Details about CBD One', imageUrl: '/assets/img/pics/pdf3.jpg' },
      { id: 'platinum', message: 'Details about CBD Smiles Visa Platinum', imageUrl: '/assets/img/pics/pdf2.jpg' },
      { id: 'signature', message: 'Details about CBD Smiles Visa Signature', imageUrl: '/assets/img/pics/cp.JPG' },
      { id: 'reward', message: 'Details about CBD Yes Rewards Credit Card', imageUrl: '/assets/img/pics/cp2.jpg' },
      { id: 'superSaver', message: 'Details about Super Saver Visa Signature', imageUrl: '/assets/img/pics/pdf0.jpg' },
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
  }, [messages , isMobile]);
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  // Rendering JSX
  return (
    <>
      <div style={{ height: '85vh' }} className="d-flex bg-light">
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
                  width: isMobile ? '100%' : '50%',
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
              // <div className="text-muted mt-2" style={{ marginRight: 'auto' }}>
              //   typing
              // </div>
              <div className="message bot-message dancing-dots" style={{ fontSize: '3rem', marginRight: 'auto' }}>
                &nbsp;
              </div>
            )}
          </div>
          <div className="p-4 bg-white border-top d-flex align-items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !sendingMessage && handleSend()}
              placeholder="Type a message..."
              className="form-control flex-grow-1"
            // disabled={sendingMessage}
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
