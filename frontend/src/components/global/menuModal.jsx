import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';

export default function MenuModal({ menuUpdateModal, setMenuUpdateModal, data, onUpdate }) {
    const [selectedDayIndex, setSelectedDayIndex] = useState(0); 
    const [selectedMealIndex, setSelectedMealIndex] = useState(0); 
    const [newFood, setNewFood] = useState(''); 
    const [newFoodDiet, setNewFoodDiet] = useState(''); 

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
                                foods: [...meal.foods, newFood + " - " + newFoodDiet] 
                            };
                        }
                        return meal;
                    })
                };
            }
            return day;
        });
        setMenuUpdateModal(false); 
        onUpdate(updatedData[Number(selectedDayIndex)]); 
        toast.success("Food item added successfully!");
        // setNewFood('');
    };

    return (
        <>
        <Modal isOpen={menuUpdateModal} centered={true} size="md">
            <ModalHeader>
                <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold'
                }} className='w-100 text-black fw-bold text-center theme-color'>
                    Add Menu Item
                </p>
            </ModalHeader>
            <Form onSubmit={handleAddFood}>
                <ModalBody className='p-5'>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="daySelect">Select Day</Label>
                                <Input
                                    type="select"
                                    name="daySelect"
                                    id="daySelect"
                                    value={selectedDayIndex}
                                    className='mx-2 p-1'
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
                        <Col md="12">
                            <FormGroup>
                                <Label for="mealSelect">Select Meal</Label>
                                <Input
                                    type="select"
                                    name="mealSelect"
                                    id="mealSelect"
                                    className='mx-2 p-1'
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
                        <Col md="12">
                            <FormGroup>
                                <Label for="newFood">New Food Item</Label>
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
                            <FormGroup>
                                <Label for="newFood">Dietary Labeling</Label>
                                <Input
                                    type="text"
                                    name="newFood"
                                    id="newFood"
                                    placeholder="Enter dietary labeling"
                                    value={newFoodDiet}
                                    onChange={(e) => setNewFoodDiet(e.target.value)}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' color="primary">
                        Add Item
                    </Button>
                    <Button onClick={() => setMenuUpdateModal(false)} color="danger">
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
        </>
    );
}
