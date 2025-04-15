"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Button } from "antd";
import axios from "@/lib/axios";
import Loading from "@/components/blocks/LoadingComponent";
import { Notification } from "@/components/blocks/Notification";
import { store } from "@/stores/store";
import TextArea from "antd/es/input/TextArea";
import BackButton from "@/components/blocks/BackButton";
import { SelectCategoryType } from "@/components/selections/SelectCategoryType";
import Categories from '../[id]/page';
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  description: string;
  title: string;
  category: string;
}

export default function AddCategory() {
  const { TextArea } = Input;
  const {setIsComponentLoading, fetchComponents,fetchIndustries, fetchStacks,fetchTypes, fetchStyles, fetchUsers, token} = store()
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    title: "",
    category: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormDataUpdate = (res: { name: string; value: string[] | string }) => {
    setFormData({ ...formData, [res.name]: res.value });
  };


  const handlePublish = async () => {
    try {
      setIsComponentLoading(true);
      const payload = {
        name: formData.name,
        description: formData.description,
        title: formData.title,
      }
      await axios.post(`${formData.category}/create`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      });
      console.log(formData);
      setFormData({
        name: "",
        title: "",
        description: "",
        category: ""

      });
        fetchUsers(token)
        fetchComponents()
        fetchTypes()
        fetchStacks()
        fetchStyles()
        fetchIndustries()

        router.push(`/categories`);

        Notification("Category Added Successfully");
    } catch (error) {
      Notification("Error Uploading Category");
      console.error("Error uploading Category:", error);
    } finally {
      setIsComponentLoading(false);
    }
  };


  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[700px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14">
          <div className="w-full flex justify-between items-start laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 xl:px-0 py-[40px] tablet:pt-[80px] laptop:pt-[100px]">
            <BackButton color="white"/>
           
          </div>
          <div className="w-[90%] max-w-[700px] flex flex-col gap-4 tablet:gap-6 laptop:gap-8 mx-auto">

          <SelectField name="category" label="Type" component={SelectCategoryType} value={formData.category} onChange={handleFormDataUpdate} />

            <InputField name="name" label="Tagname" placeholder="Olivia Rhye" value={formData.name} onChange={handleChange} />

            <InputField name="title" label="Enter Title" placeholder="Title ..." value={formData.title} onChange={handleChange} />

            <TextAreaField name="description" label="Description..." placeholder="Describe Pitch deck" value={formData.description} onChange={handleChange} />

            </div>
            <Button onClick={handlePublish} className="flex items-center mx-auto text-white border border-green-600 bg-green-600 w-[175px] h-10 justify-center text-14 font-medium hover:bg-opacity-90  whitespace-nowrap cursor-pointer">
              <span className="">Save and upload</span> <Loading width={20} height={20} color="#FFFFFF" />
            </Button>
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
      className="w-full px-4 py-2 border border-[#C1C9C8]"
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
      className="w-full h-[121px] px-4 py-6 border border-[#C1C9C8]"
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
