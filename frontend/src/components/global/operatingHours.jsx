import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import {
  getOperatingHours,
  updateOperatingHours,
} from "../../APIs/operatingHours";
import { toast } from "react-toastify";

const DEFAULT_DAYS = [
  { day: "Sunday", startTime: "10:00", endTime: "17:00" },
  { day: "Monday", startTime: "07:30", endTime: "19:30" },
  { day: "Tuesday", startTime: "07:30", endTime: "19:30" },
  { day: "Wednesday", startTime: "07:30", endTime: "19:30" },
  { day: "Thursday", startTime: "07:30", endTime: "19:30" },
  { day: "Friday", startTime: "07:30", endTime: "19:30" },
  { day: "Saturday", startTime: "10:00", endTime: "14:00" },
];

function AdminOperatingHours() {
  const [hours, setHours] = useState(DEFAULT_DAYS);
  const [editing, setEditing] = useState(false);
  const [tempHours, setTempHours] = useState(DEFAULT_DAYS);

  useEffect(() => {
    getOperatingHours()
      .then((response) => {
        const fetchedHours = response.data;
        // Merge fetched data with defaults
        const mergedHours = DEFAULT_DAYS.map((defaultDay) => {
          const fetchedDay = fetchedHours.find(
            (hour) => hour.day === defaultDay.day
          );
          return fetchedDay || defaultDay;
        });
        setHours(mergedHours);
        setTempHours(mergedHours);
      })
      .catch((error) => {
        console.error("Failed to fetch operating hours HERE:", error);
        //toast.error("Failed to load operating hours.");
      });
  }, []);

  const handleCancel = () => {
    setTempHours([...hours]); // Reset tempHours to original hours
    setEditing(false);
  };

  const handleUpdate = () => {
    Promise.all(
      tempHours.map((hour) =>
        updateOperatingHours(hour).then((response) => response.data)
      )
    )
      .then((updatedHours) => {
        toast.success("Operating hours updated successfully!");
        setEditing(false);
        setHours(tempHours);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update operating hours.");
      });
  };

  const handleChange = (day, field, value) => {
    setTempHours((prevHours) =>
      prevHours.map((hour) =>
        hour.day === day ? { ...hour, [field]: value } : hour
      )
    );
    setEditing(true); // Set editing state to true if changes are made
  };

  const ColoredText = ({ color, children }) => (
    <span style={{ color }}>{children}</span>
  );

  return (
    <div className="px-4 py-3">
      <h2
        className="text-center mb-4"
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        Manage Operating Hours
      </h2>
      <div>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            textAlign: "center",
            color: "black",
          }}
        >
          Manage the MP hours to display the current live status in real time.
          Update the opening times in the{" "}
          <ColoredText color="green">green</ColoredText> box and the closing times in
          the <ColoredText color="red">red</ColoredText> box.
        </p>
      </div>
      <br></br>
      <br></br>

      <Form>
        {tempHours.map((hour) => (
          <Row key={hour.day} className="mb-3 align-items-center">
            <Col md="2" style={{ paddingLeft: "40px" }}>
              {" "}
              {/* Adjust the padding value */}
              <Label for={`${hour.day}-day`} style={{ fontWeight: "bold" }}>
                {hour.day}
              </Label>
            </Col>

            <Col md="4">
            <FormGroup>
                <Label for={`${hour.day}-startTime`} className="sr-only">
                  Start Time
                </Label>
                <Input
                  id={`${hour.day}-startTime`}
                  type="time"
                  value={hour.startTime || ""}
                  onChange={(e) =>
                    handleChange(hour.day, "startTime", e.target.value)
                  }
                  style={{
                    border: "1px solid green",
                    borderRadius: "5px", // Optional: Make the border rounded
                    padding: "5px", // Optional: Add some padding
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for={`${hour.day}-endTime`} className="sr-only">
                  End Time
                </Label>
                <Input
                  id={`${hour.day}-endTime`}
                  type="time"
                  value={hour.endTime || ""}
                  onChange={(e) =>
                    handleChange(hour.day, "endTime", e.target.value)
                  }
                  style={{
                    border: "1px solid red",
                    borderRadius: "5px", // Optional: Make the border rounded
                    padding: "5px", // Optional: Add some padding
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        ))}
        <Row className="d-flex justify-content-center mt-4">
          <Button
            color="primary"
            className="mx-2"
            onClick={handleUpdate}
            disabled={!editing}
          >
            Update
          </Button>
          <Button
            color="danger"
            className="mx-2"
            onClick={handleCancel}
            disabled={!editing}
          >
            Cancel
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default AdminOperatingHours;
