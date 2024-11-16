import React, { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaEnvelope } from "react-icons/fa"; // Subscription icons
import { Button, Row, Col } from "reactstrap";
import {
  subscribeApi,
  unSubscribeApi,
  getSubscribeApi,
} from "../APIs/subscription";
import axios from "axios"; // To send the confirmation email

const Newsletter = () => {
  const [newsletterMessage, setNewsletterMessage] = useState(
    "Weekly Menu's sent Monday in the A.M."
  );
  const [isSubscribed, setIsSubscribed] = useState(false);

  const getSubscriptionHandler = async () => {
    try {
      console.log("Fetching subscription status...");
      const { data } = await getSubscribeApi();
      console.log("Subscription status fetched:", data); // Log the data
      setIsSubscribed(data); // Ensure this updates correctly
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    }
  };

  useEffect(() => {
    getSubscriptionHandler();
  }, []);

  const handleSubscriptionToggle = async (e) => {
    e.preventDefault();

    if (isSubscribed) {
      console.log("Unsubscribing user...");
      try {
        await unSubscribeApi();
        console.log("User unsubscribed successfully.");
      } catch (error) {
        console.error("Error unsubscribing:", error);
      }
    } else {
      console.log("Subscribing user...");
      try {
        const response = await subscribeApi();
        console.log("Response from subscribeApi:", response);

        if (response?.data?.email) {
          console.log("Email fetched from response:", response.data.email);

          console.log("Sending confirmation email...");
          await axios.post("/api/send-confirmation-email", {
            email: response.data.email,
          });
          console.log("Confirmation email sent successfully.");
        } else {
          console.error("Email is missing in the response:", response);
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    }

    setIsSubscribed(!isSubscribed);
  };

  return (
    <div style={{ padding: "0px 10%" }}>
      <Row>
        <Col xs="12" className="my-2">
          <div className="banner">
            <h2 className="banner-text">{newsletterMessage}</h2>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center">
        <Col xs="12" md="6" className="my-3 text-center">
          <h5 className="news-text mb-3">
            Curious to know what is on the menu for the week? Sign up for Menu
            Mail to receive a weekly menu from OxyEats to your email.
          </h5>
          <br>
          {/* break in line the old fashioned way */}
          </br>
          <Button
            onClick={handleSubscriptionToggle}
            color={isSubscribed ? "danger" : "success"}
          >
            {isSubscribed ? (
              <>
                <FaEnvelopeOpenText style={{ marginRight: "5px" }} />{" "}
                Unsubscribe
              </>
            ) : (
              <>
                <FaEnvelope style={{ marginRight: "5px" }} /> Subscribe
              </>
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Newsletter;
