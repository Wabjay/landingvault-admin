/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { Button, Upload } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  storage } from "@/lib/useFirebase"; // Import the custom hook
import { store } from "@/stores/store";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Image from "next/image";
import Icon from "@/assets/Upload icons.svg";
import LoadImage from "@/components/blocks/LoadImage";

const ImageCover = ({ coverImage, coverPath, uploaded }) => {
  const [imageUrl, setImageUrl] = useState(uploaded);
  const { setIsOverlayLoading } = store();
  // const { storage } = useFirebase(); // Destructure storage from useFirebase hook

  useEffect(() => {
    setImageUrl(uploaded);
  }, [uploaded]);

  const uploadCoverImage = (info) => {
    const file = info.file;
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
            {/* <Image src={imageUrl} alt="Cover Image" width={100} height={100} style={{ maxWidth: "100%", maxHeight: "100%" }} /> */}
            <Button style={{position: 'absolute', zIndex:"30", top:"50%", left: "50%", transform: "translate(-50%, -50%)"}} className="!absolute top-[50%] z-30 left-[50%] transform-[translate(-50%, -50%)] tablet:left-[32%] text-[#3E7B52] bg-[#A9EFCD] text-14 font-medium px-4 py-2 rounded-none">
              Update Cover Image
            </Button>
            <LoadImage src={imageUrl} alt="Cover Image" />
          </div>
        ) : (
          <div className="text-center">
            <Image src={Icon} alt="Upload Icon" className="p-[9px] rounded-full bg-[#F2F1E8]" />
            <p className="font-16 font-medium text-[#2E2E27]">Upload cover image</p>
            <p className="font-16 leading-6 font-normal text-[#2E2E27]">Click to upload cover image</p>
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
