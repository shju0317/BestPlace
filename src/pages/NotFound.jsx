import SignLogo from '@c/SignInUp/SignLogo';
import Button from '@c/Button';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mx-auto max-w-3xl mt-4 gap-6 p-4 justify-center">
      <SignLogo/>
      <h1 className="text-xl font-bold self-center text-secondary">페이지를 찾을 수 없습니다😢</h1>
      <p className="mb-6 font-semibold">방문하시려는 페이지의 주소가 잘못되었거나,<br/>
         페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.<br/>
         입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.</p>
      <Button text="이전페이지로 이동" onClick={() => navigate(-1)}/>
    </div>
  )
}

export default NotFound