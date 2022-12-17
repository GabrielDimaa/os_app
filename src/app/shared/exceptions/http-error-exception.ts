export default class HttpErrorException implements Error {
  name: string = "HttpErrorException";
  stack?: string;
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}
