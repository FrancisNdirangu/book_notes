import { AppError } from "./AppError.js";
export class OpenLibraryError extends AppError{
  constructor(message, statusCode,code) {
    super(message,statusCode);

    this.code = code;
  }

  static networkFailure(){
    return new OpenLibraryError("Unable to connect to Open Library", 503,"NETWORK_FAILURE");
  }

  static timeoutError(){
    return new OpenLibraryError("Been waiting too long for a response we haven't gotten",504,"SERVER_TIMEOUT_FAILURE")
  }

  static rateLimitFailure(){
    return new OpenLibraryError("Rate Limit Exceeded",429,"RATE_LIMIT_FAILURE")
  }

  static maxRetriesFailure(){
    return new OpenLibraryError("Max retries exceeded",503,"MAX_RETRIES_REACHED")
  }

  static badRequestFailure() {
    return new OpenLibraryError("Bad Request",400,"BAD_REQUEST")
  }

  static forbiddenRequestFailure(){
    return new OpenLibraryError("Forbidden Request made to open library",403,"FORBIDDEN_REQUEST_FAILURE")
  }

  static notFoundFailure(){
    return new OpenLibraryError("Not found failure on open library",404,"NOT_FOUND_FAILURE")
  }

  
}
