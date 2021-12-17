import { AxiosResponse } from 'axios';
import axios from './index';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  minifigures: number;
  elements: number;
}

class ProductApi {
  async getOne(productId: number): Promise<Product> {
    const res = await axios.get<Product>(`/products/${productId}`);
    return res.data;
  }

  async getAll(): Promise<Product[]> {
    const res = await axios.get<Product[]>('/products');
    return res.data;
  }

  async add(categoryName: string): Promise<Product> {
    const res = await axios.post<{ name: string }, AxiosResponse<Product>>('/products', { names: categoryName });
    return res.data;
  }

  async rate(productId: number, userId: number, value: number): Promise<Product> {
    const res = await axios.post<{ name: string }, AxiosResponse<Product>>(`/products/${productId}/rate`, { userId, value });
    return res.data;
  }

  async mostRated(): Promise<Product[]> {
    const res = await axios.get<Product[]>(`/products/most-rated`);
    return res.data;
  }

  async alsoBought(productId: number): Promise<Product[]> {
    const res = await axios.get<Product[]>(`/products/${productId}/also-bought`);
    return res.data;
  }
}

export default new ProductApi();