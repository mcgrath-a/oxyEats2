import React, { useState, useEffect, useRef } from 'react';
import {Button, Row, Col } from 'reactstrap';
import { completeDate, getHHMM } from '../utilities';
import { toast } from 'react-toastify';
import { updateBanner, getBannerTiming } from "../APIs/banner"

const BannerTime = ({ title }) => {
  const [timing, setTiming] = useState({
    startTimeOne: '',
    endTimeOne: '',
    startTimeTwo: '',
    endTimeTwo: '',
    startTimeText: '',
    endTimeText: ''
  });
  

  const gatBannerTimingHandler = async () => {
    const { data, status} = await getBannerTiming(null)
    setTiming(data)
  }

  useEffect(() => {
    gatBannerTimingHandler()
  }, [])

  const submitHandler = async () => {
    try {
      const { data, status } = await updateBanner(null, timing)
      setTiming(data)
      toast.success("Updated Successfully")
    } catch (error) {
      console.log("Error", error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='mx-5'>
      <h2>{title}</h2>
      <Row>
        <Col xs='6' className='my-2'>
            <div style={{
                fontSize: '16px',
                color: 'gray'
            }} className="label theme-color">
                Start Time From
            </div>
            <input
                value= {getHHMM(timing.startTimeOne)}
                type="time"
                name="startTimeOne"
                className='searchInput border-circular w-100 bg-white'
                onChange={(e) => setTiming({...timing, [e.target.name]: completeDate(e.target.value)})}
                required
            />
        </Col>
        <Col xs='6' className='my-2'>
            <div style={{
                fontSize: '16px',
                color: 'gray'
            }} className="label theme-color">
                 Start Time To
            </div>
            <input
                value= {getHHMM(timing.startTimeTwo)}
                type="time"
                name="startTimeTwo"
                className='searchInput border-circular w-100 bg-white'
                onChange={(e) => setTiming({...timing, [e.target.name]: completeDate(e.target.value)})}
                required
            />
        </Col>
    </Row>
    <Row>
        <Col xs='6' className='my-2'>
            <div style={{
                fontSize: '16px',
                color: 'gray'
            }} className="label theme-color">
                End Time From
            </div>
            <input
                value= {getHHMM(timing.endTimeOne)}
                type="time"
                name="endTimeOne"
                className='searchInput border-circular w-100 bg-white'
                onChange={(e) => setTiming({...timing, [e.target.name]: completeDate(e.target.value)})}
                required
            />
        </Col>
        <Col xs='6' className='my-2'>
            <div style={{
                fontSize: '16px',
                color: 'gray'
            }} className="label theme-color">
                End Time To
            </div>
            <input
                value= {getHHMM(timing.endTimeTwo)}
                type="time"
                name="endTimeTwo"
                className='searchInput border-circular w-100 bg-white'
                onChange={(e) => setTiming({...timing, [e.target.name]: completeDate(e.target.value)})}
                required
            />
        </Col>
    </Row>
    <Row>
        <Col xs='6' className='my-2'>
            <div style={{
                fontSize: '16px',
                color: 'gray'
            }} className="label theme-color">
                Start Time Text
            </div>
            <input
                value= {timing.startTimeText}
                type="text"
                name="startTimeText"
                className='searchInput border-circular w-100 bg-white'
                onChange={(e) => setTiming({...timing, [e.target.name]: e.target.value})}
                required
            />
        </Col>
        <Col xs='6' className='my-2'>
            <div style={{
                fontSize: '16px',
                color: 'gray'
            }} className="label theme-color">
                End Time Text
            </div>
            <input
                value= {timing.endTimeText}
                type="text"
                name="endTimeText"
                className='searchInput border-circular w-100 bg-white'
                onChange={(e) => setTiming({...timing, [e.target.name]: e.target.value})}
                required
            />
        </Col>
    </Row>
    <Row>
      <Col xs='12' className='d-flex justify-content-end my-2'>
        <Button onClick={submitHandler}  style={{ backgroundColor: 'orange' }}>
            Update
        </Button>
      </Col>
    </Row>
  </div>
);

};

export default BannerTime;
