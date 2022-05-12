type statusType = 'success' | 'failure';

export class ResponseViewModel<T> {
  public status: statusType = 'success';
  public message?: string = '';
  public data?: T | undefined = undefined;
}
