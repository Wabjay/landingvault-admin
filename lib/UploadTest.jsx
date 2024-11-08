/* eslint-disable jsx-a11y/img-redundant-alt */
// import React, { useEffect, useState } from "react";
import { Button, Upload } from "antd";

import Icon from "@/assets/Upload icons.svg"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase-config";
import { useEffect, useState } from "react";
import { store } from "@/stores/store";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Image from "next/image";


const ImageCover = ({ coverImage, coverPath, uploaded }) => {
  const [imageUrl, setImageUrl] = useState('');


  const {setIsOverlayLoading } = store();

  // Set image URL when uploaded prop changes
  useEffect(() => {
    setImageUrl(uploaded);
  }, [uploaded]);

  // Upload Cover image and get URL
  const uploadCoverImage = (e) => {

    const coverUploaded = e.file;

    const storageRef = ref(storage, `/${coverPath}/${Date.now()}`);
    const uploadImage = uploadBytesResumable(storageRef, coverUploaded);
    setIsOverlayLoading(true)

    uploadImage.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadImage.snapshot.ref);
        
    setIsOverlayLoading(false)
        setImageUrl(imageUrl)
        coverImage(imageUrl);
      } 
    );

  };

  return (
    <div className="relative">
    <Upload
      onChange={uploadCoverImage}
      maxCount={1}
      listType="picture"
      beforeUpload={() => false} // Prevent automatic upload
    >
      {imageUrl ? (
        <div className="relative">
        <Image src={imageUrl} alt="Cover Image" width={100} height={100}  style={{ maxWidth: "100%", maxHeight: "100%" }} />
        <Button className="absolute top-[50%] left-[20%] tablet:left-[32%] text-[#3E7B52] bg-[#A9EFCD] text-14 font-medium px-4 py-2 rounded-none">
          Update Cover Image
        </Button>
        </div>
      ) : (
        
        <>
          <Image src={Icon} alt="Upload Icon" className="p-[9px] rounded-full bg-[#F2F1E8]" />
         <p className="font-16 font-medium text-[#2E2E27]">Upload cover image</p>
          <p className="font-16 leading-6 font-normal text-[#2E2E27]">Click to upload cover image</p>
        <Button className="text-[#3E7B52] bg-[#A9EFCD] text-14 font-medium px-4 py-2 rounded-none">
          Upload picture
        </Button>
          </>
      )}
    </Upload>
      <LoadingOverlay />
    </div>
  );
};

export default ImageCover;
