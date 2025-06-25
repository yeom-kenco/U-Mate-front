import axiosInstance from './axiosInstance';

export interface SurveyRequest {
  rating: number;
  content: string;
}

export interface SurveyResponse {
  success: boolean;
  message: string;
}

export const postSurvey = async (surveyData: SurveyRequest): Promise<SurveyResponse> => {
  const response = await axiosInstance.post<SurveyResponse>('/survey', surveyData);
  console.log('설문 제출 성공', response.data);
  return response.data;
};
