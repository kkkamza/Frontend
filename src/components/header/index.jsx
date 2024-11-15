import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
`;

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: '#ffffff' , fontWeight: 'bold'}}>
            Surplus+
          </Link>
        </Typography>

        <NavLinks>
          {isLoggedIn ? (
            <>
              <Button  onClick={handleLogout} style={{ color: '#ffffff' , fontWeight: 'bold'}}>
                로그아웃
              </Button>
              <Button component={Link} to="/profile" style={{ color: '#ffffff' , fontWeight: 'bold'}}>
                프로필
              </Button>
            </>
          ) : (
            <>
              <Button  component={Link} to="/login" style={{ color: '#ffffff', fontWeight: 'bold' }}>
                로그인
              </Button>
              <Button color='#fff' component={Link} to="/signup" style={{ color: '#ffffff' , fontWeight: 'bold' }}>
                회원가입
              </Button>
              <Button color='#fff' component={Link} to="/create-store" style={{ color: '#ffffff' , fontWeight: 'bold'}}>
              상점 등록
               </Button>
            </>
          )}
        </NavLinks>
      </Toolbar>
    </AppBar>
  );
};

export default Header;