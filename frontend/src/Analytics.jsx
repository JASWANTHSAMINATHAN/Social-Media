// src/components/Analytics.js
import React from 'react';
import styled from 'styled-components';
import Charts from './componenets/Charts';

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 20px;
`;

const Chart = styled.div`
  width: 400px;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Analytics() {
  return (
    <AnalyticsContainer>
      <Charts />
    </AnalyticsContainer>
  );
}
