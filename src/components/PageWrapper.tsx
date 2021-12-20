import React, { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

const PageWrapper: React.FC = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user && !auth?.isLoading) {
      router.push('/login');
    }
  }, [auth?.user, auth?.isLoading]);

  if (auth.isLoading) {
    <Stack width='100%' height='101vh' direction="column">
      <CircularProgress />
    </Stack>
  }

  return (
    <Stack width='100%' height='101vh' direction="column">
      {children}
    </Stack>
  )
};

export default PageWrapper;
