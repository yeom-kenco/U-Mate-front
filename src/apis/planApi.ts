import axios from 'axios';

const getPlanList = async () => {
  const response = await axios.get('https://seungwoo.i234.me:3333/planList');
  return response.data;
};

const getPlanDetail = async (planId: number) => {
  const response = await axios.get(`https://seungwoo.i234.me:3333/planDetail/${planId}`);
  return response.data;
};

const changePlanApi = async (userId: number, newPlanId: number) => {
  const csrf = await axios.get('https://seungwoo.i234.me:3333/csrf-token');
  const csrfToken = csrf.data.csrfToken;

  const response = await axios.post(
    `https://seungwoo.i234.me:3333/changeUserPlan`,
    {
      userId,
      newPlanId,
    },
    {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    }
  );
  return response.data;
};

export { getPlanList, getPlanDetail, changePlanApi };
