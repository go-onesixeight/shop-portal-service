export interface IFromResponses {
  result: boolean;
  statusCode: number;
  statusMessage: string;
  data?: Array<any>;
  error?: Array<any>;
}

export interface ISendMail {
  email: string;
  text: string;
  subject: string;
  html: string;
}
