import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Modal } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase-config";
import { store } from "@/stores/store";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Image from "next/image";

const ImageUpload = ({ title, contentImages, contentPath }) => {
  const [images, setImages] = useState([]);
  const [imagesName, setImagesName] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [uploadingIndexes, setUploadingIndexes] = useState([]);
  const { setIsOverlayLoading } = store();

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      uploadImage(file);
    });
  };

  const uploadImage = async (image, index = null) => {
    setIsOverlayLoading(true);
    if (index !== null) setUploadingIndexes((prevIndexes) => [...prevIndexes, index]);

    try {
      const storageRef = ref(storage, `/${contentPath}/${Date.now()}${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading image:", error);
          setIsOverlayLoading(false);
          if (index !== null) setUploadingIndexes((prevIndexes) => prevIndexes.filter((idx) => idx !== index));
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const imagesNameUrl = await getDownloadURL(uploadTask.snapshot.metadata.fullPath);
          if (index !== null) {
            setImages((prevImages) => {
              const updatedImages = [...prevImages];
              updatedImages[index] = imageUrl;
              return updatedImages;
            });
          } else {
            setImages((prevImages) => [...prevImages, imageUrl]);
          }
          setImagesName((prevImages) => [...prevImages, imagesNameUrl]);
          contentImages((prevImages) => [...prevImages, imageUrl]);
          setIsOverlayLoading(false);
          if (index !== null) setUploadingIndexes((prevIndexes) => prevIndexes.filter((idx) => idx !== index));
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsOverlayLoading(false);
      if (index !== null) setUploadingIndexes((prevIndexes) => prevIndexes.filter((idx) => idx !== index));
    }
  };

  const deleteImage = (imageUrl) => {
    const updatedImages = images.filter((image) => image !== imageUrl);
    setImages(updatedImages);
    contentImages(updatedImages);
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const handleUpdateImage = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        uploadImage(file, index);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div className="py-10">
      <h1 className="mb-4">{title}</h1>
      <div className="grid grid-cols-2 gap-4 mb-5">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative">
            <Image
              width={264}
              height={174}
              src={imageUrl}
              alt={`Uploaded ${index + 1}`}
              className="transition-transform duration-75 ease-linear"
              style={{ width: "264px", height: "174px" }}
            />
            {uploadingIndexes.includes(index) && <LoadingOverlay />}
            <div className="absolute inset-0 flex justify-center items-center gap-2 bg-overlay">
              <Button className="bg-white-1 px-4 py-2" onClick={() => handleViewImage(imageUrl)}>View</Button>
              <Button className="border border-[#FF6464] bg-[#FF6464] px-4 py-2 text-white" onClick={() => deleteImage(imageUrl)}>Delete</Button>
              <Button className="bg-[#3E7B52] text-white px-4 py-2" onClick={() => handleUpdateImage(index)}>Update</Button>
            </div>
            <p>{imagesName[index]}</p>
          </div>
        ))}
      </div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Button className="text-[#3E7B52] bg-[#A9EFCD] px-4">Add new image</Button>
      </div>
      {modalVisible && (
        <Modal visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={800}>
          <Image src={selectedImageUrl} alt="Selected" style={{ width: "100%" }} />
        </Modal>
      )}
    </div>
  );
};

export default ImageUpload;
