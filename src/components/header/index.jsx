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
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Surplus+
          </Link>
        </Typography>

        <NavLinks>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                로그아웃
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                프로필
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                로그인
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                회원가입
              </Button>
              <Button color="inherit" component={Link} to="/create-store">
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
