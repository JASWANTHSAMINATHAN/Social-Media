import React from 'react';
import styled from 'styled-components';
import Sidebar from './componenets/SideBar';
import Topbar from './componenets/TopBar';
import Dashboard from './componenets/Dashboard';

const AppContainer = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function App() {
  return (
    <AppContainer>
      <Sidebar />
      <MainContainer>
        <Topbar />
        <Dashboard />
      </MainContainer>
    </AppContainer>
  );
}
