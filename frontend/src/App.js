import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './componenets/SideBar';
import Topbar from './componenets/TopBar';
import Dashboard from './componenets/Dashboard';
import SignIn from './componenets/SignIn';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from './componenets/SignUp';

const AppContainer = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, false otherwise
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <SignIn onLogin={setIsLoggedIn} />
            )
          }
        />

        <Route path="/signup" element={<SignUp />} />

        {/* If user is logged in, show dashboard; otherwise redirect to /signin */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <AppContainer>
                <Sidebar />
                <MainContainer>
                  <Topbar />
                  <Dashboard />
                </MainContainer>
              </AppContainer>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </Router>
  );
}