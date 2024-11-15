import styled from "@emotion/styled"
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const MainWrapper = styled.div`
  padding: 80px 30px
  background-color: #f9f9f9;
`

const SearchSection = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 50px 0;
`

const StoreSection = styled(Box)`
  margin-top: 60px;
`

const EmphasizedDonationSection = styled(Paper)`
  text-align: center;
  padding: 40px;
  margin: 50px 0;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`

const MainPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [stores, setStores] = useState([])
  const [donationAmount, setDonationAmount] = useState(0)

  useEffect(() => {
    const exampleStores = [
      { id: 1, name: "상점 1", mainItems: "야채, 과일", rating: 4.5 },
      { id: 2, name: "상점 2", mainItems: "빵, 음료", rating: 4.2 },
      { id: 3, name: "상점 3", mainItems: "유제품, 고기", rating: 4.7 },
    ]
    setStores(exampleStores)

    const storedDonation = parseInt(localStorage.getItem("donationAmount") || "0", 10)
    setDonationAmount(storedDonation)
  }, [])

  const handleSearch = async () => {
    navigate(`/food/search?query=${searchQuery}`)
  }

  return (
    <Container maxWidth="lg">
      <MainWrapper>
        <Box mt={16} mb={6}>
          <TitleWrappper
            variant="h2"
            align="center"
            gutterBottom
            style={{
              marginTop: "32px",
              fontFamily: "RiaSans-ExtraBold",
              color: "#4caf50",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            잉여잉여
          </TitleWrappper>
        </Box>
        <Typography
          variant="body1"
          align="center"
          style={{ marginBottom: "64px", fontSize: "1.2rem", lineHeight: 1.5 }}
        >
          당신의 구매가 기부로 연결됩니다.
        </Typography>

        {/* Donation Section */}
        <EmphasizedDonationSection elevation={3}>
          <Typography variant="h4" color="primary" gutterBottom style={{ fontWeight: "bold" }}>
            누적 기부량
          </Typography>
          <Typography variant="h3" color="secondary" style={{ fontWeight: 700 }}>
            {donationAmount.toLocaleString()}원
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontWeight: 500 }}>
            함께 더 나은 세상을 만들어 나가요!
          </Typography>
        </EmphasizedDonationSection>

        {/* Search Section */}
        <Box mt={16} mb={16}>
          <SearchSection>
            <TextField
              label="물품 검색"
              variant="outlined"
              fullWidth
              style={{ maxWidth: "600px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              검색
            </Button>
          </SearchSection>
        </Box>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <StoreSection>
            <Typography variant="h5" gutterBottom>
              검색 결과
            </Typography>
            <Grid container spacing={4}>
              {searchResults.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.foodId}>
                  <Paper style={{ padding: "20px", borderRadius: "8px" }} elevation={2}>
                    <Typography variant="h6">{item.foodName}</Typography>
                    <Typography variant="body2">상점 이름: {item.marketId}</Typography>
                    <Typography variant="body2">별점: {item.star}점</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </StoreSection>
        )}

        <Box mt={6} mb={4}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            상점목록보기
          </Typography>
        </Box>
        <List>
          {stores.map((store) => (
            <ListItem key={store.id} divider>
              <ListItemAvatar>
                <Avatar
                  alt={store.name}
                  src={store.imageUrl || "https://via.placeholder.com/150"}
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
                style={{ marginLeft: "16px" }}
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
  )
}

export default MainPage

const TitleWrappper = styled(Typography)`
  @font-face {
    font-family: "RiaSans-ExtraBold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/RiaSans-ExtraBold.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`
