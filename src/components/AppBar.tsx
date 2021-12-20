import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image'
import {useRouter} from 'next/router';
import useOrder from '../hooks/useOrder';
import useAuth from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const router = useRouter();
  const order = useOrder();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  }

  return (
    <AppBar position='static'>
      <Stack direction="row" justifyContent="space-between" padding="10px" alignItems="center" width="1400px" marginX="auto">
        <Box sx={{ cursor: 'pointer', padding: 0, width: '56px', height: '56px' }}>
          <Image 
            src="/lego.png" 
            alt="me" 
            width="100%" 
            height="100%" 
            onClick={() => router.push('/')}
          />
        </Box>
        <Stack direction="row" alignItems="center" columnGap={2}>
          <IconButton onClick={() => router.push('/cart')}>
            <Badge badgeContent={order.items.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={() => router.push('/profile')}>
            <PersonIcon />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Stack>
    </AppBar>
  )
};

export default Navigation;
