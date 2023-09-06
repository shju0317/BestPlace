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


function ReviewKeyword() {
  const listItems = KEYWORDS.map(keyword => (
    <li key={keyword.id} className="mb-2">
      <button className="min-w-max px-3 py-2 bg-primary rounded shadow-sm shadow-slate-300">
        <span className="mr-2">{keyword.emoji}</span>{keyword.name}
      </button>
    </li>
  ));

  return (
    <ul className="text-white text-xs flex gap-1">{listItems}</ul>
  )
}

export default ReviewKeyword