import {AppError} from "AppError.js";

class OpenLibraryError extends AppError{
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
    return OpenLibraryError("Rate Limit Exceeded",429,"RATE_LIMIT_FAILURE")
  }

  
}
