// components/ImageUploader.tsx
import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";

interface ImageUploaderProps {
  onUpload: (file: File | null) => void;
  preview?: string | null;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, preview, label }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(preview || null);

  const handleChange = (info: { file: UploadFile }) => {
    const file = info.file.originFileObj as File;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    onUpload(null);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {label && <p className="font-16 font-medium text-[#2E2E27]">{label}</p>}
      <div className="w-full h-[200px] border border-dashed border-[#D2D2CF] rounded-lg flex items-center justify-center">
        {imagePreview ? (
          <div className="relative flex flex-col items-center">
            <img 
              src={imagePreview} 
              alt="Uploaded preview" 
              className="max-h-[180px] max-w-full object-contain"
            />
            <Button
              type="link"
              onClick={handleRemove}
              className="mt-2 text-red-500"
            >
              Remove Image
            </Button>
          </div>
        ) : (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess && onSuccess("ok");
                handleChange({ file: file as UploadFile });
              }, 0);
            }}
          >
            <Button icon={<UploadOutlined />}>
              {label ? `Upload ${label}` : "Click to Upload"}
            </Button>
          </Upload>
        )}
      </div>
    </div>
  );
};