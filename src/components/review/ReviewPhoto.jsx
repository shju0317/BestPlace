import { CiImageOn } from "react-icons/ci";
import { PiPlusCircle} from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";
import { useRef, useState } from 'react';

function ReviewPhoto() {
  const MAX_IMAGE_COUNT = 5;

  const [fileImages, setFileImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const photoRef = useRef(null);
  const divRef = useRef(null);
  const labelRef = useRef(null);

  const hideElement = (element) => {
    element.current.style.display = "none";
  }

  const showElement = (element) => {
    element.current.style.display = "flex";
  }

  // 이미지 파일 업로드하기
  const handleUploadImage = (e) => {
    const { files } = e.target;
  
    const newFileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));
  
    const updatedFileImages = [...fileImages, ...newFileImages];
    const updatedImageCount = imageCount + files.length;

    if (files.length + fileImages.length > MAX_IMAGE_COUNT) {
      return; // 이미지 개수가 최대 값을 초과하면 업로드 중단
    }else{
      setFileImages(updatedFileImages);
      setImageCount(updatedImageCount);
    }

    if (updatedImageCount <= 0) {
      showElement(labelRef);
      hideElement(divRef);
    } else {
      showElement(divRef);
      hideElement(labelRef);
    }
  };
  
  // 업로드한 이미지 파일 삭제하기
  const handleDeleteImage = (index) => {
    setFileImages((prevFileImages) =>
      prevFileImages.filter((_, i) => i !== index)
    );
  
    setImageCount((prevImageCount) => {
      const updatedImageCount = prevImageCount - 1;
      
      if (updatedImageCount <= 0) {
        showElement(labelRef);
        hideElement(divRef);
      }
      
      return updatedImageCount;
    });
  };
  



  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="photo" 
        ref={labelRef}
        className="flex justify-center items-center gap-1 py-1 border border-primary rounded font-semibold w-full self-center">
        <CiImageOn />
        사진추가
        <span className="text-slate-400 text-xs">최대 {MAX_IMAGE_COUNT}장</span>
      </label>
      <div className="relative">
        <input
          type="file"
          accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
          ref={photoRef}
          name="photo"
          id="photo"
          onChange={handleUploadImage}
          className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="hidden flex gap-4" ref={divRef}>
        <div 
          className="flex border border-primary rounded gap-2 overflow-x-auto p-2 h-36 w-full"
        >
        {fileImages.map((file,index)=> (
              <div key={index} className="relative">
                <img src={file.image} alt={file.label} className="h-full"/>
                {/* 삭제 버튼 */}
                <button 
                  type="button"
                  onClick={() => handleDeleteImage(index)} 
                  className="absolute top-[4px] right-[4px] text-primary z-10"
                  aria-label="이미지 삭제">
                  <MdOutlineCancel size="20"/>
                </button>
              </div>
            ))}
        </div>
        <div className="flex flex-col justify-center items-center text-primary">
          <PiPlusCircle className="w-20 h-20"/>
          <p className="font-bold">{imageCount}/{MAX_IMAGE_COUNT}</p>
        </div>
        </div>
      </div>
  </div>
  )
}

export default ReviewPhoto