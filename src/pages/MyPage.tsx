import { useNavigate, useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { useEffect, useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { checkPassword, deleteAccount, getUserInfo, validateToken } from '../apis/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../hooks/useToast';
import { RootState } from '../store/store';
import { closeModal, openModal } from '../store/modalSlice';
import FindAccountModal from '../components/Modal/FindAccountModal';
import ReviewModal from '../components/Modal/Review/ReviewModal';
import { getPlanList } from '../apis/planApi';
import { Plan } from '../types/plan';
import ConfirmModal from '../components/Modal/ConfirmModal';

import myBear from '../assets/myPageBear.svg';
import { useAppSelector } from '../hooks/reduxHooks';
import { clearUser, setUser } from '../store/userSlice';
import { formatToKST } from '../utils/formatDate';
import { Loading } from '../components/Loading';
interface userInfoProps {
  birthDay: string;
  email: string;
  gender: string;
  message: string;
  name: string;
  phoneNumber: string;
  phonePlan: number;
  success: boolean;
}

const MyPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const user = useAppSelector((state) => state.user);
  const [password, setPassword] = useState<string>('');
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const modalType = useSelector((state: RootState) => state.modal.type);
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    birthDay: '',
    email: '',
    gender: '',
    message: '',
    name: '',
    phoneNumber: '',
    phonePlan: 1,
    success: false,
  });

  const { showToast } = useToast();
  useEffect(() => {
    setHeaderConfig({
      title: '마이페이지',
      showBackButton: true,
      showSearch: false,
      hasShadow: true,
    });
  }, []);

  const handlePasswordCheck = async () => {
    if (!user || !password) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await checkPassword({ email: user?.email, password });
      const userinfo = await getUserInfo({ email: user?.email, password });
      console.log('userInfo', userinfo.data);
      console.log('formatToKST', formatToKST(userinfo.data.birthDay));
      setUserInfo({ ...userinfo.data, birthDay: formatToKST(userinfo.data.birthDay) });
      showToast(res.data.message, 'success');
      setIsCheckPassword(true);
      setPassword('');
    } catch (err) {
      console.log(err);
      showToast('비밀번호가 맞지 않습니다.', 'error');
      setIsCheckPassword(false);
    } finally {
      setIsLoading(false);
    }
  };
  const [plans, setPlans] = useState<Plan[]>([]);

  // 요금제 리스트 불러오기
  useEffect(() => {
    const fetchPlanList = async () => {
      try {
        setIsLoading(true);
        const res = await getPlanList();
        setPlans(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlanList();
  }, []);

  const handledeleteUser = async () => {
    try {
      setIsLoading(true);
      const res = await deleteAccount({ email: userInfo.email, password });
      showToast(res.data.message, 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
      showToast('비밀번호가 맞지 않습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  // 내 요금제
  const myplan = plans.find((plan) => plan.PLAN_ID === user?.plan);

  const divClass = 'flex items-center justify-between py-2 border-b';
  const titleClass = 'text-sm text-black font-semibold lg:text-lm lg:pl-4';
  const contentClass = 'text-sm font-medium text-gray-800  w-[63%] flex lg:text-lm';

  useEffect(() => {
    const checkToken = async () => {
      const res = await validateToken();
      const { user } = res.data;
      if (user && res) {
        const { email, birthDay, id, membership, name, plan } = user;
        const korBirthDay = formatToKST(birthDay);
        dispatch(setUser({ id, name, birthDay: korBirthDay, email, plan, membership }));
      } else {
        dispatch(clearUser());
        navigate('/login');
      }
      if (!user?.name) checkToken();
    };
  }, [user]);
  if (isloading) return <Loading />;
  return (
    <div className="h-full pt-12 bg-white pb-20">
      <div className="h-full w-full lg:px-10 lg:gap-5">
        <div className="flex flex-col justify-center items-center w-[90%] lg:w-[60%] mx-auto gap-3 bg-white lg:rounded-2xl lg:py-4">
          <div className="overflow-hidden">
            <img
              src={myBear}
              alt=""
              className="w-[20vw] h-[20vw] max-w-[220px] max-h-[220px] min-w-[120px] min-h-[120px] mx-auto mb-2 "
            />
          </div>
          <p className="text-lm font-semibold sm:text-lg">
            <span className="text-pink-500">{user?.name}</span>님 안녕하세요
          </p>
          <div className="flex flex-col bg-diagonal w-full h-32 rounded-xl p-4">
            <p className="text-sm text-zinc-800">사용하고 있는 요금제 (관심 요금제)</p>
            <p className="text-lg font-semibold text-violet-500">{myplan?.PLAN_NAME}</p>
            <div className="flex items-end ">
              <p className="text-lg font-semibold flex-1 pt-2">
                {myplan?.MONTHLY_FEE.toLocaleString()}원
              </p>
              <div
                className="flex items-center gap-1 justify-end text-xs pt-3 lg:text-s cursor-pointer select-none"
                onClick={() => navigate(`/plans/${myplan?.PLAN_ID}`)}
              >
                <p>요금제 자세히보기</p>
                <SlArrowRight className="w-2 h-2 mb-[0.75px]" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              color="gray"
              size="lg"
              className="flex-1 !text-s md:!text-sm !text-nowrap"
              onClick={() => dispatch(openModal('reviewList'))}
            >
              내가 작성한 리뷰 보기
            </Button>
            <Button
              onClick={() => dispatch(openModal('reviewWrite'))}
              variant="fill"
              color="violet"
              size="lg"
              className="flex-1 !text-s md:!text-sm !text-nowrap bg-violet-100"
            >
              요금제 리뷰 작성하기
            </Button>
          </div>
        </div>
        <div className="bg-violet-50 px-4 mt-8 flex flex-col justify-center items-center rounded-xl gap-2 min-h-48 text-center w-[90%] lg:w-[60%] mx-auto">
          <p className="mt-6 text-m font-semibold lg:text-lg">회원 정보</p>
          {isCheckPassword ? (
            <>
              <div className="bg-white rounded-xl m-4 px-4 py-7 shadow-sm border border-zinc-200 w-full h-[90%] space-y-2 lg:space-y-3">
                <div className={divClass}>
                  <span className={titleClass}>이름</span>
                  <span className={contentClass}>{userInfo?.name}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>성별</span>
                  <span className={contentClass}>{userInfo?.gender === 'F' ? '여성' : '남성'}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>생년월일</span>
                  <span className={contentClass}>{userInfo?.birthDay}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>휴대폰 번호</span>
                  <span className={contentClass}>
                    {userInfo?.phoneNumber?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                  </span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>이메일</span>
                  <span className={contentClass}>{userInfo.email}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>비밀번호</span>
                  <span className={`${contentClass} flex gap-2  justify-between items-center`}>
                    <span className="">●●●●●●●</span>
                    <Button
                      variant="ghost"
                      size="m"
                      color="pink"
                      onClick={() => dispatch(openModal('findAccount'))}
                      className="h-fit w-fit mb-1 px-1 "
                    >
                      변경하기
                    </Button>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end h-full w-full">
                {' '}
                <Button
                  variant="fill"
                  size="m"
                  className="px-6 py-3 flex mb-4"
                  onClick={() => setIsDelete(true)}
                >
                  회원탈퇴
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-s text-zinc-800 lg:text-m lg:mb-5">
                고객 정보 보호를 위해 비밀번호 확인이 필요합니다.
              </p>
              <div className="w-4/5 mx-auto py-2">
                <InputField
                  variant="box"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  placeholderStyle="lg:p-2"
                />
              </div>
              <Button
                color="pink"
                onClick={handlePasswordCheck}
                variant="fill"
                size="m"
                className="w-20 self-center lg:mt-4 mb-4"
              >
                확인
              </Button>
            </>
          )}
        </div>
      </div>
      {isDelete && (
        <ConfirmModal
          title="정말 탈퇴하시겠습니까?"
          subtitle="탈퇴를 희망하면 현재 비밀번호를 입력해주세요."
          onClose={() => setIsDelete(false)}
          onConfirm={handledeleteUser}
          cancelText="취소"
          confirmText="탈퇴하기"
          children={
            <InputField
              variant="box"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          }
        ></ConfirmModal>
      )}
      {isOpen && modalType === 'findAccount' && (
        <FindAccountModal
          onClose={() => dispatch(closeModal())}
          initialStep="reset"
          userEmail={userInfo.email}
        />
      )}
      {isOpen && modalType === 'reviewList' && (
        <ReviewModal type="reviewList" onClose={() => dispatch(closeModal())} />
      )}
      {isOpen && modalType === 'reviewWrite' && (
        <ReviewModal
          type="reviewWrite"
          planName={myplan?.PLAN_NAME}
          planPrice={myplan?.MONTHLY_FEE}
          onClose={() => dispatch(closeModal())}
        />
      )}
    </div>
  );
};

export default MyPage;
