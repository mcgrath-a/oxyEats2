import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register } from '../../APIs/auth'; // Assuming this is the registration API call

export default function SignupModal({ signupModal, setSignupModal }) {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const formSubmitHandler = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const { data, status } = await register(email, password, fullName);
            if(status !== 200){
                toast.error('Signup failed. Try again.');
                return
            }
            setSignupModal(false)
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setFullName("")
            toast.success("Sign up successfully")
        } catch (error) {
            console.error("Signup failed", error);
            toast.error('Signup failed. Try again.');
        }
    }

    return (
        <>
        <Modal isOpen={signupModal} centered={true} size="md">
            <ModalHeader>
                <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold'
                }} className='w-100 text-black fw-bold text-center theme-color'>
                    Sign Up for an Account
                </p>
            </ModalHeader>
            <Form onSubmit={(e) => {
                e.preventDefault();
                formSubmitHandler();
            }}>
                <ModalBody className='p-5'>
                    <Row>
                        <Col xs='12' className='my-2'>
                            <div style={{
                                fontSize: '16px',
                                color: 'gray'
                            }} className="label theme-color">
                                First Name
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
                                Email
                            </div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                name="email"
                                className='searchInput border-circular w-100 bg-white'
                                required
                            />
                        </Col>
                        <Col xs='12' className='my-2'>
                            <div style={{
                                fontSize: '16px',
                                color: 'gray'
                            }} className="label theme-color">
                                Password
                            </div>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name="password"
                                className='searchInput border-circular w-100 bg-white'
                                required
                            />
                        </Col>
                        <Col xs='12' className='my-2'>
                            <div style={{
                                fontSize: '16px',
                                color: 'gray'
                            }} className="label theme-color">
                                Confirm Password
                            </div>
                            <input
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                name="confirmPassword"
                                className='searchInput border-circular w-100 bg-white'
                                required
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' style={{ backgroundColor: 'orange' }}>
                        SIGN UP
                    </Button>
                    <Button onClick={() => setSignupModal(false)} color="danger">
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
        </>
    );
}
