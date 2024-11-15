import styled from "@emotion/styled"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"

const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`

const SignupPage = () => {
  const [userName, setUserName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = () => {
    const requestData = {
      email,
      password,
      userName,
      phoneNumber,
    }

    console.log("Signup Data:", requestData)

    fetch("/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("회원가입 성공:", data)
      })
      .catch((error) => {
        console.error("회원가입 실패:", error)
      })
  }

  return (
    <Container maxWidth="sm">
      <FormWrapper>
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <TextField
          label="이름"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="휴대전화"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
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
        <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
          회원가입
        </Button>
      </FormWrapper>
    </Container>
  )
}

export default SignupPage
