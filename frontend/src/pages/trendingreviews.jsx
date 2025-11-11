import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaStar, FaFrownOpen, FaSpinner } from 'react-icons/fa';
// import axios from 'axios'; // Uncomment this when ready to fetch real data

const TrendingContainer = styled.div`
  min-height: 80vh;
  padding: 50px 20px;
  background-color: #f7f7f7;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #ff69b4;
  margin-bottom: 40px;
  font-family: 'Playfair Display', serif;
`;

const NoReviewsCard = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #555;
`;

const Icon = styled.div`
  color: #ff69b4;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ReviewGrid = styled.div`
    /* Placeholder for future grid layout */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
`;

const TrendingReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🚨 TEMPORARY: Simulate fetching empty data
  useEffect(() => {
    // In the future, this is where you'd call your backend:
    // axios.get('http://localhost:5000/api/reviews/trending')
    // .then(response => { setReviews(response.data); setLoading(false); })
    // .catch(error => { console.error(error); setLoading(false); });

    // Simulate empty data loading after 1 second
    setTimeout(() => {
        setReviews([]); // Simulates an empty array from the backend
        setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <NoReviewsCard>
        <Icon><FaSpinner className="fa-spin" /></Icon>
        <Message>Loading trending reviews...</Message>
      </NoReviewsCard>
    );
  }

  // --- Main Logic: Check if the array is empty ---
  if (reviews.length === 0) {
    return (
      <TrendingContainer>
        <Header>Trending Reviews <FaStar size="0.8em" /></Header>
        <NoReviewsCard>
          <Icon><FaFrownOpen /></Icon>
          <Message>No trending reviews found yet.</Message>
          <p>Be the first to submit a review and get the trend started!</p>
        </NoReviewsCard>
      </TrendingContainer>
    );
  }

  // Future code to render the actual reviews will go here
  return (
    <TrendingContainer>
      <Header>Trending Reviews <FaStar size="0.8em" /></Header>
      <ReviewGrid>
        {/* {reviews.map(review => (<ReviewCard key={review._id} review={review} />))} */}
        {/* Placeholder for successful fetch: */}
        <p>Reviews loaded successfully! (Implement ReviewCard component here)</p>
      </ReviewGrid>
    </TrendingContainer>
  );
};

export default TrendingReviews;