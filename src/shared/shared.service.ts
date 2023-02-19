import { HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { IFromResponses } from "../common/interfaces";
import * as CryptoJS from "crypto-js";

@Injectable()
export class SharedService {
  async postToAxios(
    url: string,
    body?: any,
    configHeader?: any,
  ): Promise<IFromResponses> {
    return new Promise((resolve, reject) => {
      axios.post(url, body, { headers: configHeader }).then(
        (result) => {
          resolve(result?.data);
        },
        async (error) => {
          try {
            reject(error?.response?.data);
          } catch (error) {
            console.log("error : ", error);
            reject(error);
          }
        },
      );
    });
  }

  async getToAxios(url: string, configHeader?: any): Promise<IFromResponses> {
    return new Promise((resolve, reject) => {
      axios.get(url, { headers: configHeader }).then(
        (result) => {
          resolve(result?.data);
        },
        async (error) => {
          try {
            reject(error?.response?.data);
          } catch (error) {
            console.log("error : ", error);
            reject(error);
          }
        },
      );
    });
  }

  isNotEmptyArray(data: any[]) {
    return Array.isArray(data) && data.length > 0 ? true : false;
  }

  isNotEmptyObject(obj: Object) {
    return typeof obj === "object" && obj && Object.keys(obj).length > 0
      ? true
      : false;
  }

  isEmptyArray(arrr: any[]) {
    return !arrr.length && arrr.length === 0 ? true : false;
  }

  isObjectEmpty(objectName: Object) {
    return objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
      ? false
      : true;
  }

  returnResponse(
    result: boolean,
    statusCode: number,
    statusMessage: string,
    data?: any,
    error?: any,
  ): IFromResponses {
    return {
      result,
      statusCode,
      statusMessage,
      ...(data && { data: data }),
      ...(error && { error: error }),
    };
  }

  encrypt(text: string): string {
    const ciphertext = CryptoJS.AES.encrypt(
      text,
      "5ddfbf69c655ebb22a23621fbf50808b",
    ).toString();
    return ciphertext;
  }

  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
      "5ddfbf69c655ebb22a23621fbf50808b",
    );
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  encryptBase64(text: string) {
    const base = Buffer.from(text).toString("base64");
    return base;
  }

  decryptBase64(text: string) {
    const base = Buffer.from(text, "base64").toString("ascii");
    return base;
  }

  generateRandomPassword(len?: number) {
    const length = len ?? 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  errorMessage(error: any) {
    const { message } = error as { message: string };
    return message;
  }

  statusText(statusCode: number) {
    switch (statusCode) {
      case HttpStatus.CONTINUE:
        return "Continue";
      case HttpStatus.SWITCHING_PROTOCOLS:
        return "Switching Protocols";
      case HttpStatus.PROCESSING:
        return "Processing";
      case HttpStatus.EARLYHINTS:
        return "Early Hints";
      case HttpStatus.OK:
        return "OK";
      case HttpStatus.CREATED:
        return "Created";
      // case StatusAccepted:
      //   return "Accepted"
      // case StatusNonAuthoritativeInfo:
      //   return "Non-Authoritative Information"
      // case StatusNoContent:
      //   return "No Content"
      // case StatusResetContent:
      //   return "Reset Content"
      // case StatusPartialContent:
      //   return "Partial Content"
      // case StatusMultiStatus:
      //   return "Multi-Status"
      // case StatusAlreadyReported:
      //   return "Already Reported"
      // case StatusIMUsed:
      //   return "IM Used"
      // case StatusMultipleChoices:
      //   return "Multiple Choices"
      // case StatusMovedPermanently:
      //   return "Moved Permanently"
      // case StatusFound:
      //   return "Found"
      // case StatusSeeOther:
      //   return "See Other"
      // case StatusNotModified:
      //   return "Not Modified"
      // case StatusUseProxy:
      //   return "Use Proxy"
      // case StatusTemporaryRedirect:
      //   return "Temporary Redirect"
      // case StatusPermanentRedirect:
      //   return "Permanent Redirect"
      case HttpStatus.BAD_REQUEST:
        return "Bad Request";
      // case StatusUnauthorized:
      //   return "Unauthorized"
      // case StatusPaymentRequired:
      //   return "Payment Required"
      // case StatusForbidden:
      //   return "Forbidden"
      // case StatusNotFound:
      //   return "Not Found"
      // case StatusMethodNotAllowed:
      //   return "Method Not Allowed"
      // case StatusNotAcceptable:
      //   return "Not Acceptable"
      // case StatusProxyAuthRequired:
      //   return "Proxy Authentication Required"
      // case StatusRequestTimeout:
      //   return "Request Timeout"
      // case StatusConflict:
      //   return "Conflict"
      // case StatusGone:
      //   return "Gone"
      // case StatusLengthRequired:
      //   return "Length Required"
      // case StatusPreconditionFailed:
      //   return "Precondition Failed"
      // case StatusRequestEntityTooLarge:
      //   return "Request Entity Too Large"
      // case StatusRequestURITooLong:
      //   return "Request URI Too Long"
      // case StatusUnsupportedMediaType:
      //   return "Unsupported Media Type"
      // case StatusRequestedRangeNotSatisfiable:
      //   return "Requested Range Not Satisfiable"
      // case StatusExpectationFailed:
      //   return "Expectation Failed"
      // case StatusTeapot:
      //   return "I'm a teapot"
      // case StatusMisdirectedRequest:
      //   return "Misdirected Request"
      // case StatusUnprocessableEntity:
      //   return "Unprocessable Entity"
      // case StatusLocked:
      //   return "Locked"
      // case StatusFailedDependency:
      //   return "Failed Dependency"
      // case StatusTooEarly:
      //   return "Too Early"
      // case StatusUpgradeRequired:
      //   return "Upgrade Required"
      // case StatusPreconditionRequired:
      //   return "Precondition Required"
      // case StatusTooManyRequests:
      //   return "Too Many Requests"
      // case StatusRequestHeaderFieldsTooLarge:
      //   return "Request Header Fields Too Large"
      // case StatusUnavailableForLegalReasons:
      //   return "Unavailable For Legal Reasons"
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return "Internal Server Error";
      // case StatusNotImplemented:
      //   return "Not Implemented"
      // case StatusBadGateway:
      //   return "Bad Gateway"
      // case StatusServiceUnavailable:
      //   return "Service Unavailable"
      // case StatusGatewayTimeout:
      //   return "Gateway Timeout"
      // case StatusHTTPVersionNotSupported:
      //   return "HTTP Version Not Supported"
      // case StatusVariantAlsoNegotiates:
      //   return "Variant Also Negotiates"
      // case StatusInsufficientStorage:
      //   return "Insufficient Storage"
      // case StatusLoopDetected:
      //   return "Loop Detected"
      // case StatusNotExtended:
      //   return "Not Extended"
      // case StatusNetworkAuthenticationRequired:
      //   return "Network Authentication Required"
      default:
        return "";
    }
  }
}
