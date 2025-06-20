type Props = {
  active: 'id' | 'password';
  onChange: (type: 'id' | 'password') => void;
};

const AccountToggleMenu = ({ active, onChange }: Props) => {
  return (
    <div className="flex bg-zinc-100 rounded-lg p-1 mb-6">
      <button
        className={`flex-1 py-2 rounded-lg text-sm font-semibold max-[400px]:text-s transition ${
          active === 'id' ? 'bg-white text-pink-500 shadow' : 'text-zinc-400'
        }`}
        onClick={() => onChange('id')}
      >
        아이디 찾기
      </button>
      <button
        className={`flex-1 py-2 rounded-lg text-sm font-semibold max-[400px]:text-s transition ${
          active === 'password' ? 'bg-white text-pink-500 shadow' : 'text-zinc-400'
        }`}
        onClick={() => onChange('password')}
      >
        비밀번호 찾기
      </button>
    </div>
  );
};

export default AccountToggleMenu;
