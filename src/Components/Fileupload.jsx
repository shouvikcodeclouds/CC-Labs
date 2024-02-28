import React, { useState } from 'react';
import { Dialog, Button } from '@mui/material';
import ImageCropper from './ImageCropper';

const FileUpload = ({ open, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [cropped, setCropped] = useState(null);

  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onCrop = (croppedImage) => {
    setCropped(croppedImage);
  };

  const onUploadClick = () => {
    onUpload(cropped);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <input type="file" accept="image/*" onChange={onSelectFile} />
        {file && <ImageCropper src={URL.createObjectURL(file)} onCrop={onCrop} />}
        {cropped && <img src={cropped} alt="Cropped" />}
        <Button onClick={onUploadClick}>Upload</Button>
      </Dialog>
    </div>
  );
};

export default FileUpload;
