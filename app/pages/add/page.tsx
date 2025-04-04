"use client";
import { ChangeEvent, useState } from "react";
import { Input, Button } from "antd";
import { useRouter } from 'next/navigation';
import axios from "@/lib/axios";
import ImageCover from "@/lib/UploadCover";
import Loading from "@/components/blocks/LoadingComponent";
import { Notification } from "@/components/blocks/Notification";
import { store } from "@/stores/store";
import { SelectIndustry } from "@/components/selections/SelectIndustry";
import { SelectComponentType } from "@/components/selections/SelectComponentType";
import { SelectStack } from "@/components/selections/SelectStack";
import { SelectMode } from "@/components/selections/SelectMode";
import TextArea from "antd/es/input/TextArea";
import MainImage from "@/lib/UploadMainImage";
import BackButton from "@/components/blocks/BackButton";
import { SelectStyle } from "@/components/selections/SelectStyle";
import { SelectType } from "@/components/selections/SelectType";
import { createSlug } from "@/components/blocks/slug";
import { useNavigation } from "@/components/utils/navigations";


export default function AddPitch() {
  const { TextArea } = Input;
  const { token, setIsComponentLoading } = store();
  const router = useRouter();
  const { navigateTo } = useNavigation();

  const [formData, setFormData] = useState({
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
        colorPalette: []
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Destructure to extract name and value
    setFormData(prevFormData => ({
      ...prevFormData, // Keep the previous form data
      [name]: value, // Only update the specific field
    }));
  };
  

  const getImage = (res: string) => {
    setFormData({ ...formData, pageCoverImage: res });
  };
   const getMainImage = (res: string) => {
    setFormData({ ...formData, pageImage: res });
  };

  const handleFormDataUpdate = (res: { name: string; value: string }) => {
    setFormData({ ...formData, [res.name]: res.value });
  };

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
      console.log(formData);
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
        colorPalette: []
      });
      Notification("Page Uploaded Successfully");
      navigateTo(`pages/${createSlug(formData.brandName)}`)
      // router.push(`pages/${createSlug(formData.brandName)}`);
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
          <p className="text-[64px] font-bold leading-[72px] tracking-[-2px] text-[#2E2E27] mx-auto w-full">
          Create page 
            </p>

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
            
            <InputField type="number" name="updatedAt" label="Date" placeholder="10" value={formData.updatedAt} onChange={handleChange} />

            <InputField type="string" name="websiteUrl" label="Website Link" placeholder="www.teslim.com" value={formData.websiteUrl} onChange={handleChange} />

            <div className="w-full flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <MainImage coverImage={getMainImage} coverPath="coverImages" uploaded={formData.pageImage} />
              {/* <ImageCover coverImage={getMainImage} coverPath="coverImages" uploaded={formData.pageImage} /> */}

            </div>
          </div>
        </div>
      </div>
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

const InputField = ({ name, label, placeholder, value, onChange, type = "text" }: InputFieldProps) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full text-16 text-grey-900  h-12 px-4 py-2 border border-[#C1C9C8]"
    />
  </div>
);

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = ({ name, label, placeholder, value, onChange }: TextAreaFieldProps) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <TextArea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full text-16 text-grey-900  h-[121px] px-4 py-6 border border-[#C1C9C8]"
      showCount
      style={{ resize: "none" }}
    />
  </div>
);

interface SelectFieldProps {
  name: string;
  label: string;
  component: React.ComponentType<{ value: (res: { name: string; value: string }) => void; initialValue: string }>;
  value: string;
  onChange: (res: { name: string; value: string }) => void;
}

const SelectField = ({ name, label, component: Component, value, onChange }: SelectFieldProps) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <Component value={onChange} initialValue={value} />
  </div>
);
