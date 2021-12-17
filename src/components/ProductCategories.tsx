import React, {useEffect, useState} from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import axios from '../api';
import categoryApi from '../api/Category';
import { useQuery } from 'react-query';

interface Category {
  id: number;
  name: string;
}

const ProductCategories = () => {
  const { isLoading, data: categories } = useQuery('categories', categoryApi.getAll, { cacheTime: 5 });

  const categoryItems = categories ? categories.map(category => (
    <React.Fragment key={category.id}>
      <Divider />
      <ListItemButton onClick={() => console.log({category})}>
        <ListItemText primary={category.name} />
      </ListItemButton>
    </React.Fragment>
  )) : null;

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <List
          sx={{ width: 300, bgcolor: 'background.paper' }}
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Categories
            </ListSubheader>
          }
        >
          {categoryItems}
        </List>
      )}
    </>
  )
}

export default ProductCategories;
