// src/components/SocialCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #e0f7fa;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const FollowerCount = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default function SocialCard({ platform, followers , icon}) {
  return (
    <Card>
        <div>{icon}</div>
      <h4>{platform}</h4>
      {platform!=="Whatsapp" ? (
          <FollowerCount>{followers} Followers</FollowerCount>
      ) : (
        <FollowerCount>{followers}</FollowerCount>
      )}
    </Card>
  );
}
