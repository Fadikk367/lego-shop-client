import { AxiosResponse } from 'axios';
import axios from './index';

export interface Category {
  id: number;
  name: string;
}

class CategoriesApi {
  async getAll(): Promise<Category[]> {
    const res = await axios.get<Category[]>('/categories');
    return res.data;
  }

  async add(categoryName: string): Promise<Category> {
    const res = await axios.post<{ name: string }, AxiosResponse<Category>>('/categories', { name: categoryName });
    return res.data;
  }
}

export default new CategoriesApi();