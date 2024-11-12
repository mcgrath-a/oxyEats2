import React, { useEffect, useState, useRef } from 'react';
import { FaEnvelopeOpenText, FaEnvelope } from "react-icons/fa";  // Subscription icons
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col } from 'reactstrap';
import { subscribeApi, unSubscribeApi, getSubscribeApi } from '../APIs/subscription';

const Newsletter = ({ }) => {
  
    const [newsletterMessage, setNewsletterMessage] = useState('The Newsletter Message will appear here');
    const [isSubscribed, setIsSubscribed] = useState(false);
        
    const getSubscriptionHandler = async () => {
        const { data, status } = await getSubscribeApi()
        setIsSubscribed(data);
    }
    
    useEffect(() => {
        getSubscriptionHandler()
    }, []);

    const handleSubscriptionToggle = async (e) => {
        e.preventDefault();
        if(isSubscribed){
          await unSubscribeApi()
        }else{
          await subscribeApi()
        }
        setIsSubscribed(!isSubscribed);
    }

    return (
        <div style={{ padding: "0px 10%"}} >
            <Row  >
                <Col xs='12' className='my-2'>
                    <div className="banner">
                        <h2 className="banner-text">{newsletterMessage}</h2>
                    </div>
                </Col>
            </Row>
            <Row className='align-items-end justify-content-end'>
                <Col xs='12' md='6' className='my-2 d-flex justify-content-center'>
                    <h5 className="news-text">Subscribe/Unsubscribe Newsletter</h5>
                </Col>
                <Col xs='12' md='6' className='my-2 d-flex justify-content-center'>
                    <Button
                        onClick={handleSubscriptionToggle}
                        color={isSubscribed ? 'danger' : 'success'}
                        className="ml-2"
                    >
                        {isSubscribed ? (
                        <>
                            <FaEnvelopeOpenText style={{ marginRight: '5px' }} /> Unsubscribe
                        </>
                        ) : (
                        <>
                            <FaEnvelope style={{ marginRight: '5px' }} /> Subscribe
                        </>
                        )}
                    </Button>
                </Col>
            </Row>
        </div>
  );
};

export default Newsletter;
