import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaUserEdit, FaCommentDots, FaSpinner, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

// --- Styled Components (omitted for brevity) ---
const DetailContainer = styled.div`
  min-height: 80vh;
  background-color: #fffafb; 
  padding: 50px 20px;
  display: flex;
  justify-content: center;
`;
// ... (Your styled components remain unchanged) ...
const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
  padding: 40px;
`;

const BookHeader = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CoverImage = styled.img`
  width: 250px;
  height: 350px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const BookInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #ff69b4;
  margin-bottom: 5px;
  font-family: 'Playfair Display', serif;
`;

const Author = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 300;
`;

const MetaData = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 8px;
  
  strong {
    color: #ff69b4;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Stars = styled.div`
  color: #f7a400; // Gold/Yellow for stars
  font-size: 1.5rem;
`;

const ReviewCount = styled.span`
  color: #ff69b4;
  font-size: 1rem;
  text-decoration: none;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 30px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  background-color: ${props => (props.$primary ? '#ff69b4' : '#ffc0cb')};
  color: ${props => (props.$primary ? 'white' : '#333')};
  border: ${props => (props.$primary ? 'none' : '2px solid #ff69b4')};

  &:hover {
    background-color: ${props => (props.$primary ? '#ff4081' : '#ff69b4')};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewSection = styled.section`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #fce4ec; 
`;

const SectionHeading = styled.h3`
  font-size: 2rem;
  color: #ff69b4;
  margin-bottom: 20px;
  border-left: 5px solid #ff69b4;
  padding-left: 10px;
`;

// --- New Review List Styles ---
const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewCard = styled.div`
  background: #fffafb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(255, 105, 180, 0.1);
  border-left: 4px solid #ffc0cb;
`;

const ReviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px dashed #fce4ec;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: #ff69b4;
  font-size: 0.95rem;
`;

const ReviewRating = styled.div`
  color: #f7a400;
  font-size: 1.1rem;
`;

const ReviewHeadline = styled.h4`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 8px;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.4;
`;

// --- Helper Functions and Status Components ---

const renderStars = (rating) => {
  const finalRating = rating || 0; // Use 0 if rating is null/undefined
  const fullStars = Math.floor(finalRating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return stars;
};

const LoadingState = () => (
    <DetailContainer>
      <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: '#ff69b4' }} />
      <p style={{ marginLeft: '15px', color: '#ff69b4' }}>Loading Book Details...</p>
    </DetailContainer>
);

// --- Component ---

const BookDetails = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user info to check if they are logged in
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Fetch Book Details
        const bookResponse = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        const bookData = bookResponse.data;
        setBook(bookData);
        
        // 2. We assume the book data already contains the reviews array if properly populated in the backend
        // Set the reviews from the fetched book data, falling back to an empty array
        setReviews(bookData.reviews || []); 

        setLoading(false);
      } catch (err) {
        setError('Failed to load data. The book ID may be invalid or the backend is offline.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !book) {
    return (
        <DetailContainer>
            <ContentWrapper>
                <Title>Error or Book Not Found</Title>
                <p style={{color: '#ff4081'}}>{error || "The requested book details could not be found."}</p>
                <Link to="/books" style={{marginTop: '20px', color: '#ff69b4'}}>Go back to Book Listings</Link>
            </ContentWrapper>
        </DetailContainer>
    );
  }
  
  // 🚨 FIX 1: Safely access and format averageRating
  // Use optional chaining (?. ) and fallback to 0 before calling .toFixed(1)
  const safeRating = book.averageRating || 0;
  const displayRating = safeRating.toFixed(1);

  // Get the number of reviews safely
  const reviewCount = book.reviews?.length || 0;
  
  // Safely join the genre array (it might be a string if you only saved one genre)
  const displayGenre = Array.isArray(book.genre) ? book.genre.join(', ') : book.genre || 'N/A';
  
  return (
    <DetailContainer>
      <ContentWrapper>
        <BookHeader>
          <CoverImage 
            src={book.coverImage || 'https://via.placeholder.com/250x350/ffc0cb/ffffff?text=No+Cover'} 
            alt={`Cover of ${book.title}`} 
          />
          <BookInfo>
            <Title>{book.title}</Title>
            <Author>By {book.author}</Author>
            
            <RatingWrapper>
              {/* Uses safeRating (which is 0 if undefined) */}
              <Stars>{renderStars(safeRating)}</Stars>
              <MetaData>({displayRating} / 5.0)</MetaData>
              <ReviewCount>
                 {reviewCount} Reviews
              </ReviewCount>
            </RatingWrapper>
            
            {/* 🚨 FIX 2: Use the safe displayGenre variable */}
            <MetaData>Genre(s): <strong>{displayGenre}</strong></MetaData>
            <MetaData>Published: <strong>{book.publicationYear}</strong></MetaData>
            <MetaData>ISBN: <strong>{book.isbn || 'N/A'}</strong></MetaData>
            
            {userInfo && ( // Only show buttons if logged in
                <ActionButtons>
                  <ActionButton to={`/submitreview/${bookId}`} $primary>
                    <FaUserEdit /> Write a Review
                  </ActionButton>
                  <ActionButton to={`/books/${bookId}/discuss`}> 
                    <FaCommentDots /> Discuss
                  </ActionButton>
                </ActionButtons>
            )}
            
          </BookInfo>
        </BookHeader>
        
        <Description>{book.description}</Description>

        <ReviewSection>
          <SectionHeading>Community Reviews ({reviewCount})</SectionHeading>
          
          <ReviewList>
            {reviewCount > 0 ? (
                book.reviews.map((review) => (
                    <ReviewCard key={review._id}>
                        <ReviewCardHeader>
                            <ReviewerInfo>
                                {/* Access user.username from the populated review object */}
                                <FaUserCircle /> {review.user?.username || 'Archived User'}
                            </ReviewerInfo>
                            <ReviewRating>
                                {renderStars(review.rating)}
                            </ReviewRating>
                        </ReviewCardHeader>
                        <ReviewHeadline>{review.headline}</ReviewHeadline>
                        <ReviewText>{review.text}</ReviewText>
                    </ReviewCard>
                ))
            ) : (
                <p style={{color: '#999'}}>Be the first to review **{book.title}**!</p>
            )}
          </ReviewList>
        </ReviewSection>
        
      </ContentWrapper>
    </DetailContainer>
  );
};

export default BookDetails;