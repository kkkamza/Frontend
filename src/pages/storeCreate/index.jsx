import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Tabs, Tab, Box, MenuItem } from '@mui/material';
import styled from 'styled-components';

const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const CreateStorePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // 상점 등록 상태
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 잉여 식량 등록 상태
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  // 복지시설 기부 상태
  const [selectedOrganization, setSelectedOrganization] = useState('');

  // 상태 플래그
  const [isStoreRegistered, setIsStoreRegistered] = useState(false);
  const [isFoodRegistered, setIsFoodRegistered] = useState(false);

  const handleTabChange = (event, newValue) => {
    if (newValue === 1 && !isStoreRegistered) {
      alert('상점 등록을 먼저 완료해 주세요.');
      return;
    }
    if (newValue === 2 && !isFoodRegistered) {
      alert('잉여 식량 등록을 먼저 완료해 주세요.');
      return;
    }
    setActiveTab(newValue);
  };

  // 상점 등록 API 호출
  const handleCreateStore = async () => {
    try {
      const response = await fetch('/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_AUTH_TOKEN`,
        },
        body: JSON.stringify({
          Name: storeName,
          Address: storeAddress,
          phoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) throw new Error('상점 등록에 실패했습니다.');
      const data = await response.json();
      alert('상점이 성공적으로 등록되었습니다.');
      console.log('등록 성공:', data);
      setIsStoreRegistered(true);
      setActiveTab(1);
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 잉여 식량 등록 API 호출
  const handleRegisterFood = async () => {
    try {
      const imageUrl = photo ? URL.createObjectURL(photo) : '';

      const response = await fetch('/food/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_AUTH_TOKEN`,
        },
        body: JSON.stringify({
          Name: foodName,
          Price: parseInt(price, 10),
          ImageUrl: imageUrl,
          Description: description,
          ExpirationDate: expirationDate,
          number: parseInt(quantity, 10),
        }),
      });

      if (!response.ok) throw new Error('잉여 식량 등록에 실패했습니다.');
      const data = await response.json();
      alert('잉여 식량이 성공적으로 등록되었습니다.');
      console.log('등록 성공:', data);
      setIsFoodRegistered(true);
      setActiveTab(2);
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 복지시설 기부 API 호출
  const handleDonateFood = async () => {
    try {
      const response = await fetch('/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_AUTH_TOKEN`,
        },
        body: JSON.stringify({
          organization: selectedOrganization,
        }),
      });

      if (!response.ok) throw new Error('기부 요청에 실패했습니다.');
      const data = await response.json();
      alert('기부 요청이 성공적으로 처리되었습니다.');
      console.log('기부 성공:', data);
    } catch (error) {
      alert('기부 요청 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 기부하지 않음 버튼 핸들러
  const handleSkipDonation = () => {
    alert('기부 없이 진행합니다.');
    // 이후 처리할 로직 추가 가능 (예: 완료 페이지로 이동)
    console.log('기부를 건너뜀');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        상점 관리
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="상점 등록" />
        <Tab label="잉여 식량 등록" />
        <Tab label="복지시설 기부" />
      </Tabs>

      {/* 상점 등록 */}
      {activeTab === 0 && (
        <FormWrapper>
          <Typography variant="h5">상점 등록</Typography>
          <TextField
            label="상점 이름"
            variant="outlined"
            fullWidth
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <TextField
            label="상점 주소"
            variant="outlined"
            fullWidth
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />
          <TextField
            label="전화번호"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCreateStore}>
            등록
          </Button>
        </FormWrapper>
      )}

      {/* 잉여 식량 등록 */}
      {activeTab === 1 && (
        <FormWrapper>
          <Typography variant="h5">잉여 식량 등록</Typography>
          <TextField
            label="식량 이름"
            variant="outlined"
            fullWidth
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <TextField
            label="가격"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="수량"
            variant="outlined"
            fullWidth
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            label="상세설명"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="유통기한"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
          <Button variant="contained" component="label">
            사진 업로드
            <input type="file" hidden onChange={(e) => setPhoto(e.target.files[0])} />
          </Button>
          <Button variant="contained" color="primary" onClick={handleRegisterFood}>
            등록
          </Button>
        </FormWrapper>
      )}

      {/* 복지시설 기부 */}
      {activeTab === 2 && (
        <FormWrapper>
          <Typography variant="h5">복지시설 기부</Typography>
          <TextField
            select
            label="복지시설 선택"
            variant="outlined"
            fullWidth
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
          >
            <MenuItem value="organization1">복지시설 1</MenuItem>
            <MenuItem value="organization2">복지시설 2</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={handleDonateFood}>
            기부 요청
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleSkipDonation} style={{ marginTop: '10px' }}>
            기부하지 않음
          </Button>
        </FormWrapper>
      )}
    </Container>
  );
};

export default CreateStorePage;