export abstract class BaseApiService {
  protected readonly serviceUrl: string;
  constructor(serviceUrl: string) {
    this.serviceUrl = serviceUrl;
  }

  protected getUrlPath = (path: string): string => {
    return `${this.serviceUrl || ''}/${path || ''}`;
  };
}
