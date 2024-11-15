import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainWrapper = styled.div`
  padding: 80px 30px
  background-color: #f9f9f9;
`;

const SearchSection = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 50px 0; 
`;

const StoreSection = styled(Box)`
  margin-top: 60px;
`;

const EmphasizedDonationSection = styled(Paper)`
  text-align: center;
  padding: 40px; 
  margin: 50px 0; 
  background-color: #ffecb3;
  border-radius: 12px;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [stores, setStores] = useState([]);
  const [donationAmount, setDonationAmount] = useState(0);

  useEffect(() => {
    const exampleStores = [
      { id: 1, name: '상점 1', mainItems: '야채, 과일', rating: 4.5 },
      { id: 2, name: '상점 2', mainItems: '빵, 음료', rating: 4.2 },
      { id: 3, name: '상점 3', mainItems: '유제품, 고기', rating: 4.7 },
    ];
    setStores(exampleStores);

    const storedDonation = parseInt(localStorage.getItem('donationAmount') || '0', 10);
    setDonationAmount(storedDonation);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch('/food/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('검색에 실패했습니다.');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      alert('검색 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <MainWrapper>
        <Typography variant="h3" align="center" gutterBottom>
          Sur+
        </Typography>
        <Typography variant="body1" align="center">
          당신의 구매가 기부 어쩌구..
        </Typography>

        {/* Donation Section */}
        <EmphasizedDonationSection elevation={3}>
          <Typography variant="h4" color="primary" gutterBottom>
            누적 기부량
          </Typography>
          <Typography variant="h3" color="secondary">
            {donationAmount.toLocaleString()}원
          </Typography>
          <Typography variant="body2" color="textSecondary">
            함께 더 나은 세상을 만들어 나가요!
          </Typography>
        </EmphasizedDonationSection>

        {/* Search Section */}
        <SearchSection>
          <TextField
            label="물품 검색"
            variant="outlined"
            fullWidth
            style={{ maxWidth: '600px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            검색
          </Button>
        </SearchSection>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <StoreSection>
            <Typography variant="h5" gutterBottom>
              검색 결과
            </Typography>
            <Grid container spacing={4}>
              {searchResults.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.foodId}>
                  <Paper style={{ padding: '20px', borderRadius: '8px' }} elevation={2}>
                    <Typography variant="h6">{item.foodName}</Typography>
                    <Typography variant="body2">상점 이름: {item.marketId}</Typography>
                    <Typography variant="body2">별점: {item.star}점</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </StoreSection>
        )}

        {/* Current Stores Section */}
        <Box mt={6} mb={4}>
          <Typography variant="h5" gutterBottom>
            상점목록보기
          </Typography>
        </Box>
        <List>
  {stores.map((store) => (
    <ListItem key={store.id} divider>
      <ListItemAvatar>
        <Avatar
          alt={store.name}
          src={store.imageUrl || 'https://via.placeholder.com/150'}
          style={{ width: 80, height: 80 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6" component="span">
            {store.marketId}
          </Typography>
        }
        secondary={
          <>
            <Typography variant="body2" color="textSecondary" component="span">
              판매 품목: {store.foodId}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span">
              별점: {store.star}점
            </Typography>
          </>
        }
        style={{ marginLeft: '16px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/store/${store.marketId}`)}
      >
        상점 보기
      </Button>
    </ListItem>
  ))}
</List>
      </MainWrapper>
    </Container>
  );
};

export default MainPage;

