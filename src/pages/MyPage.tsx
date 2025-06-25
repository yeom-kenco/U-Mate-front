import { useNavigate, useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { useEffect, useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { checkPassword, deleteAccount, getUserInfo } from '../apis/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../hooks/useToast';
import { RootState } from '../store/store';
import { closeModal, openModal } from '../store/modalSlice';
import FindAccountModal from '../components/Modal/FindAccountModal';
import ReviewModal from '../components/Modal/Review/ReviewModal';
import { getPlanList, Plan } from '../apis/PlansApi';
import { calculateDiscountedPrice } from '../utils/getDiscountFree';
import ConfirmModal from '../components/Modal/ConfirmModal';

import myBear from '../assets/myPageBear.svg';

interface userInfoProps {
  birthDay: string;
  email: string;
  gender: string;
  message: string;
  name: string;
  phoneNumber: number;
  phonePlan: number;
  success: boolean;
}

const MyPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const user = useSelector((state) => state.user);
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
    phoneNumber: 0,
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
      const res = await checkPassword({ email: user?.email, password });
      const userinfo = await getUserInfo({ email: user?.email, password });
      setUserInfo(userinfo.data);
      console.log('userInfo', userInfo);
      showToast(res.data.message, 'success');
      setIsCheckPassword(true);
      setPassword('');
    } catch (err) {
      console.log(err);
      showToast('비밀번호가 맞지 않습니다.', 'error');
      setIsCheckPassword(false);
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
      const res = await deleteAccount({ email: userInfo.email, password });
      showToast(res.data.message, 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
      showToast('비밀번호가 맞지 않습니다.', 'error');
    }
  };
  // 내 요금제
  const myplan = plans.find((plan) => plan.PLAN_ID === user?.plan);

  const divClass = 'flex justify-between py-2 border-b';
  const titleClass = 'text-sm text-gray-500';
  const contentClass = 'text-sm font-medium text-gray-800 mr-4';

  return (
    <div className="h-full pt-12 bg-white pb-44">
      <div className="md:flex h-full w-full md:px-10 md:gap-5">
        <div className="flex flex-col justify-center items-center w-[90%] md:w-[60%] mx-auto gap-3 bg-white md:border-2 md:border-zinc-200 md:rounded-2xl md:p-4">
          <div className="overflow-hidden">
            <img
              src={myBear}
              alt=""
              className="w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] min-w-[120px] min-h-[120px] mx-auto mb-2 "
            />
          </div>
          <p className="text-lm font-semibold sm:text-lg">
            <span className="text-pink-500">{user?.name}</span>님 안녕하세요
          </p>
          <div className="flex flex-col bg-diagonal w-full h-32 rounded-xl py-4 px-4">
            <p className="text-sm text-zinc-800">사용하고 있는 요금제 (관심 요금제)</p>
            <p className="text-lg font-semibold text-violet-500">{myplan?.PLAN_NAME}</p>
            <div className="flex items-end items-center">
              <p className="text-lg font-semibold flex-1 pt-2">
                {myplan?.MONTHLY_FEE.toLocaleString()}원
              </p>
              <div className="flex items-center justify-end text-xs pt-3 md:text-s">
                <p>요금제 자세히보기</p>
                <SlArrowRight className="w-2 h-2 mb-1" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              color="gray"
              size="lg"
              className="flex-1 text-s xl:text-sm"
              onClick={() => dispatch(openModal('reviewList'))}
            >
              내가 작성한 리뷰 보기
            </Button>
            <Button
              onClick={() => dispatch(openModal('reviewWrite'))}
              variant="fill"
              color="violet"
              size="lg"
              className="flex-1 text-s xl:text-sm bg-violet-100"
            >
              요금제 리뷰 작성하기
            </Button>
          </div>
        </div>
        <div className="bg-violet-50 px-4 mt-8 flex flex-col justify-center items-center rounded-xl gap-2 min-h-48 text-center w-[90%] mx-auto md:mt-0">
          <p className="mt-6 text-m font-semibold md:text-lg">회원 정보</p>
          {isCheckPassword ? (
            <>
              <div className="bg-white rounded-xl m-4 p-4 shadow-sm border border-zinc-200">
                <div className={divClass}>
                  <span className={titleClass}>이름</span>
                  <span className={contentClass}>{user?.name}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>성별</span>
                  <span className={contentClass}>{userInfo?.gender === 'F' ? '여성' : '남성'}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>생년월일</span>
                  <span className={contentClass}>{user?.birthDay}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>휴대폰 번호</span>
                  <span className={contentClass}>0{userInfo?.phoneNumber}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>이메일</span>
                  <span className={contentClass}>{user.email}</span>
                </div>
                <div className={divClass}>
                  <span className={titleClass}>비밀번호</span>
                  <div className="flex items-center gap-2">
                    <span className="tracking-widest text-gray-800 text-sm">●●●●●●●</span>
                    <Button
                      variant="ghost"
                      size="m"
                      onClick={() => dispatch(openModal('findAccount'))}
                    >
                      변경하기
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="fill"
                size="m"
                className="w-24 flex justify-center"
                onClick={() => setIsDelete(true)}
              >
                회원탈퇴
              </Button>
            </>
          ) : (
            <>
              <p className="text-s text-zinc-800 md:text-m md:mb-5">
                고객 정보 보호를 위해 비밀번호 확인이 필요합니다.
              </p>
              <div className="w-4/5 mx-auto py-2">
                <InputField
                  variant="box"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  placeholderStyle="md:p-2"
                />
              </div>
              <Button
                color="pink"
                onClick={handlePasswordCheck}
                variant="fill"
                size="m"
                className="w-20 self-center md:mt-4"
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
        <FindAccountModal onClose={() => dispatch(closeModal())} initialStep="reset" />
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
