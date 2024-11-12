import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'reactstrap';

const UserFeedback = () => {

    return (
        
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Row style={{ width: "50%" }} >
                <Col xs='12' className='my-2'>
                <h2 className="text-center my-4"> Feedback Form</h2>
                    <div style={{
                        fontSize: '20px',
                        color: 'black'
                    }} className="label theme-color">
                    </div>
                </Col>
                <Col xs="12" className='my-2'>
                    {/* Embedding Google Form */}
                    <iframe 
                        src="https://docs.google.com/forms/d/e/1FAIpQLScmrPPfQZPxnebtTiRhOJefYcoZoNH70ta8iLSk1GKu7HJp4A/viewform?embedded=true" 
                        frameborder="0" 
                        marginheight="0" 
                        marginwidth="0"
                        style={{
                            width: 'calc(100% - 20px)', // 100% width of the parent minus 20px for margin
                            height: '1200px', // Fixed height, adjust as necessary
                            border: 'none',
                            margin: '10px' // 10px margin around the iframe
                        }}>
                    </iframe>
                </Col>
            </Row>
        </div>
    );
};


export default UserFeedback;
