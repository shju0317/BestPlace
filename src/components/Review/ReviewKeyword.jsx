import { produce } from 'immer';
import { useState, useEffect } from 'react';
import KEYWORDS from '@d/keywords';
import useReview from '@h/useReview';
import { string } from 'prop-types';
import alertMessage from '@u/alertMessage';


function ReviewKeyword({name}) {

  const [selectedKeyword, setSelectedKeyword] = useState([]);
  const {handleInputChange, reviewData, setReviewData} = useReview();

  const handleKeywordClick = (keywordName) => {
    if (selectedKeyword.includes(keywordName)) {
      setSelectedKeyword(
        produce(selectedKeyword, (draft) => {
          draft.splice(draft.indexOf(keywordName), 1);
        })
      );
    } else if (selectedKeyword.length < 5) { // 최대 5개 선택 제한
      setSelectedKeyword(
        produce(selectedKeyword, (draft) => {
          draft.push(keywordName);
        })
      );
    } else {
      alertMessage("최대 5개까지만 선택할 수 있습니다.","❗");
    }
    console.log('selectedKey!!!',selectedKeyword)
  };

  const listItems = KEYWORDS.map(keyword => (
    <li key={keyword.id} className="mb-2" >
      <button type="button"
      className={`min-w-max px-3 py-2 rounded shadow-sm shadow-slate-300 
      ${selectedKeyword.includes(keyword.name) ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
      onClick={(e) => {
        handleKeywordClick(keyword.name)
        handleInputChange({target: { name: "keywords", value: selectedKeyword}})
        }
      }>{keyword.name}</button>
    </li>
  ));

  return (
    <div className="flex flex-col flex-wrap gap-2 w-full self-center">
      <p className="text-lg text-center font-semibold mt-5">어떤 점이 좋았나요?<span className="text-sm">(1개~5개)</span></p>
      <ul className="text-white text-xs flex flex-wrap gap-x-1 justify-center">{listItems}</ul>
    </div>
  )
}

ReviewKeyword.propTypes = {
  name: string
};

export default ReviewKeyword