import { AxiosResponse } from 'axios';
import axios from './index';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  elements: number;
  minifigures: number;
  imageUrl: string;
  rate?: number | null;
}

export interface Order {
  id: number;
  time: number;
  products: Product[];
}

class OrderApi {
  async placeOrder(userId: number, products: Product[]): Promise<Order> {
    const res = await axios.post<any, AxiosResponse<Order>>('/orders', {userId, products});
    return res.data;
  }

  async getHistory(userId: number): Promise<Order[]> {
    const res = await axios.get<any, AxiosResponse<Order[]>>(`/orders/history?user=${userId}`);
    return res.data;
  }
}

export default new OrderApi();