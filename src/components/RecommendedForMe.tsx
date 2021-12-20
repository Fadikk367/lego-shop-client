import React from 'react';
import { useQuery } from 'react-query';

import RecommendedProducts from './RecommendedProducts';

import productApi from '../api/Product';

interface RecommendedForMeProps {
  userId: number;
}

const RecommendedForMe: React.FC<RecommendedForMeProps> = ({ userId }) => {
  const {isLoading, data: products} = useQuery('recommended-for-me', () => productApi.recommendedForMe(userId), { cacheTime: 5 });
  console.log({isLoading, products});
  return (
    <>
      {!isLoading && products ? <RecommendedProducts title="Recommended for you:" products={products} itemWidth={270}/> : null}
    </>
  );
}

export default RecommendedForMe;
