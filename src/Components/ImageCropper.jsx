import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ onCrop }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedImageUrl = canvas.toDataURL('image/jpeg');
      onCrop(croppedImageUrl);
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileChange} />
      {src && <ReactCrop src={src} crop={crop} onChange={(newCrop) => setCrop(newCrop)} onComplete={onCropComplete} />}
    </div>
  );
};

export default ImageCropper;
