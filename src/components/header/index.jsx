import styled from "@emotion/styled"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
`

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  return (
    <HeaderWrapper position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: "#ffffff", fontWeight: "bold" }}>
            Surplus+
          </Link>
        </Typography>

        <NavLinks>
          {isLoggedIn ? (
            <>
              <Button onClick={handleLogout} style={{ color: "#ffffff", fontWeight: "bold" }}>
                로그아웃
              </Button>
              <Button
                component={Link}
                to="/profile"
                style={{ color: "#ffffff", fontWeight: "bold" }}
              >
                프로필
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" style={{ color: "#ffffff", fontWeight: "bold" }}>
                로그인
              </Button>
              <Button
                color="#fff"
                component={Link}
                to="/signup"
                style={{ color: "#ffffff", fontWeight: "bold" }}
              >
                회원가입
              </Button>
              <Button
                color="#fff"
                component={Link}
                to="/create-store"
                style={{ color: "#ffffff", fontWeight: "bold" }}
              >
                상점 등록
              </Button>
            </>
          )}
        </NavLinks>
      </Toolbar>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled(AppBar)`
  position: fixed;
  top: 0;
  margin-bottom: 20px;
`
