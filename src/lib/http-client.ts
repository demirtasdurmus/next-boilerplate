import { TErrorResponse } from '@/app/api/_utils/build-error-response.util';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(public apiPrefix: string = '/api') {
    this.axiosInstance = axios.create({
      baseURL: `http://localhost:3000/${apiPrefix}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async fetch<T>(config: AxiosRequestConfig) {
    try {
      return await this.axiosInstance<T>(config);
    } catch (err: any) {
      if (err.response) {
        const error = err.response.data as TErrorResponse;
        throw new Error(error.errorMessage);
      }
      throw err;
    }
  }

  public async get<T>(config: Omit<AxiosRequestConfig, 'method'>) {
    return this.fetch<T>({ ...config, method: 'GET' });
  }
}
