type ResponseBody = {
  prompt: string;
  imgUrl: string;
}

type SuccessResponse = {
  success: true;
  body: ResponseBody;
}

type ErrorResponse = {
  success: false;
}

type _OpenAIResponse = SuccessResponse | ErrorResponse;

type _Guess = {
  id: number;
  body?: string;
}

type _WordComparison = {
  text: string;
  status: string;
}