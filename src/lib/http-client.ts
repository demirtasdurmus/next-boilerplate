import { TErrorResponse } from '@/app/api/_utils/build-error-response.util';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IHttpClientConfig {
  modulePrefix: string;
  apiPrefix?: string;
}

export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(public config: IHttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: `http://localhost:3000/${this.config.apiPrefix ?? 'api'}/${
        this.config.modulePrefix
      }`,
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

  public async post<T>(config: Omit<AxiosRequestConfig, 'method'>) {
    return this.fetch<T>({ ...config, method: 'POST' });
  }

  public async put<T>(config: Omit<AxiosRequestConfig, 'method'>) {
    return this.fetch<T>({ ...config, method: 'PUT' });
  }

  public async delete<T>(config: Omit<AxiosRequestConfig, 'method'>) {
    return this.fetch<T>({ ...config, method: 'DELETE' });
  }

  public async patch<T>(config: Omit<AxiosRequestConfig, 'method'>) {
    return this.fetch<T>({ ...config, method: 'PATCH' });
  }
}
