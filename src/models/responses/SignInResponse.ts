export interface IValidateMobileNumberResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  phone: string;
  nonce: string;
}

export interface ICountryListResponse {
  id: number;
  flag: string;
  name: string;
  code: string;
}

export interface IValidateOtpResponseNew {
  user: string;
  token: string;
}

export interface ILogoutResponse {
  status: string;
  message: string;
}

export interface ICommonResponse {
  status: string;
  message: string;
}
export interface IValidateOtpResponse {
  phone: string;
  nonce: string | undefined;
  countryCode: string;
}
