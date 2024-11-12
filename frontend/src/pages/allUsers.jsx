import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'reactstrap';

const UserDetails = ({ userDetails }) => {
  
    return (
        <div>
            <h2 className="text-center my-4"> User Details</h2>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Newsletter Email</th>
                            <th>Subscribed to Newsletter</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userDetails?.map((user, index) => (
                                <tr key={index}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.newsEmail}</td>
                                <td>{user.isSubscribedToNewsletter ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            
        </div>
  );
};

export default UserDetails;
