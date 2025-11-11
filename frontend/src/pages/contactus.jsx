import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

// --- Styled Components ---

const ContactContainer = styled.div`
  min-height: 80vh;
  background-color: #fffafb; // Light blush background
  padding: 50px 20px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
  padding: 40px;

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ff69b4; // Hot Pink
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// --- Contact Form Styles ---

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #fce4ec;
  border-radius: 10px;
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  color: #ff69b4;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #444;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ffc0cb; // Light pink border
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff69b4;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #ffc0cb;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff69b4;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff69b4;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #ff4081;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// --- Info Card Styles ---

const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const InfoCard = styled.div`
  background: #fce4ec; // Lightest pink background
  border-radius: 10px;
  padding: 25px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.1);
`;

const InfoIcon = styled.div`
  color: #ff69b4;
  font-size: 2rem;
  margin-top: 5px;
`;

const InfoDetails = styled.div`
  h4 {
    font-size: 1.4rem;
    color: #ff4081;
    margin-bottom: 5px;
  }
  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.4;
  }
`;

// --- Component ---

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! (In a real app, this would submit to a backend API)");
    // Future logic: Submit data via Axios or Fetch
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <ContactContainer>
      <ContentWrapper>
        <Header>
          <Title>Get In Touch</Title>
          <Subtitle>We'd love to hear from you! Send us a message or find our contact details below.</Subtitle>
        </Header>

        <ContactGrid>
          
          {/* --- Contact Form --- */}
          <Form onSubmit={handleSubmit}>
            <FormTitle>Send a Message</FormTitle>
            
            <InputGroup>
              <Label htmlFor="name">Your Name</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="email">Your Email</Label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </InputGroup>
            
            <SubmitButton type="submit">
              <FaPaperPlane /> Send Message
            </SubmitButton>
          </Form>

          {/* --- Info Cards --- */}
          <InfoCardContainer>
            <InfoCard>
              <InfoIcon><FaEnvelope /></InfoIcon>
              <InfoDetails>
                <h4>Email Us</h4>
                <p>For general inquiries and support, feel free to drop us an email.</p>
                <p style={{ fontWeight: 'bold', color: '#ff69b4' }}>support@archive.com</p>
              </InfoDetails>
            </InfoCard>
            
            <InfoCard>
              <InfoIcon><FaPhone /></InfoIcon>
              <InfoDetails>
                <h4>Call Us</h4>
                <p>Reach out to our support team during business hours (9am - 5pm EST).</p>
                <p style={{ fontWeight: 'bold', color: '#ff69b4' }}>+1 (555) BOOK-LOVE</p>
              </InfoDetails>
            </InfoCard>
            
            <InfoCard>
              <InfoIcon><FaMapMarkerAlt /></InfoIcon>
              <InfoDetails>
                <h4>Our Office</h4>
                <p>We're located in the heart of the literary district, virtually!</p>
                <p style={{ fontWeight: 'bold', color: '#ff69b4' }}>101 Reader's Lane, Booktown, USA</p>
              </InfoDetails>
            </InfoCard>
          </InfoCardContainer>
        </ContactGrid>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;