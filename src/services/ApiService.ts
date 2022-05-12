import axios from 'axios';
import {BASE_URL} from '@env';
import {localStrings} from '../localization';
import {ResponseViewModel} from '../models/responses';
import {apiErrors, ToastMessage} from '../utils';
interface IAxiosErrorResponse {
  status: string;
  message: string;
}
interface IAxiosError {
  response: IAxiosErrorResponse;
  message?: string;
}

export class ApiService {
  private static _instance: ApiService;
  private readonly API_ENDPOINT: string | undefined;

  private constructor() {
    this.API_ENDPOINT = BASE_URL || '';
  }

  public static get instance(): ApiService {
    if (ApiService._instance == null) {
      ApiService._instance = new ApiService();
    }
    return ApiService._instance;
  }

  public init = (
    errorCallback: (statusCode: string) => void,
    loadingCallback: (really: boolean) => void,
    startLoading: (really: boolean) => void,
  ): void => {
    axios.defaults.baseURL = this.API_ENDPOINT;
    axios.defaults.withCredentials = true;
    // Override timeout default for the library
    // Now all requests using this instance will wait 1 min before timing out
    axios.defaults.timeout = 1 * 60 * 1000;
    axios.defaults.headers = {
      'content-type': 'application/json',
    };
    axios.interceptors.request.use(
      config => {
        startLoading(true);
        return config;
      },
      (error: IAxiosError) => {
        loadingCallback(false);
        const errorPromise = Promise.reject(error);
        if (error && error.response && error.response.status) {
          apiErrors(error.response);
          errorCallback(error.response.status);
        } else if (
          error &&
          error?.message &&
          error?.message === 'Network Error'
        ) {
          ToastMessage.showToast(localStrings.noInternet, localStrings.error);
        }
        return errorPromise;
      },
    );
    axios.interceptors.response.use(
      response => {
        loadingCallback(false);
        return response;
      },
      (error: IAxiosError) => {
        loadingCallback(false);
        const errorPromise = Promise.reject(error);
        if (error && error.response && error.response.status) {
          apiErrors(error.response);
          errorCallback(error.response.status);
        } else if (
          error &&
          error?.message &&
          error?.message === 'Network Error'
        ) {
          ToastMessage.showToast(localStrings.noInternet, localStrings.error);
        }
        return errorPromise;
      },
    );
  };

  public checkConnection() {
    // return NetInfo.fetch().then(async state => {
    //   if (!state?.isConnected) {
    //     // ToastMessage.showToast(
    //     //   STATUS_CODES.INTERNAL_SERVER_ERROR,
    //     //   localStrings.noInternet,
    //     //   'error',
    //     // );
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    return true;
  }

  public get = async <T>(
    url: string,
    showLoader: boolean = true,
  ): Promise<ResponseViewModel<T>> => {
    try {
      const internetAvailable = await this.checkConnection();
      if (internetAvailable) {
        const response = await axios.get(url);
        return response.data;
      }
    } catch (e: any) {
      if (e.response) {
        apiErrors(e.response.data);
        return Promise.reject(e.response.data);
      } else if (e.request) {
        // The request was made but no response was received
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject('No Internet Connection');
      }
    }
  };

  public post = async <Req, Res>(
    url: string,
    body: Req,
    showLoader: boolean = true,
    hideToast?: boolean,
  ): Promise<ResponseViewModel<Res>> => {
    try {
      const internetAvailable = await this.checkConnection();
      if (internetAvailable) {
        const response = await axios.post<ResponseViewModel<Res>>(url, body);
        return response.data;
      }
    } catch (e: any) {
      apiErrors(e.response.data, hideToast);
      return Promise.reject(e.response.data);
    }
  };

  public postDocument = async <Req, Res>(
    url: string,
    body: Req,
  ): Promise<ResponseViewModel<Res>> => {
    try {
      const internetAvailable = await this.checkConnection();
      if (internetAvailable) {
        const response = await axios.post<ResponseViewModel<Res>>(url, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }
    } catch (e: any) {
      apiErrors(e.response.data);
      return Promise.reject(e.response.data);
    }
  };

  public put = async <Req, Res>(
    url: string,
    body: Req,
    showLoader: boolean = true,
  ): Promise<ResponseViewModel<Res>> => {
    try {
      const internetAvailable = await this.checkConnection();
      if (internetAvailable) {
        const response = await axios.put<ResponseViewModel<Res>>(
          url,
          JSON.stringify(body),
        );
        return response.data;
      }
    } catch (e: any) {
      return Promise.reject(e);
    }
  };
}
