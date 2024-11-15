import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const StoreDetailPage = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState({})
  const [activeTab, setActiveTab] = useState(0)
  const [star, setStar] = useState(0)
  const [description, setDescription] = useState("")

  useEffect(() => {
    const exampleStore = {
      id: storeId,
      name: `상점 ${storeId}`,
      address: "서울특별시 예제구 예제로 123",
      phoneNumber: "010-1234-5678",
      rating: 4.5,
      items: [
        {
          id: 1,
          name: "사과",
          price: 1000,
          imageUrl: "https://example.com/apple.jpg",
          description: "신선한 사과입니다.",
          expirationDate: "2024-12-01",
          number: 10,
        },
        {
          id: 2,
          name: "배",
          price: 2000,
          imageUrl: "https://example.com/pear.jpg",
          description: "달콤한 배입니다.",
          expirationDate: "2024-12-05",
          number: 5,
        },
        {
          id: 3,
          name: "당근",
          price: 500,
          imageUrl: "https://example.com/carrot.jpg",
          description: "유기농 당근입니다.",
          expirationDate: "2024-11-30",
          number: 20,
        },
      ],
    }
    setStore(exampleStore)
    setItems(exampleStore.items)
  }, [storeId])

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }))
  }

  const handleProceedToPayment = () => {
    const purchaseDetails = Object.entries(selectedItems).map(([itemId, quantity]) => {
      const item = items.find((item) => item.id === parseInt(itemId, 10))
      return {
        itemName: item.name,
        quantity,
        totalPrice: item.price * quantity,
      }
    })

    navigate("/payment", { state: { selectedItems: purchaseDetails } })
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`/store/${storeId}/review`, {
        // fetch URL 수정
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_AUTH_TOKEN",
        },
        body: JSON.stringify({ star, description }),
      })

      if (!response.ok) {
        throw new Error("리뷰 등록에 실패했습니다.")
      }

      alert("리뷰가 성공적으로 등록되었습니다!")
      setStar(0)
      setDescription("")
    } catch (error) {
      console.error(error)
      alert("리뷰 등록 중 오류가 발생했습니다.")
    }
  }

  return (
    <Container maxWidth="md">
      {store && (
        <>
          {/* 상점 정보 섹션 */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom>
              {store.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              주소: {store.address}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              전화번호: {store.phoneNumber}
            </Typography>
            <Rating value={store.rating} readOnly precision={0.5} style={{ marginTop: "10px" }} />
          </Box>

          {/* 탭 버튼 섹션 */}
          <Box mb={3}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="물건 정보" />
              <Tab label="리뷰" />
            </Tabs>
          </Box>

          {/* 물건 정보 탭 */}
          {activeTab === 0 && (
            <>
              <Typography variant="h5" gutterBottom>
                판매 중인 물건들
              </Typography>
              <Grid container spacing={3} style={{ marginTop: "10px" }}>
                {items.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <Card>
                      <CardContent style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "8px",
                            marginRight: "20px",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            style={{ fontWeight: "bold", marginBottom: "8px" }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: "6px" }}>
                            가격: {item.price.toLocaleString()}원
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ marginBottom: "6px" }}
                          >
                            설명: {item.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ marginBottom: "6px" }}
                          >
                            유통기한: {item.expirationDate}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ marginBottom: "10px" }}
                          >
                            재고: {item.number}개
                          </Typography>
                          <TextField
                            type="number"
                            label="수량"
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputProps={{ min: 1, max: item.number }}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value, 10))
                            }
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
                  결제 페이지로 이동
                </Button>
              </Box>
            </>
          )}

          {/* 리뷰 탭 */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                리뷰 작성
              </Typography>
              <Rating
                value={star}
                onChange={(event, newValue) => setStar(newValue)}
                precision={1}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="리뷰 내용"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
                리뷰 등록
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default StoreDetailPage
