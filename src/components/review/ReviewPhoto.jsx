import { CiImageOn } from "react-icons/ci";
import { PiPlusCircle } from "react-icons/pi";
import { useRef, useState } from 'react';

function ReviewPhoto() {
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
    console.log(element);
  }

  const handleUpload = (e) => {
    const { files } = e.target;
    console.log('file길이래',files.length);
    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));

    console.log(fileImages);
    setImageCount(files.length);
    setFileImages(fileImages);

    showElement(divRef);
    hideElement(labelRef);

  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="photo" 
        ref={labelRef}
        className="flex justify-center items-center gap-1 py-1 border border-primary rounded font-semibold w-full self-center">
        <CiImageOn />
        사진추가
        <span className="text-slate-400 text-xs">최대 10장</span>
      </label>
      <div className="relative">
        <input
          type="file"
          accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
          ref={photoRef}
          name="photo"
          id="photo"
          onChange={handleUpload}
          className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="hidden flex gap-4" ref={divRef}>
        <div 
          className="flex border border-primary rounded gap-2 overflow-x-auto p-2 h-36 w-full"
          
        >
          {fileImages.map((file) => {
            return (
              <img key={file.label} src={file.image} alt={file.label} />
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center text-primary">
          <PiPlusCircle className="w-20 h-20"/>
          <p className="font-bold">{imageCount}/20</p>
        </div>
        </div>
      </div>
  </div>
  )
}

export default ReviewPhoto