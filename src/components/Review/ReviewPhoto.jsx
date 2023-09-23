import { CiImageOn } from "react-icons/ci";
import { PiPlusCircle} from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";
import { useRef, useState, useEffect } from 'react';
import { produce } from 'immer';
import useReview from '@h/useReview';
import { string } from 'prop-types';
import { alertMessage } from '@u/index';

function ReviewPhoto({name}) {
  const MAX_IMAGE_COUNT = 5;

  const {handleInputChange} = useReview();

  const [image, setImage] = useState({
    fileImages: [],
    imageCount: 0,
  });

  const photoRef = useRef(null);
  const divRef = useRef(null);
  const labelRef = useRef(null);

  const hideElement = (element) => element.current.style.display = "none";
  const showElement = (element) => element.current.style.display = "flex";

  // 이미지 파일 업로드하기
  const handleUploadImage = (e) => {
    const { files } = e.target;

    // 이미지 개수가 최대 값을 초과하면 업로드 중단
    if (files.length + image.fileImages.length > MAX_IMAGE_COUNT) { 
      alertMessage("최대 5장까지 추가할 수 있습니다.","❗");
      return;
    }
  
    setImage(produce((draftImage) => {
      draftImage.fileImages.push(...Array.from(files).map((file) => ({
        image: URL.createObjectURL(file),
        label: file.name,
      })));
      draftImage.imageCount += files.length;
    }));    
};

  
  // 업로드한 이미지 파일 삭제하기
  const handleDeleteImage = (index) => {
    setImage(produce((draftImage) => {
      draftImage.fileImages.splice(index,1);
      draftImage.imageCount -=1;
    }));
 
    if (image.imageCount <=1){
      showElement(labelRef);
      hideElement(divRef)
    }
 };
  

 useEffect(() => {
  if (image.imageCount <= 0) {
    showElement(labelRef);
    hideElement(divRef);
  } else {
    showElement(divRef);
    hideElement(labelRef);
  }
}, [image]);



  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="photos" 
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
        multiple
        name="photos"
        id="photos"
        onChange={(e) => {
          handleUploadImage(e);
          handleInputChange({ target: { name: name, value: e.target.files } });
        }}
        className="absolute z-10 h-full w-full cursor-pointer opacity-0"
      />
      <div className="flex gap-4" ref={divRef}>
        <div 
          className="flex border border-primary rounded gap-2 overflow-x-auto p-2 h-36 w-full"
        >
        {image.fileImages.map((file,index)=> (
              <div key={index} className="relative">
                <img src={file.image} alt={file.label} className="h-full"/>
                {/* 삭제 버튼 */}
                <button 
                  type="button"
                  onClick={() => handleDeleteImage(index)} 
                  className="absolute top-[2px] right-[2px] text-primary z-10"
                  aria-label={`이미지 ${index+1} 삭제`}>
                  <MdOutlineCancel size="20"/>
                </button>
              </div>
            ))}
        </div>
        <div className="flex flex-col justify-center items-center text-primary">
          <PiPlusCircle className="w-20 h-20"/>
          <p className="font-bold">{image.imageCount}/{MAX_IMAGE_COUNT}</p>
        </div>
        </div>
      </div>
  </div>
  )
}

ReviewPhoto.propTypes = {
  name: string
};

export default ReviewPhoto