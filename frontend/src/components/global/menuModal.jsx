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
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";

export default function MenuModal({
  menuUpdateModal,
  setMenuUpdateModal,
  data,
  onUpdate,
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [newFood, setNewFood] = useState("");
  const [newFoodDiet, setNewFoodDiet] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const handleAddFood = (e) => {
    e.preventDefault();
    const updatedData = [...data].map((day, dayIndex) => {
      if (dayIndex === Number(selectedDayIndex)) {
        return {
          ...day,
          data: day.data.map((meal, mealIndex) => {
            if (mealIndex === Number(selectedMealIndex)) {
              return {
                ...meal,
                foods: [
                  ...meal.foods,
                  `${selectedSection} - ${newFood} ${newFoodDiet}`,
                ],
              };
            }
            return meal;
          }),
        };
      }
      return day;
    });
    setMenuUpdateModal(false);
    onUpdate(updatedData[Number(selectedDayIndex)]);
    toast.success("Food item added successfully!");
    setNewFood("");
    setNewFoodDiet("");
    setSelectedSection("");
  };

  return (
    <div className="px-4 py-3">
      <h2
        className="text-center mb-4"
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        Add Menu Item
      </h2>

      <Form onSubmit={handleAddFood}>
        <Row className="mb-4">
          <Col md="4">
            <FormGroup>
              <Label
                for="daySelect"
                style={{
                  fontWeight: "bold",
                  marginRight: "8px", // Add margin to separate label and input
                }}
              >
                Select Day
              </Label>
              <Input
                type="select"
                name="daySelect"
                id="daySelect"
                value={selectedDayIndex}
                onChange={(e) => {
                  setSelectedDayIndex(Number(e.target.value));
                  setSelectedMealIndex(0);
                }}
              >
                {data.map((day, index) => (
                  <option key={day._id} value={index}>
                    {day.day} - {day.date}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="mealSelect" style={{ fontWeight: "bold", marginRight: "8px" }}>
                Select Meal
              </Label>
              <Input
                type="select"
                name="mealSelect"
                id="mealSelect"
                value={selectedMealIndex}
                onChange={(e) => setSelectedMealIndex(Number(e.target.value))}
              >
                {data[selectedDayIndex]?.data?.map((meal, index) => (
                  <option key={index} value={index}>
                    {meal.meal}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="4">
            <FormGroup>
              <Label for="sectionSelect" style={{ fontWeight: "bold" }}>
                Select Section
              </Label>
              <Input
                type="select"
                name="sectionSelect"
                id="sectionSelect"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                required
                className="form-control"
              >
                <option value="" disabled>
                  Choose a section
                </option>
                <option value="Homestyle Station">Homestyle Station</option>
                <option value="Sauté Station">Sauté Station</option>
                <option value="Chef's Corner">Chef's Corner</option>
                <option value="Grill Station">Grill Station</option>
                <option value="Sandwich Station">Sandwich Station</option>
                <option value="Salad Bar">Salad Bar</option>
                <option value="Soup">Soup</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="newFood" style={{ fontWeight: "bold" }}>
                New Food Item
              </Label>
              <Input
                type="text"
                name="newFood"
                id="newFood"
                placeholder="Enter food item"
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                required
              />
            </FormGroup>
          </Col>

        </Row>

        <Row className="mb-4">
          
          <Col md="6">
            <FormGroup>
              <Label for="newFoodDiet" style={{ fontWeight: "bold" }}>
                Dietary Labeling 
              </Label>
              <Input
                type="text"
                name="newFoodDiet"
                id="newFoodDiet"
                placeholder="Enter dietary labeling (e.g. (v),(gf))"
                value={newFoodDiet}
                onChange={(e) => setNewFoodDiet(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Button type="submit" color="primary" className="mx-2">
            Add Item
          </Button>
          <Button
            onClick={() => setMenuUpdateModal(false)}
            color="danger"
            className="mx-2"
          >
            Cancel
          </Button>
        </Row>
      </Form>
    </div>
  );
}
