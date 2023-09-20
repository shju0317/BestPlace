import { create } from "zustand";

const useReviewStore = create((set) => ({
  reviewData: {
    writer: "",
    contents: "",
    photos: null,
    keywords: null,
    place: "",
  },
  setReviewData: (data) => set((state) => ({ reviewData: { ...state.reviewData, ...data } })),
}));

export default useReviewStore;