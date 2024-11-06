// src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import profileImg from "../componenets/assets/profile-img.png";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #e0f7fa;
  height: 100vh;
  padding: 20px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 150px;
  margin: 20px auto;
  display: block;
`;

const Menu = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuItem = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <Avatar src={profileImg} alt="User Avatar" />
      <p style={{ textAlign: 'center' }}>Kavin S</p>
      <p style={{ textAlign: 'center' }}>kavins@gmail.com</p>
      <Menu>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Analysis</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Sign Out</MenuItem>
      </Menu>
    </SidebarContainer>
  );
}
