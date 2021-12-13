import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

const ProductCategories = () => {
  const categories = [
    'Creator Expert',
    'City',
    'Architecture',
    'Technic',
    'Marvel'
  ];

  return (
    <List
      sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }
    >
      {categories.map(category => (
        <React.Fragment key={category}>
          <Divider />
          <ListItemButton>
            <ListItemText primary={category} />
          </ListItemButton>
        </React.Fragment>
      ))}
    </List>
  )
}

export default ProductCategories;
