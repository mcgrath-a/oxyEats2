import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "reactstrap";

const UserFeedback = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ width: "50%" }}>
        <Col xs="12" className="my-2">
          <h2 className="text-center my-4"> Feedback Form</h2>
          <div
            style={{
              fontSize: "20px",
              color: "black",
            }}
            className="label theme-color"
          ></div>
        </Col>
        <Col xs="12" className="my-3" style={{ padding: 0 }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd6D5vFjgrQ6evHORqwt5iVS53Y5SCDva2tP-FE74ROTZAgBQ/viewform?embedded=true"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            style={{
              width: "150%", // Full width of the parent container
              height: "1200px",
              border: "none",
              display: "block", // Ensures the iframe behaves like a block element
              margin: "0 auto", // Centers the iframe
              position: "relative", // Ensures centering aligns with the parent
              left: "-25%", // Offset by half of the extra width (50%)
            }}
          ></iframe>
        </Col>
      </Row>
    </div>
  );
};

export default UserFeedback;
