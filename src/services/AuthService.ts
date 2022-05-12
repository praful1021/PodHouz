import {
  ILogOutRequest,
  IValidateMobileNumberRequest,
  IValidateOtpRequest,
} from '../models/requests';
import {ResponseViewModel} from '../models/responses';
import {
  IValidateMobileNumberResponse,
  IValidateOtpResponseNew,
  ILogoutResponse,
} from '../models/responses';
import {ApiService} from './ApiService';
import {BaseApiService} from './BaseApiService';

export class AuthenticationService extends BaseApiService {
  private static _instance: AuthenticationService;

  private constructor() {
    super('/user');
    ApiService.instance.init(
      AuthenticationService.onError,
      AuthenticationService.onLoading,
      AuthenticationService.startLoading,
    );
  }

  public static get instance(): AuthenticationService {
    if (AuthenticationService._instance == null) {
      AuthenticationService._instance = new AuthenticationService();
    }
    return AuthenticationService._instance;
  }

  public validateMobileNumber = async (
    request: IValidateMobileNumberRequest,
  ): Promise<ResponseViewModel<IValidateMobileNumberResponse>> => {
    const url = 'validate/requestOtp';

    try {
      const response = await ApiService.instance.post<
        IValidateMobileNumberRequest,
        IValidateMobileNumberResponse
      >(url, request, false);
      return response;
    } catch (err: any) {
      return err;
    }
  };

  public validateOtp = async (
    request: IValidateOtpRequest,
  ): Promise<ResponseViewModel<IValidateOtpResponseNew>> => {
    const url = '/validateOtp';
    try {
      const response = await ApiService.instance.post<
        IValidateOtpRequest,
        IValidateOtpResponseNew
      >(url, request, false);
      return response;
    } catch (err: any) {
      console.log('err in validate otp', err);
      return err;
    }
  };

  public logout = async (
    request: ILogOutRequest,
  ): Promise<ResponseViewModel<ILogoutResponse>> => {
    const url = 'user/logout';

    try {
      const response = await ApiService.instance.post<
        ILogOutRequest,
        ILogoutResponse
      >(url, request);
      return response;
    } catch (err: any) {
      return err;
    }
  };

  private static onError = (errorCode: string): void => {
    console.error('Error in authentication-service: ', errorCode);
  };

  private static onLoading = (isLoading: boolean): void => {
    console.info('loading...', isLoading);
  };

  private static startLoading = (start: boolean): void => {
    console.log('start: ', start);
  };
}
