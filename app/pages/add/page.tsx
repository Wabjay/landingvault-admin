"use client";
import { useState, ChangeEvent } from "react";
import { Button, Input, message } from "antd";
import { useRouter } from 'next/navigation';
import axios from "@/lib/axios";
import { store } from "@/stores/store";
import { SelectIndustry } from "@/components/selections/SelectIndustry";
import { SelectComponentType } from "@/components/selections/SelectComponentType";
import { SelectStack } from "@/components/selections/SelectStack";
import { SelectMode } from "@/components/selections/SelectMode";
import TextArea from "antd/es/input/TextArea";
import { SelectStyle } from "@/components/selections/SelectStyle";
import { SelectType } from "@/components/selections/SelectType";
import ImageCover from "@/lib/UploadCover";
import MainImage from "@/lib/UploadMainImage";
import Loading from "@/components/blocks/LoadingComponent";
import BackButton from "@/components/blocks/BackButton";
import { createSlug } from "@/components/blocks/slug";
import { Notification } from "@/components/blocks/Notification";
import { useNavigation } from "@/components/utils/navigations";

// Define types for form data
interface FormData {
  pageImage: string;
  pageCoverImage: string;
  brandName: string;
  brandDescription: string;
  websiteUrl: string;
  componentType: string[];
  industry: string[];
  stacks: string[];
  style: string[];
  type: string[];
  mode: string;
  colorPalette: string[];
}

export default function AddPage() {
  const { token, setIsComponentLoading } = store();
  const router = useRouter();
  const { navigateTo } = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    pageImage: "",
    pageCoverImage: "",
    brandName: "",
    brandDescription: "",
    websiteUrl: "",
    componentType: [],
    industry: [],
    stacks: [],
    style: [],
    type: [],
    mode: "light",
    colorPalette: [],
  });

  // Handle change for input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
 

  // Handle image upload
  const getImage = (res: string) => {
    setFormData({ ...formData, pageCoverImage: res });
  };

  const getMainImage = (res: string) => {
    setFormData({ ...formData, pageImage: res });
  };

  // Handle update for form data from select components
  const handleFormDataUpdate = (res: { name: string; value: string[] | string }) => {
    setFormData({ ...formData, [res.name]: res.value });
  };

  // Handle form submission (upload)
  const handlePublish = async () => {
    try {
      setIsComponentLoading(true);
      await axios.post("/page", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      });

      // Reset form on success
      setFormData({
        pageImage: "",
        pageCoverImage: "",
        brandName: "",
        brandDescription: "",
        websiteUrl: "",
        componentType: [],
        industry: [],
        stacks: [],
        style: [],
        type: [],
        mode: "light",
        colorPalette: [],
      });

      Notification("Page Uploaded Successfully");
      navigateTo(`/pages/${createSlug(formData.brandName)}`);
    } catch (error) {
      Notification("Error Uploading Pitch");
      console.error("Error uploading pitch:", error);
    } finally {
      setIsComponentLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[900px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14">
          <div className="w-full flex justify-between items-start mx-auto px-4 tablet:px-6 laptop:px-0 pt-[40px] tablet:pt-[80px]">
            <BackButton color="white"/>
            <Button onClick={handlePublish} className="flex items-center gap-2 border border-[#000] bg-[#000] px-4 py-2 text-16 text-[#FFFFFF] hover:bg-opacity-90 w-fit h-fit mr-0 ml-auto whitespace-nowrap cursor-pointer">
              <span>Save and upload</span> <Loading width={20} height={20} color="#FFFFFF"/>
            </Button>
          </div>
          <p className="text-[64px] font-bold leading-[72px] tracking-[-2px] text-[#2E2E27] mx-auto w-full">Create page</p>

          <div className="w-full px-4 tablet:px-6 laptop:px-0 flex flex-col gap-4 tablet:gap-6 laptop:gap-8 mx-auto">
            <div className="w-full flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <ImageCover coverImage={getImage} coverPath="coverImages" uploaded={formData.pageCoverImage} />
            </div>

            <InputField name="brandName" label="Enter website name" placeholder="Title..." value={formData.brandName} onChange={handleChange} />

            <TextAreaField name="brandDescription" label="About" placeholder="Describe Pitch deck" value={formData.brandDescription} onChange={handleChange} />

            <SelectField name="industry" label="Industry" component={SelectIndustry} value={formData.industry} onChange={handleFormDataUpdate} />
            <SelectField name="componentType" label="Component Type" component={SelectComponentType} value={formData.componentType} onChange={handleFormDataUpdate} />
            <SelectField name="stacks" label="Stack" component={SelectStack} value={formData.stacks} onChange={handleFormDataUpdate} />
            <SelectField name="mode" label="Mode" component={SelectMode} value={formData.mode} onChange={handleFormDataUpdate} />
            <SelectField name="style" label="Style" component={SelectStyle} value={formData.style} onChange={handleFormDataUpdate} />
            <SelectField name="type" label="Type" component={SelectType} value={formData.type} onChange={handleFormDataUpdate} />

            {/* <InputField type="number" name="updatedAt" label="Date" placeholder="10" value={formData.updatedAt} onChange={handleChange} /> */}
            <InputField type="string" name="websiteUrl" label="Website Link" placeholder="www.teslim.com" value={formData.websiteUrl} onChange={handleChange} />

            <div className="w-full flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <MainImage coverImage={getMainImage} coverPath="coverImages" uploaded={formData.pageImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Input Field Component with TypeScript
const InputField = ({ name, label, placeholder, value, onChange, type = "text" }: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full text-16 text-grey-900 h-12 px-4 py-2 border border-[#C1C9C8]"
    />
  </div>
);

// Text Area Component with TypeScript
const TextAreaField = ({ name, label, placeholder, value, onChange }: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <TextArea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full text-16 text-grey-900 h-[121px] px-4 py-6 border border-[#C1C9C8]"
      showCount
      style={{ resize: "none" }}
    />
  </div>
);

// Select Field Component with TypeScript
const SelectField = ({ name, label, component: Component, value, onChange }: {
  name: string;
  label: string;
  component: React.ComponentType<{ value: (res: { name: string; value: string[] }) => void; initialValue: string[] | string }>;
  value: string[] | string;
  onChange: (res: { name: string; value: string[] }) => void;
}) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <Component value={onChange} initialValue={value} />
  </div>
);
