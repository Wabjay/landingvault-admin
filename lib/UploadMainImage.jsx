/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { Button, Upload } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  storage } from "@/lib/useFirebase"; // Import the custom hook
import { store } from "@/stores/store";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Image from "next/image";
import Icon from "@/assets/Upload icons.svg";

const MainImage = ({ coverImage, coverPath, uploaded }) => {
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
            <Image src={imageUrl} alt="Cover Image" width={100} height={100} style={{ maxWidth: "100%", maxHeight: "100%" }} />
            <Button className="absolute top-[50%] left-[20%] tablet:left-[32%] text-[#000] bg-[#9FEDC6] text-14 font-medium px-4 py-2 rounded-none">
            Upload main image
            </Button>
          </div>
        ) : (
          <div className="text-center">           
            <Button className="text-[#000] bg-[#9FEDC6] w-[166px] text-14 font-medium px-4 py-2 rounded-none">
            Upload main image
            </Button>
           
          </div>
        )}
      </Upload>
      <LoadingOverlay />
    </div>
  );
};

export default MainImage;
