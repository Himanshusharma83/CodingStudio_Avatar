import React, { useState } from 'react';
import { Card, Avatar, notification, Modal, Form, Input, message } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';
import './UserProfile.css';


const UserProfile = ({ user,onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleLike = () => {
    setLiked(!liked);
    const message = liked ? 'Unliked!' : 'Liked';
    const color = liked ? '#ff4d4f' : '#fff';
    notification.success({
      message,
      description: `You ${message.toLowerCase()} ${editedUser.name}'s Profile`,
      style: {
        backgroundColor: color,
      },
    });
  };

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    console.log('Edited User:', editedUser);
    
    notification.success({
      message: 'Updated!',
      description: `${user.name}'s Profile has been updated sucessfully`
    })
    

    setIsModalVisible(false);
  };

  const handleDelete = () => {
    
    onDelete(user.id); 
    notification.success({
      message: 'Deleted!',
      description: `${editedUser.name}'s Profile has been deleted.`,
      style: {
        backgroundColor: '#ff4d4f',
      },
    });
  };


  return (
    <Card
      bordered={true}
      style={{ width: '100%', marginBottom: 20 }}
      actions={[
        <span onClick={handleLike}>
          {liked ? (
            <HeartFilled style={{ fontSize: '20px', color: '#ff4d4f' }} />
          ) : (
            <HeartOutlined style={{ fontSize: '20px', color: '#ff4d4f' }} />
          )}
        </span>,
        <EditOutlined key="edit" style={{ fontSize: '20px' }} onClick={handleEditClick} />,
        <DeleteOutlined key="delete" style={{ fontSize: '20px' }} onClick={handleDelete} />,
      ]}
    >
      <div className="custom-image" >
        <Avatar
          style={{ marginTop: '-2.5%' }}
          className="avatar-full-size"
          size={140}
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${editedUser.name}`}
        />
      </div>
      <div className="custom-card">
        <h4 className='name' >
          {editedUser.name}
        </h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Card.Meta
              style={{ marginBottom: '8px' }}
              avatar={<MailOutlined />}
              description={<span className='email' >{editedUser.email}</span>}
            />
          </li>
          <li>
            <Card.Meta
              style={{ marginBottom: '8px' }}
              avatar={<PhoneOutlined className='phone' />}
              description={<span className='number' >{editedUser.phone}</span>}
            />
          </li>
          <li>
            <Card.Meta
              style={{ marginBottom: '8px' }}
              avatar={<GlobalOutlined />}
              description={<span className='website' >{editedUser.website}</span>}
            />
          </li>
        </ul>
      </div>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        <Form initialValues={editedUser}>
          <Form.Item label="Name" name="name">
            <Input
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input
              value={editedUser.phone}
              onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input
              value={editedUser.website}
              onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserProfile;
