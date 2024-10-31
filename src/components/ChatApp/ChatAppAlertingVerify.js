import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import girlchat from './images/ayesha0.png';
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
  const [phoneNumber, setPhoneNumber] = useState('+971 ');
  const [welcomeMessageShown, setWelcomeMessageShown] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const lastMessageSenderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

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
          title: 'Welcome To Indenta Solution',
          html: `
            <input type="email" id="email" class="swal2-input" placeholder="Enter your email" required>
            <input type="text" id="phNo" class="swal2-input" placeholder="Enter your Phone Number" min="9710000000" max="9719999999" maxLength="15" value=${phoneNumber} required>
          `,
          confirmButtonText: 'Continue',
          allowOutsideClick: false,
          allowEscapeKey: false,
          customClass: {
            container: 'custom-swal',
            title: 'custom-title',
            input: 'custom-input',
            confirmButton: 'custom-confirm',
          },
          // preConfirm: () => {
          //   const email = Swal.getPopup().querySelector('#email').value;
          //   const phNo = Swal.getPopup().querySelector('#phNo').value;
          //   if (!email || !email.includes('@') || !email.includes('.')) {
          //     Swal.showValidationMessage('Please enter a valid email address');
          //     return false;
          //   }
          //   else if (!phNo || phNo.value > 13){
          //     Swal.showValidationMessage('Please enter a valid Phone Number');
          //     return false;
          //   }
          //   setEmail(email);
          //   return email;
          // },
          preConfirm: () => {
            const email = Swal.getPopup().querySelector('#email').value;
            const phNo = Swal.getPopup().querySelector('#phNo').value;
          
            console.log('Email:', email); // Debugging
            console.log('Phone Number:', phNo); // Debugging
          
            if (!email || !email.includes('@') || !email.includes('.')) {
              Swal.showValidationMessage('Please enter a valid email address');
              return false;
            }
            
            // Basic validation for phone number format
            const phoneRegex = /^\+971 \d{7,15}$/;
            if (!phNo || !phoneRegex.test(phNo)) {
              Swal.showValidationMessage('Please enter a valid Phone Number in the format +971 XXXXXXXX');
              return false;
            }
          
            // Valid values
            setEmail(email);
            setPhoneNumber(phNo);
            return { email, phoneNumber: phNo };
          }
               
        });

        if (result.isConfirmed) {
          const email = result.value.email;
          const phoneNumber = result.value.phone;

          const loadingSwal = MySwal.fire({
            title: 'Initializing Session',
            text: 'Please wait while we set up your session...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
            showConfirmButton: false,
          });

          try {
            const response = await axios.post('https://chat.indenta.ai/init-session/', {
              email,
              phoneNumber,
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
          } catch (error) {
            // console.error('Error initializing session:', error.message);
            console.error('Error initializing session:', error.response?.data || error.message);
            Swal.fire('Error', 'Failed to initialize session. Please try again later.', 'error');
          } finally {
            MySwal.close();
          }
        }
      } catch (error) {
        console.error('Error displaying input modal:', error.message);
        Swal.fire('Error', 'An unexpected error occurred. Please try again.', 'error');
      }
    };

    fetchSessionId();
  }, []);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { sender: 'user', text: inputValue }];
      setMessages(newMessages);
      setInputValue('');
      setSendingMessage(true);
      lastMessageSenderRef.current = 'user';

      try {
        const sessionId = localStorage.getItem('session_id');
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
          console.log('data--->', data)
          let botMessage = data.response;
          botMessage = botMessage
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/##([^#]+)##/g, '<strong>$1</strong>')
            .replace(/###([^#]+)###/g, '<strong>$1</strong><br />')
            .replace(/#([^#]+)#/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
          console.log('botMessage--->', botMessage)
          setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
          lastMessageSenderRef.current = 'bot';
          console.log('Message--->', messages)
          if (data.session_complete) {
            localStorage.removeItem('session_id');

            setTimeout(async () => {
              await MySwal.fire({
                title: 'Session Complete',
                text: 'Your session has ended.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                  window.location.reload();
                }
              });
            }, 2000);
          }
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Something went wrong, try again later!' }]);
        lastMessageSenderRef.current = 'bot';
      } finally {
        setSendingMessage(false);
        inputRef.current.focus();
      }
    }
  };
  const scrollToBottom = () => {
    if (lastMessageSenderRef.current === 'user') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage = `
      Hello! I'm Ayesha,
      <br /><br />As a valued customer, we are eager to inform you about a special credit offer exclusively for you. We are proposing an opportunity to enhance your purchasing power and enjoy a more flexible shopping experience.<br />Here are the details of your special credit offer:<br /><br /><b style="font-size : 16px ">•</b> Credit Limit: Up to 4 Multiple of your salary
      <br /><b style="font-size : 16px ">•</b> NO Interest % on BT and EPP<br /><b style="font-size : 16px ">•</b> Airport lounge access for you through Lounge Key<br /><b style="font-size : 16px ">•</b> Access to a digital concierge channel in addition to telephone and email service<br /><b style="font-size : 16px ">•</b> 50% off on movie tickets at Novo, Reel & VOX cinemas<br /><b style="font-size : 16px ">•</b> Complimentary valet parking service across 30 locations<br /><b style="font-size : 16px ">•</b> Spend AED 500 for an entry into the lucky draw of AED 100,000 every week!<br /><b style="font-size : 16px ">•</b> No annual fees on Credit cards<br /><br />
      <p>We are offering the following credit cards:</p>
      <div class="softButtons" style="display: flex;justify-content: space-between;flex-wrap: wrap;margin-left : 1rem;;margin-top : 1rem">
        <ul style="list-style-type: disclosure-closed;font-weight : 550; cursor : pointer">
          <li id="cbdOne">CBD One</li>
          <li id="platinum">CBD Smiles Visa Platinum</li>
          <li id="signature">CBD Smiles Visa Signature</li>
          <li id="reward">CBD Yes Rewards Credit Card</li>
        </ul>
        <ul style="list-style-type: disclosure-closed;font-weight : 550; cursor : pointer">
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
    const handleOkClick = (message, imageUrl, pdfUrl, link) => {
      let contentHtml = '';

      if (isMobile) {
        contentHtml = `
          <div style="width: 100%; text-align: center;">
            <img src="${imageUrl}" alt="Offer Image" style="width: 100%; max-height: 80vh; object-fit: contain;" />
            <p>${message}</p>
            ${link ? `<a href="${link}" target="_blank" style="color: black; font-size: 15px; text-decoration: underline;">Click here for more details</a>` : ''}
          </div>
        `;
      } else {
        contentHtml = `
          <div style="width: 100%; height: 80vh; text-align: center;">
            ${pdfUrl ? `
              <iframe src="${pdfUrl}" style="width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
            ` : ''}
            <p>${message}</p>
            ${link ? `<a href="${link}" target="_blank" style="color: black; font-size: 15px; text-decoration: underline;">Click here for more details</a>` : ''}
          </div>
        `;
      }

      MySwal.fire({
        html: contentHtml,
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
        customClass: {
          popup: 'swal-popup',
        },
        didOpen: () => {
          const iframe = document.querySelector('iframe');
          if (iframe) {
            iframe.onload = () => {
              iframe.style.height = '80vh';
            };
          } if (!isMobile && iframe) {
            const fullscreenButton = document.createElement('button');
            const img = document.createElement('img');
            img.src = '/assets/img/pics/fullscreen.png';
            img.alt = 'Fullscreen';
            img.style.width = '30px';
            img.style.height = '30px';

            fullscreenButton.appendChild(img);

            fullscreenButton.style.position = 'absolute';
            fullscreenButton.style.zIndex = '9999';
            fullscreenButton.style.right = '9px';
            fullscreenButton.style.padding = '7px';
            fullscreenButton.style.backgroundColor = 'transparent';
            fullscreenButton.style.color = '#fff';
            fullscreenButton.style.border = 'none';
            fullscreenButton.style.borderRadius = '5px';
            fullscreenButton.style.cursor = 'pointer';
            fullscreenButton.onclick = () => {
              if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
              } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
              } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
              } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
              }
            };

            const popup = MySwal.getPopup();
            if (popup) {
              popup.style.position = 'relative';
              popup.appendChild(fullscreenButton);
            }
          }
        }
      });
    };

    const offers = [
      { id: 'cbdOne', message: 'Details about CBD One', imageUrl: '/assets/img/pics/pdf3.jpg', pdfUrl: '/assets/img/pics/cbdone.pdf' },
      { id: 'platinum', message: 'Details about CBD Smiles Visa Platinum', imageUrl: '/assets/img/pics/pdf2.jpg', pdfUrl: '/assets/img/pics/visaPlatinum.pdf' },
      { id: 'signature', message: 'Details about CBD Smiles Visa Signature', imageUrl: '/assets/img/pics/cp.JPG', pdfUrl: '/assets/img/pics/visaSignature.pdf' },
      { id: 'reward', message: 'Details about CBD Yes Rewards Credit Card', imageUrl: '/assets/img/pics/cp2.jpg', pdfUrl: '/assets/img/pics/smilesPlatinum.pdf' },
      { id: 'superSaver', message: 'Details about Super Saver Visa Signature', imageUrl: '/assets/img/pics/pdf0.jpg', pdfUrl: '/assets/img/pics/superSaver.pdf' },
      { id: 'visaPlatinum', message: 'Details about Visa Platinum', imageUrl: '/assets/img/pics/cp3.jpg', pdfUrl: '/assets/img/pics/YesCard.pdf' },
      { id: 'infinite', message: 'Details about Visa Infinite', imageUrl: '/assets/img/pics/S2.jpg', pdfUrl: '/assets/img/pics/cbdInfinite.pdf' },
    ];

    offers.forEach(offer => {
      const element = document.getElementById(offer.id);
      if (element) {
        element.addEventListener('click', () => handleOkClick(offer.message, offer.imageUrl, offer.pdfUrl, offer.link));
      }
    });

    return () => {
      offers.forEach(offer => {
        const element = document.getElementById(offer.id);
        if (element) {
          element.removeEventListener('click', () => handleOkClick(offer.message, offer.imageUrl, offer.pdfUrl, offer.link));
        }
      });
    };
  }, [messages, isMobile]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    const spacedValue = value.replace(/(\S)(?=\S)/g, '$1 ');
    setInputValue(spacedValue);
  };


  return (
    <>
      <div style={{ height: '91vh' }} className="d-flex bg-light">
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
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && !sendingMessage && handleSend()}
              placeholder="Type a message..."
              className="form-control flex-grow-1"
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
