"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input, Button } from "antd";
import axios from "@/lib/axios";
import ImageCover from "@/lib/UploadCover";
import MainImage from "@/lib/UploadMainImage";
import Loading from "@/components/blocks/LoadingComponent";
import { Notification } from "@/components/blocks/Notification";
import { store } from "@/stores/store";
import TextArea from "antd/es/input/TextArea";
import { usePathname, useRouter } from "next/navigation";
import BackButton from "@/components/blocks/BackButton";
import { SelectIndustry } from "@/components/selections/SelectIndustry";
import { SelectComponentType } from "@/components/selections/SelectComponentType";
import { SelectStack } from "@/components/selections/SelectStack";
import { SelectMode } from "@/components/selections/SelectMode";
import { SelectStyle } from "@/components/selections/SelectStyle";
import { SelectType } from "@/components/selections/SelectType";
import { createSlug } from "@/components/blocks/slug";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";

// Define types
interface Page {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export default function UpdatePage() {
  const { token, setIsComponentLoading, fetchSinglePage, page: pageData } = store();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const pageName = pathname.split("/")[3]?.toLowerCase();
    if (pageName) {
      fetchSinglePage(pageName);
    }
  }, [fetchSinglePage, pathname]);

  const [error, setError] = useState<String>("")
  const [color, setColor] = useState<string>("")

    const [formData, setFormData] = useState<Page>({
    _id: "",
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
    mode: "light", // Default mode
    colorPalette: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    id: "",
  });

  useEffect(() => {
    if (pageData) {
      const page = pageData?.data[0];
      setFormData({
        ...formData,
        ...page,
      });
      const colors = page.colorPalette.join(", ")
      setColor(colors)
    }
  }, []);


  
       // URL validation for websiteUrl field
  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === "colorPalette"){
      const newValue = value.split(",")
       setFormData({
        ...formData, [name]: newValue.map(color => color.trim()),
        });
        setColor(value)
    }else{
    setFormData({ ...formData, [name]: value });
  }
};

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getImage = (res: string) => {
    setFormData({ ...formData, pageCoverImage: res });
  };

  const getMainImage = (res: string) => {
    setFormData({ ...formData, pageImage: res });
  };

  const handleFormDataUpdate = (res: { name: string; value: string[] | string }) => {
    setFormData({ ...formData, [res.name]: res.value });
  };

  const handlePublish = async () => {
    if(!urlPattern.test(formData.websiteUrl)){
      Notification("Please enter a valid website URL");
    }
    else {
    try {
      setIsComponentLoading(true);
      await axios.patch(`/page/${pageData?.data[0]._id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        _id: "",
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
        createdAt: "",
        updatedAt: "",
        __v: 0,
        id: "",
      });
      fetchSinglePage(createSlug(formData.brandName))
      router.push(`/pages/${createSlug(formData.brandName)}`);
      Notification("Page Updated Successfully");
    } catch (error) {
      Notification("Error Updating Page");
      console.error("Error updating page:", error);
    } finally {
      setIsComponentLoading(false);
    }
  }
};

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
      <LoadingOverlay />
        <div className="w-full laptop:max-w-[700px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14">
          <div className="w-full flex justify-between items-start mx-auto px-4 tablet:px-6 laptop:px-0 py-[40px] tablet:pt-[80px]">
            <BackButton color="white" />
            <Button onClick={handlePublish} className="flex items-center gap-2 border border-[#000] bg-[#000] px-4 py-2 text-16 text-[#FFFFFF] hover:bg-opacity-90 w-fit h-fit mr-0 ml-auto whitespace-nowrap cursor-pointer">
              <span>Update Page</span> <Loading width={20} height={20} color="#FFFFFF" />
            </Button>
          </div>

          <p className="text-[64px] font-bold leading-[72px] tracking-[-2px] text-[#2E2E27] mx-auto w-full">Edit Page</p>

          <div className="w-full px-4 tablet:px-6 laptop:px-0 flex flex-col gap-4 tablet:gap-6 laptop:gap-8 mx-auto">
            <div className="w-full overflow-hidden flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <ImageCover coverImage={getImage} coverPath="coverImages" uploaded={formData.pageCoverImage} />
            </div>

            <InputField name="brandName" label="Enter website name" placeholder="Title..." value={formData.brandName} onChange={handleChange} />

            <TextAreaField name="brandDescription" label="About" placeholder="Describe Pitch deck" value={formData.brandDescription} onChange={handleTextChange} />

            <SelectField name="componentType" label="Component Type" component={SelectComponentType} value={formData.componentType} onChange={handleFormDataUpdate} />
            <SelectField name="industry" label="Industry" component={SelectIndustry} value={formData.industry} onChange={handleFormDataUpdate} />
            <SelectField name="stacks" label="Stack" component={SelectStack} value={formData.stacks} onChange={handleFormDataUpdate} />
            <SelectField name="mode" label="Mode" component={SelectMode} value={formData.mode} onChange={handleFormDataUpdate} />
            <SelectField name="style" label="Style" component={SelectStyle} value={formData.style} onChange={handleFormDataUpdate} />
            <SelectField name="type" label="Type" component={SelectType} value={formData.type} onChange={handleFormDataUpdate} />
            <InputField name="colorPalette" label="Enter Colors" placeholder="colors..." value={color} onChange={handleChange} />

            <InputField name="websiteUrl" label="Website Link" placeholder="www.teslim.com" value={formData.websiteUrl} onChange={handleChange} />
              {(!urlPattern.test(formData.websiteUrl))  && <p className="text-red text-12 mt-[-12px] tablet:mt-[-20px] laptop:gmt-[-28px]">Please enter a valid website URL</p>}
            <div className="w-full overflow-hidden flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <MainImage coverImage={getMainImage} coverPath="coverImages" uploaded={formData.pageImage} />
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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
      className="w-full text-16 text-grey-900 h-12 px-4 py-2 border border-[#C1C9C8]"
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
      className="w-full text-16 text-grey-900 h-[121px] px-4 py-6 border border-[#C1C9C8]"
      showCount
      style={{ resize: "none" }}
    />
  </div>
);

interface SelectFieldProps {
  name: string;
  label: string;
  component: React.ComponentType<{ value: (res: { name: string; value: string[] }) => void; initialValue: string[] | string }>;
  value: string[] | string;
  onChange: (res: { name: string; value: string[] | string }) => void;
}

const SelectField = ({ name, label, component: Component, value, onChange }: SelectFieldProps) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <Component
      value={(res) => onChange({ name, value: res.value })}
      initialValue={value}
    />
  </div>
);
