import axios, { AxiosResponse } from "axios";
import { ReplyRequest }from "./models/ReplyRequest";
import { ExplanationRequest } from "./models/ExplanationRequest";

const url = "https://europe-west3-gclearning-426207.cloudfunctions.net";

export const getChatReply = async (request: ReplyRequest): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${url}/gpt-chat-reply`, {
      params: request,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching chat reply:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
};

export const getReplyExplanation = async (request: ExplanationRequest): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${url}/gpt-explain-reply`, {
      params: request,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching reply explanation:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
};