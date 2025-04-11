type ResponseBody = {
  prompt: string;
  imgUrl: string;
}

type SuccessResponse<T> = {
  success: true;
  body: ResponseBody;
}

type ErrorResponse = {
  success: false;
}

type OpenAIResponse<T> = SuccessResponse<T> | ErrorResponse;