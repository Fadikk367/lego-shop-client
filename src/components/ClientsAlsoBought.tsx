import React from 'react';
import { useQuery } from 'react-query';

import RecommendedProducts from './RecommendedProducts';

import productApi from '../api/Product';

interface ClientsAlsoBoughtProps {
  productId: number;
}

const ClientsAlsoBought: React.FC<ClientsAlsoBoughtProps> = ({ productId }) => {
  const {isLoading, data: products} = useQuery(`products-also-bought-${productId}`, () => productApi.alsoBought(productId), { cacheTime: 5 });
  return (
    <>
      {!isLoading && products ? <RecommendedProducts title="Clients also bought:" products={products} itemWidth={270}/> : null}
    </>
  );
}

export default ClientsAlsoBought;
