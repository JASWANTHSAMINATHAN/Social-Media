// src/components/Dashboard.js
import React from 'react';
import SocialCard from '../SocialCard';
import Analytics from '../Analytics';
import styled from 'styled-components';
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const DashboardContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const SocialCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <SocialCardsContainer>
        <SocialCard platform="Instagram" followers="23k" icon={<RiInstagramFill className='icon' style={{color:"red"}} />} />
        <SocialCard platform="Facebook" followers="5k" icon={<FaFacebook className='icon' style={{color:"blue"}} />} />
        <SocialCard platform="LinkedIn" followers="1k" icon={<FaLinkedin className='icon' style={{color:"blue"}} />} />
        <SocialCard platform="X (Twitter)" followers="200" icon={<FaXTwitter className='icon' />} />
        <SocialCard platform="Youtube" followers="100k" icon={<FaYoutube className='icon' style={{color:"red"}} />} />
        <SocialCard platform="Whatsapp" followers="150 Contacts" icon={<FaWhatsapp className='icon' style={{color:"green"}} />} />
      </SocialCardsContainer>
      <Analytics />
    </DashboardContainer>
  );
}
