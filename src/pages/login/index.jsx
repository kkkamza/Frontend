import styled from "@emotion/styled"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    const requestData = { email, password }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        setIsLoggedIn(true) // 로그인 성공 시 상태 업데이트
        navigate("/main") // 메인 페이지로 이동
      } else {
        alert("로그인에 실패했습니다. 다시 시도해 주세요.")
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.")
      console.error(error)
    }
  }

  return (
    <Container maxWidth="sm">
      <FormWrapper>
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField
          label="이메일"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          로그인
        </Button>
      </FormWrapper>
    </Container>
  )
}

export default LoginPage
