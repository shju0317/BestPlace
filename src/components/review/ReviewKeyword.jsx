import toast from 'react-hot-toast';

const KEYWORDS = [
	{
    id: 'keyword-1',
    name: '친절해요',
    emoji: '😊'
  },
	{
    id: 'keyword-2',
    name: '매장이 넓어요',
    emoji: '🏢'
  },
  {
    id: 'keyword-3',
    name: '매장이 청결해요',
    emoji: '✨'
  },
  {
    id: 'keyword-4',
    name: '인테리어가 멋져요',
    emoji: '🌆'
  },
  {
    id: 'keyword-5',
    name: '뷰가 좋아요',
    emoji: '👀'
  },
  {
    id: 'keyword-6',
    name: '맛있어요',
    emoji: '🤩'
  },
  {
    id: 'keyword-7',
    name: '양이 많아요',
    emoji: '🍚'
  },
  {
    id: 'keyword-8',
    name: '가성비가 좋아요',
    emoji: '💰'
  },
  {
    id: 'keyword-9',
    name: '주차하기 편해요',
    emoji: '🚗'
  },
  {
    id: 'keyword-10',
    name: '냉난방이 잘돼요',
    emoji: '🌡'
  }
]

import { useState } from 'react';

function ReviewKeyword() {

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordClick = (keywordId) => {
    if (selectedKeywords.includes(keywordId)) {
      setSelectedKeywords(selectedKeywords.filter(id => id !== keywordId));
    } else if (selectedKeywords.length < 5) { // 최대 개수 제한
      setSelectedKeywords([...selectedKeywords, keywordId]);
    } else { // 선택 개수가 이미 최대값(5)인 경우 경고 메시지 표시
      toast("최대 5개까지만 선택할 수 있습니다.",{
        duration: 2000,
        icon: "❗",
        style:{
          background: "#2F6690",
          color: "#fff",
          borderRadius: "28px",
          padding: "12px"
        },
        ariaProps:{
          role: "alert",
          'aria-live': 'polite'
        }
      });
    }
  };

  const listItems = KEYWORDS.map(keyword => (
    <li key={keyword.id} className="mb-2">
      <button type="button"
      className={`min-w-max px-3 py-2 rounded shadow-sm shadow-slate-300 
      ${selectedKeywords.includes(keyword.id) ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
      onClick={() => handleKeywordClick(keyword.id)}
      >
        <span className="mr-2">{keyword.emoji}</span>{keyword.name}
      </button>
    </li>
  ));

  return (
    <div className="flex flex-col flex-wrap gap-2 w-full self-center">
      <p className="text-lg text-center font-semibold mt-5">어떤 점이 좋았나요?<span className="text-sm">(1개~5개)</span></p>
      <ul className="text-white text-xs flex flex-wrap gap-x-1 justify-center">{listItems}</ul>
    </div>
  )
}

export default ReviewKeyword