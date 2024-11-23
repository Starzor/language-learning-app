import axios, { AxiosResponse } from "axios";
import pako from "pako";
import { ReplyRequest }from "./models/ReplyRequest";
import { ExplanationRequest } from "./models/ExplanationRequest";
import { TestEvaluationRequest } from "./models/TestEvaluationRequest";
import { TopicConversationRequest } from "./models/TopicConversationRequest";
import { ReformTextRequest } from "./models/ReformTextRequest";

const url = "https://europe-west3-gclearning-426207.cloudfunctions.net";

export const getChatReply = async (request: ReplyRequest): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${url}/gpt-chat-reply`, {
      params: request,
    });
    console.log(response.data);

    const correctionResponse: AxiosResponse = await axios.get(`${url}/gpt-message-correction`, {
      params: request,
    });
    console.log(correctionResponse.data);

    return [response.data, correctionResponse.data];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching chat reply:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
};

export const getTopicConversation = async (request: TopicConversationRequest) => {
  try {
    const response: AxiosResponse = await axios.get(`${url}/gpt-topic-conversation`, {
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
}

export const getReformedText = async (request: ReformTextRequest) => {
  try {
    const response: AxiosResponse = await axios.get(`${url}/gpt-reform-text`, {
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
}

export const getTestResults = async (request: TestEvaluationRequest): Promise<any> => {
  const compressedData = pako.gzip(JSON.stringify(request))
  try {
    const response = await axios.post(`${url}/gpt-language-test`, compressedData, {
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
      },
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