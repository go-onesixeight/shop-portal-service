export interface IResponse {
  result: boolean;
  statusCode: number;
  statusMessage: string;
  data?: any;
}

export interface IThrowError {
  statusCode: number;
  statusMessage?: string;
  code?: string;
  error?: Array<any>;
}


export interface IFromResponses {
  result: boolean;
  statusCode: number;
  statusMessage: string;
  data?: Array<any>;
  error?: Array<any>;
}
