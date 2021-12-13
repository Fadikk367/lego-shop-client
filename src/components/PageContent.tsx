import React from 'react';

import Stack from '@mui/material/Stack';

const PageContent: React.FC = ({ children }) => {
  return (
    <Stack width="1400px" flex={1} marginX="auto" paddingY="20px">
      {children}
    </Stack>
  )
}

export default PageContent;
