import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image'
import {useRouter} from 'next/router';

const Navigation: React.FC = () => {
  const router = useRouter();

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
        <IconButton onClick={() => router.push('/cart')}>
          <ShoppingCartIcon />
        </IconButton>
      </Stack>
    </AppBar>
  )
};

export default Navigation;
