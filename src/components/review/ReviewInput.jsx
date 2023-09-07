import { useId } from "react"

function ReviewInput() {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2 w-80 md:w-full self-center">
      <label htmlFor="inputId" className="text-lg text-center font-semibold">리뷰를 남겨주세요</label>
      <textarea id="inputId" cols="20" rows="5"  
        placeholder="업주와 다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요. 유용한 Tip도 남겨주세요!"
        className="bg-slate-100 rounded p-3">
      </textarea>
      <span className="text-xs text-right">0/400</span>
    </div>
  )
}

export default ReviewInput