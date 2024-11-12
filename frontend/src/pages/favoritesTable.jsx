import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'reactstrap';

const FavoritesTable = ({ data }) => {
  
    return (
        <div>
            <h2 className="text-center my-4">Food Ratings</h2>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Occurences</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => 
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
            
        </div>
  );
};

export default FavoritesTable;
