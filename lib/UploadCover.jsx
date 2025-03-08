/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState, useRef } from "react";
import { Button, Upload } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/useFirebase";
import { store } from "@/stores/store";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Image from "next/image";
import Icon from "@/assets/Upload icons.svg";
import LoadImage from "@/components/blocks/LoadImage";

const ImageCover = ({ coverImage, coverPath, uploaded }) => {
  const [imageUrl, setImageUrl] = useState(uploaded);
  const { setIsOverlayLoading } = store();
  const dropRef = useRef(null);

  useEffect(() => {
    setImageUrl(uploaded);
  }, [uploaded]);

  const handleFileUpload = (file) => {
    const storageRef = ref(storage, `${coverPath}/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setIsOverlayLoading(true);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Error uploading image:", error);
        setIsOverlayLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setIsOverlayLoading(false);
        setImageUrl(downloadURL);
        coverImage(downloadURL);
      }
    );
  };

  const uploadCoverImage = (info) => {
    handleFileUpload(info.file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) handleFileUpload(file);
      }
    }
  };

  useEffect(() => {
    const dropArea = dropRef.current;
    if (dropArea) {
      dropArea.addEventListener("dragover", (event) => event.preventDefault());
      dropArea.addEventListener("drop", handleDrop);
      window.addEventListener("paste", handlePaste);
    }
    return () => {
      if (dropArea) dropArea.removeEventListener("drop", handleDrop);
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="relative" ref={dropRef}>
      <Upload
        onChange={uploadCoverImage}
        maxCount={1}
        listType="picture"
        beforeUpload={() => false}
      >
        {imageUrl ? (
          <div className="relative">
            <Button className="!absolute top-[50%] z-30 left-[50%] transform-[translate(-50%, -50%)] tablet:left-[32%] text-[#3E7B52] bg-[#A9EFCD] text-14 font-medium px-4 py-2 rounded-none">
              Update Cover Image
            </Button>
            <LoadImage src={imageUrl} alt="Cover Image" />
          </div>
        ) : (
          <div className="text-center border-dashed border-2 border-gray-300 p-4 rounded-lg" onDrop={handleDrop}>
            <Image src={Icon} alt="Upload Icon" className="p-[9px] rounded-full bg-[#F2F1E8]" />
            <p className="font-16 font-medium text-[#2E2E27]">Upload cover image</p>
            <p className="font-16 leading-6 font-normal text-[#2E2E27]">Drag & Drop, Copy & Paste, or Click to Upload</p>
            <Button className="text-[#3E7B52] bg-[#A9EFCD] text-14 font-medium px-4 py-2 rounded-none">
              Upload picture
            </Button>
          </div>
        )}
      </Upload>
      <LoadingOverlay />
    </div>
  );
};

export default ImageCover;
