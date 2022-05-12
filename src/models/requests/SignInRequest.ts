export interface IValidateMobileNumberRequest {
  phone: string;
  countryCode: string;
}

export interface IValidateOtpRequest {
  phone: string;
  countryCode: string;
  nonce: string;
  otp: string;
  premiumId?: string;
}

export interface IValidateOtpPinRequest {
  premiumId: string;
  otp: string;
}

export interface ILogOutRequest {
  userId: string;
  rcToken: string;
  fcmToken: string;
}
