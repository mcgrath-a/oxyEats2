import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'; 
import { toast } from 'react-toastify';
import { getMe, updateMe } from "../APIs/users"
import { setCredentials } from '../store/credentialsSlice';

const UserPreference = ({ }) => {
  
    const dispatch = useDispatch();  
    const credentials = useSelector((state) => state.credentials.credentials);
    const [email, setEmail] = useState(credentials.email);
    const [fullName, setFullName] = useState(credentials.fullName);
    const [newsEmail, setNewsEmail] = useState(credentials.newsEmail);
    
    const formSubmitHandler = async (e) => {

        try {
            e.preventDefault();
            const { data, status } = await updateMe(fullName, newsEmail);
            if(status !== 200){
                toast.error('Request failed. Try again.');
                return
            }
            dispatch(setCredentials({
                newsEmail: data?.newsEmail,
                email: data?.email,
                role: data?.role,
                fullName: data?.fullName,
                _id: data?._id,
              }));

            toast.success("Update successful")
        } catch (error) {
            console.error("Request failed", error);
            toast.error('Request failed. Try again.');
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Row style={{ width: "50%",  }} >
                <Col xs='12' className='my-2'>
                    <div style={{
                        fontSize: '16px',
                        color: 'gray'
                    }} className="label theme-color">
                        Full Name
                    </div>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        name="fullName"
                        className='searchInput border-circular w-100 bg-white'
                        required
                    />
                </Col>
                <Col xs='12' className='my-2'>
                    <div style={{
                        fontSize: '16px',
                        color: 'gray'
                    }} className="label theme-color">
                        Registered Email
                    </div>
                    <input
                        style={{
                            color: "lightgrey"
                        }} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        className='searchInput border-circular w-100 bg-white'
                        disabled
                    />
                </Col>
                <Col xs='12' className='my-2'>
                    <div style={{
                        fontSize: '16px',
                        color: 'gray'
                    }} className="label theme-color">
                        Newsletter Email 
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setNewsEmail(e.target.value)}
                        value={newsEmail}
                        name="newsEmail"
                        className='searchInput border-circular w-100 bg-white'
                        required
                    />
                </Col>
                <Col xs='12' className='my-2'>
                    <Button type='button' onClick={formSubmitHandler} style={{ backgroundColor: 'orange' }}>
                        Update
                    </Button>
                </Col>
            </Row>
        </div>
  );
};

export default UserPreference;
