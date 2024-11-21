import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "reactstrap";

const AdminFeedback = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ width: "50%" }}>
        <Col xs="12" className="my-2">
          <h2 className="text-center my-4"> Feedback Form Responses</h2>
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
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSJHkG6VHtEu1KOc2NbxZ1KOGLmRZ2w1sxcf505OoAEFRvXH_NuoaYbg-th1pXX6cxbjz-ECN5puS7p/pubhtml?gid=1460127920&amp;single=true&amp;widget=true&amp;headers=false"
           
            style={{
              width: "150%", // Full width of the parent container
              height: "750px",
              border: "none",
              display: "block", // Ensures the iframe behaves like a block element
              margin: "0 auto", // Centers the iframe
              position: "relative", // Ensures centering aligns with the parent
              left: "-25%", // Offset by half of the extra width (50%)
              border:"3 px",
              scrollBehavior: "smooth",
            }}
          ></iframe>
        </Col>
      </Row>
    </div>
  );
};

export default AdminFeedback;
