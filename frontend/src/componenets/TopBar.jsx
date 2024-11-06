// src/components/Topbar.js
import React from 'react';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Topbar() {
  return (
    <TopbarContainer>
      <div className='search-bar'>
      <input placeholder="Search your social media analytics" className='search' />
      <IoSearch className='search-icon' />
      </div>
      <Icons>
        <span>🌙</span>
        <span>🔔</span>
        <span>👤</span>
      </Icons>
    </TopbarContainer>
  );
}
