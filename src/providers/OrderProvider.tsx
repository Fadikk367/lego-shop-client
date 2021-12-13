import { createContext, useState } from 'react'

interface Product {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  id: number;
  minifigures: number;
  elements: number;
}

interface OrderProviderValue {
  items: Product[];
  addToCart(item: Product): void;
  removeFromCart(itemId: number): void;
  placeOrder(): Promise<void>;
}

export const OrderContext = createContext<OrderProviderValue | undefined>(undefined);

const OrderProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (item: Product): void => {
    const isAlreadyInCart = items.some(cartItem => cartItem.id === item.id);

    if (!isAlreadyInCart) {
      setItems(prev => [...prev, item]);
    }
  }

  const removeFromCart = (itemId: number): void => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }

  const placeOrder = async (): Promise<void> => {
    console.log('PLACE ORDER', items);
  }

  return (
    <OrderContext.Provider value={{items, addToCart, removeFromCart, placeOrder}}>
      {children}
    </OrderContext.Provider>
  )
};

export default OrderProvider;
