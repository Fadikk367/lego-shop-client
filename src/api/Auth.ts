import { AxiosResponse } from 'axios';
import axios from './index';

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

class AuthApi {
  async login(credentials: Credentials): Promise<User> {
    const res = await axios.post<Credentials, AxiosResponse<User>>('/users/login', credentials);
    return res.data;
  }

  async register(userData: UserData): Promise<User> {
    const res = await axios.post<UserData, AxiosResponse<User>>('/users/register', userData);
    return res.data;
  }
}

export default new AuthApi();