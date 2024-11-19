import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "../../APIs/auth"; // Assuming this is the registration API call

export default function SignupModal({ signupModal, setSignupModal }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [successModal, setSuccessModal] = useState(false); // State for the success pop-up

  const formSubmitHandler = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading before making the API call
    try {
      const { data, status } = await register(email, password, fullName);
      setLoading(false); // Stop loading after the API call

      if (status !== 200) {
        toast.error("Signup failed. Try again.");
        return;
      }

      setSignupModal(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      toast.success("Sign up successfully");
      setSuccessModal(true);
    } catch (error) {
      console.error("Signup failed", error);
      setLoading(false); // Stop loading on error
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <>
      <Modal isOpen={signupModal} centered={true} size="md">
        <ModalHeader>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
            className="w-100 text-black fw-bold text-center theme-color"
          >
            Sign Up for an Account
          </p>
        </ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formSubmitHandler();
          }}
        >
          <ModalBody className="p-5">
            <Row>
              <Col xs="12" className="my-2">
                <div
                  style={{
                    fontSize: "16px",
                    color: "gray",
                  }}
                  className="label theme-color"
                >
                  Full Name
                </div>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  name="fullName"
                  className="searchInput border-circular w-100 bg-white"
                  required
                />
              </Col>
              <Col xs="12" className="my-2">
                <div
                  style={{
                    fontSize: "16px",
                    color: "gray",
                  }}
                  className="label theme-color"
                >
                  Email
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  className="searchInput border-circular w-100 bg-white"
                  required
                />
              </Col>
              <Col xs="12" className="my-2">
                <div
                  style={{
                    fontSize: "16px",
                    color: "gray",
                  }}
                  className="label theme-color"
                >
                  Password
                </div>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  className="searchInput border-circular w-100 bg-white"
                  required
                />
              </Col>
              <Col xs="12" className="my-2">
                <div
                  style={{
                    fontSize: "16px",
                    color: "gray",
                  }}
                  className="label theme-color"
                >
                  Confirm Password
                </div>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  name="confirmPassword"
                  className="searchInput border-circular w-100 bg-white"
                  required
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              style={{ backgroundColor: "orange" }}
              disabled={loading} // Disable button during loading
            >
              {loading ? <Spinner size="sm" color="light" /> : "SIGN UP"}
            </Button>
            <Button onClick={() => setSignupModal(false)} color="danger">
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={successModal} centered={true} size="med">
        <ModalHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "0 auto", // Centers the title text
              }}
              className="theme-color"
            >
              Success!
            </span>
            <button
              onClick={() => setSuccessModal(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "gray",
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </ModalHeader>
        <ModalBody className="text-center">
          <p style={{ fontSize: "16px", color: "gray" }}>
            Your account has been created successfully. Please <b>log in</b> to
            access your account.
          </p>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}
