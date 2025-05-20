type ResponseBody = Record<string, string>;

type SuccessResponse = {
  success: true;
  body: ResponseBody;
};

type ErrorResponse = {
  success: false;
  msg: string;
};

type _OpenAIResponse = SuccessResponse | ErrorResponse;

type _Guess = {
  id: number;
  body?: string;
};

type _GuessResult = {
  text: string;
  status: GuessResultStatus;
};

type GuessResultStatus = "correct" | "partial" | "incorrect";
