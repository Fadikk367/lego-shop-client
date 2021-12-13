import React from 'react';

import Stack from '@mui/material/Stack';

const PageWrapper: React.FC = ({ children }) => {
  return (
    <Stack width='100%' height='100vh' direction="column">
      {children}
    </Stack>
  )
};

export default PageWrapper;
