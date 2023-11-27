import React, { useState, useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import UserProfile from './UserProfile';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (userId) => {

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 40px)', 
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {users.map((user) => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <UserProfile user={user} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserList;
