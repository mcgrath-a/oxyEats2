import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'reactstrap';

const RatingsTable = ({ data }) => {
  
    return (
        <div>
            {console.log("dtaa", data)}
            <h2 className="text-center my-4">Food Ratings</h2>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Ratings (avg.) </th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => 
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.rating}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
            
        </div>
  );
};

export default RatingsTable;
