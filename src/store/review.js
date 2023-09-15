import { create } from 'zustand';

 const useReviewStore = create((set) => ({
  reviewData: {
    writer: '',
    contents: '',
    photos: [],
    keywords: [],
    place: ''
  },
  setReviewData: (data) => set((state) => ({ reviewData: {...state.reviewData, ...data} })),
}));

export default useReviewStore