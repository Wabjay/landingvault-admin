"use client";

import { Modal } from "antd";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/useFirebase";
import { store } from '@/stores/store';
import { LoadingOverlay } from '@/components/blocks/LoadingOverlay';
import { createSlug } from "@/components/blocks/slug";
import { SelectPageType } from "@/components/selections/SelectPageType";


export default function UploadPages({ imageType, pitchName, uploaded }: { imageType: (pagesData: any) => void, pitchName: string, uploaded: pages }) {
  const [images, setImages] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState<string>("");
  const [title, setTitle] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pagesData, setPagesData] = useState<pages>(uploaded || {});
  const [pageData, setPageData] = useState<page>({
    pageName: "",
    pageUrl: "",
    pageNumber: 0,
    pageType: "",
    _id: ""
  });

  const { setIsOverlayLoading } = store();
  // const { storage } = useFirebase();

  const showModal = () => {
    setIsModalOpen(true);
    setShowUpload("");
    setTitle("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handlePageType = (res: { value: string }) => {
    setPageData({ ...pageData, pageType: res.value });
    console.log(res);
  };

  const uploadCoverImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `/contentImages/${Date.now()}`);
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
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setIsOverlayLoading(false);
        setPageData({ ...pageData, pageUrl: imageUrl });
        setImages((prevImages) => [...prevImages, imageUrl]);
        setShowUpload(imageUrl);
        console.log(imageUrl);
      }
    );
  };

  useEffect(() => {
    if (pitchName !== "" && pageData.pageType) {
      setPageData((prevData) => ({
        ...prevData,
        pageName: `${createSlug(pitchName)}-${createSlug(pageData.pageType)}`,
      }));
    }
  }, [pageData.pageType, pitchName]);

  const handleFormSubmit = () => {
    setPagesData((prevPages: pages) => [...prevPages, { [pageData.pageType]: pageData }]);
    setPageData({
      pageName: "",
      pageUrl: "",
      pageNumber: 0,
      pageType: "",
      _id: ""
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    imageType(pagesData);
  }, [pagesData]);

  return (
    <div>
      <p
        onClick={showModal}
        className="border border-[#21AB68] bg-[#21AB68] p-4 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit whitespace-nowrap flex items-center gap-2 cursor-pointer"
      >
        Upload
      </p>
      <div>
        {/* {pagesData?.map((data, index) => {
          const page = Object.values(data)[0];
          return (
            <div key={index}>
              <Image
                src={page.pageUrl}
                alt={`Image ${index}`}
                width={264}
                height={174}
              />
              <p>Page Name: {page.pageName}</p>
              <p>Page Type: {page.pageType}</p>
              <p>Page Number: {page.pageNumber}</p>
            </div>
          );
        })} */}
      </div>

      <Modal
        title="Update pitch Category"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="w-full flex gap-3 relative items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-fit flex flex-col items-center justify-center relative">
              <LoadingOverlay />
              <Image
                src={showUpload}
                alt="Uploaded Image"
                width={264}
                height={174}
                className="border rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={uploadCoverImage}
                className="absolute w-full h-full top-0"
                style={{ opacity: 0 }}
              />
              <p>Upload</p>
            </div>
            <p className="font-16 font-medium text-[#2E2E27] mt-4">Page Type</p>
            <SelectPageType value={handlePageType} initialValue={""} />
            <InputField
              name="pageNumber"
              label="Enter Page Number"
              placeholder="Page number"
              value={pageData.pageNumber}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleFormSubmit}
            className="border border-[#21AB68] bg-[#21AB68] px-4 py-2 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit h-fit mr-0 ml-auto whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            Upload image
          </button>
        </div>
      </Modal>
    </div>
  );
}

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
}

const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputFieldProps) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-[#C1C9C8]"
    />
  </div>
);
