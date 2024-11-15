import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || { selectedItems: [] };

  const handlePayment = () => {
 
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  
    const donationAmount = Math.floor(totalAmount * 0.1); 

   
    const currentDonation = parseInt(localStorage.getItem('donationAmount') || '0', 10);

   
    const updatedDonation = currentDonation + donationAmount;
    localStorage.setItem('donationAmount', updatedDonation);

 
    alert('결제가 완료되었습니다!');
    console.log('결제 정보:', selectedItems);


    navigate('/main');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={4} bgcolor="white">
        <Typography variant="h4" gutterBottom align="center">
          결제 페이지
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <List>
          {selectedItems.map((item, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={<Typography variant="h6">{item.itemName} - {item.quantity}개</Typography>}
                secondary={<Typography variant="body2" color="textSecondary">총 가격: {item.totalPrice.toLocaleString()}원</Typography>}
              />
            </ListItem>
          ))}
        </List>

        <Divider style={{ margin: '20px 0' }} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: '15px', padding: '10px 0', fontSize: '16px' }}
          onClick={handlePayment}
        >
          결제하기
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ padding: '10px 0', fontSize: '16px' }}
          onClick={handleBack}
        >
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentPage;