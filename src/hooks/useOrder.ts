import {useContext} from 'react';

import { OrderContext } from '../providers/OrderProvider';

const useOrder = () => {
  const orderContext = useContext(OrderContext);

  if (!orderContext) {
    throw new Error('OrderContext has not been initialized');
  }

  return orderContext;
};

export default useOrder;
