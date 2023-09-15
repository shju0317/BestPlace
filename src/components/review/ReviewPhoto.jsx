import { CiImageOn } from "react-icons/ci";
import { PiPlusCircle} from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { produce } from 'immer';

function ReviewPhoto() {
  const MAX_IMAGE_COUNT = 5;

  const [image, setImage] = useState({
    fileImages: [],
    imageCount: 0,
  });

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

    if (files.length + image.fileImages.length > MAX_IMAGE_COUNT) {
      toast("최대 5장까지 추가할 수 있습니다.",{
        duration: 2000,
        icon: "❗",
        style:{
          background: "#e0f2fe",
          color: "#000",
          borderRadius: "28px",
          padding: "12px"
        },
        ariaProps:{
          role: "alert",
          'aria-live': 'polite'
        }
      });
      return; // 이미지 개수가 최대 값을 초과하면 업로드 중단
    }
  
    setImage(produce((draftImage) => {
      draftImage.fileImages.push(...Array.from(files).map((file) => ({
        image: URL.createObjectURL(file),
        label: file.name,
      })));
      draftImage.imageCount += files.length;
    }));    
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
        {image.fileImages.map((file,index)=> (
              <div key={index} className="relative">
                <img src={file.image} alt={file.label} className="h-full"/>
                {/* 삭제 버튼 */}
                <button 
                  type="button"
                  onClick={() => handleDeleteImage(index)} 
                  className="absolute top-[4px] right-[4px] text-primary z-10"
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

// ReviewPhoto.propTypes = {
//   name: string,
//   onChange: func
// };


export default ReviewPhoto