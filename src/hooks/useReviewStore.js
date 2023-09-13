import { create } from 'zustand';

 const useReviewStore = create((set) => ({
  reviewData: {
    place: '',
    reviewText: '',
    photos: []
  },
  setReviewData: (data) => set((state) => ({ reviewData: data })),
}));

export default useReviewStore