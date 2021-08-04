
/**
 * Exceção padrão lançada pela API
 */
export default class ApiError {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
