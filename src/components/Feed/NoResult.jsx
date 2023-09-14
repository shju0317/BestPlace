import { MdOutlineSearchOff } from "react-icons/md";

function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center bg-white pt-10">
      <MdOutlineSearchOff className="h-20 w-20" />
      <h3 className="mt-2 text-2xl font-bold">일치하는 결과가 없습니다.</h3>
      <p className="mt-2">필터를 바꾸고 다시 시도해보세요.</p>
    </div>
  );
}

export default NoResult;
