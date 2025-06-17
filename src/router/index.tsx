import { Routes, Route } from 'react-router-dom';
import Default from '../default';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="mypage" element={<div>마이페이지</div>} />
        <Route path="notifications" element={<div>알림</div>} />
      </Route>
    </Routes>
  );
};

export default Router;
