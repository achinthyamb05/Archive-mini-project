import React from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaUsers, FaHeart } from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: 80vh;
  background-color: #fffafb; /* Soft pink background */
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.2);
  padding: 40px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  color: #ff69b4; /* Hot Pink */
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
`;

const Subheader = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
`;

const FeatureGrid = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  padding: 20px;
  background: #fce4ec; /* Lightest pink */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  color: #ff69b4;
  margin-bottom: 15px;
  font-size: 3rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #555;
  font-size: 1rem;
`;

const AboutUs = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <Header>About The Archive <FaBookOpen size="0.8em" style={{marginLeft: '10px'}}/></Header>
        <Subheader>Your trusted space for finding and sharing book reviews.</Subheader>
        
        <p>The Archive was founded on the simple idea that every great book deserves a great conversation. We are a community-driven platform dedicated to connecting readers with their next favorite story, powered entirely by honest, user-submitted reviews and ratings. Our mission is to build the most comprehensive, reliable, and delightful database of books and reader insights.</p>
        
        <FeatureGrid>
          <FeatureCard>
            <Icon><FaBookOpen /></Icon>
            <CardTitle>Discover New Reads</CardTitle>
            <CardText>Explore our growing library, filter by genre, and see what the community is talking about.</CardText>
          </FeatureCard>
          
          <FeatureCard>
            <Icon><FaUsers /></Icon>
            <CardTitle>Community Driven</CardTitle>
            <CardText>Every rating, review, and piece of data is sourced from real, passionate readers like you.</CardText>
          </FeatureCard>
          
          <FeatureCard>
            <Icon><FaHeart /></Icon>
            <CardTitle>Unbiased Opinions</CardTitle>
            <CardText>We provide an honest space for both praise and critique, helping you choose wisely.</CardText>
          </FeatureCard>
        </FeatureGrid>
        
      </ContentWrapper>
    </AboutContainer>
  );
};

export default AboutUs;