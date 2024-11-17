"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { store } from "@/stores/store";
import BackButton from "@/components/blocks/BackButton";
import { ChangeEvent } from "react";
import { Input, Button } from "antd";
import axios from "@/lib/axios";
import Loading from "@/components/blocks/LoadingComponent";
import { Notification } from "@/components/blocks/Notification";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/router";
import { useNavigation } from "@/components/utils/navigations";
import { handleDeleteCategory } from "@/lib/deleteData";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";

interface FormData {
  name: string;
  description: string;
  title: string;
}

const SinglePitch = () => {
  const pathname = usePathname();
  const { fetchSingle, SingleData, token, setIsComponentLoading, componentLoading, fetchComponents,fetchIndustries, fetchStacks,fetchTypes, fetchStyles, fetchUsers } = store();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const { navigateTo } = useNavigation(); 

  // Local state for form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    title: "",
  });
    const [slug, setSlug] = useState<any>(null);
    const [type, setType] = useState<any>(null);
    const [id, setId] = useState<string>("");
    const [edit, setEdit] = useState<any>("true");

    useEffect(() => {
      const currentPage = pathname.split("/")[3];
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
  
      // Example of getting query params
      const edit = params.get('edit');
      const type = params.get('ref');
  setType(type)
  setSlug(currentPage)
setEdit(edit)

    }, [pathname]);

  useEffect(() => {
    if (slug) {
      fetchSingle(slug, type);
    }
  }, [slug, type, fetchSingle]);

  useEffect(() => {
    if (SingleData) {
      setFormData({
        name: SingleData?.data?.name || "",
        description: SingleData?.data?.description || "",
        title: SingleData?.data?.title || "",
      });
      setId(SingleData?.data?._id || "")
    }

    console.log(SingleData)
  }, [SingleData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEdit("true");
  };

  const handlePublish = async () => {
    try {
      setIsComponentLoading(true);
     await axios.patch(`${type}/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      })
        // setFormData({
        //   name: response.data.name,
        //   title: response.data.title, 
        //   description: response.data.description,
        // })
        setFormData({
          name: "",
          title: "", 
          description: "",
        })
      fetchUsers(token)
        fetchComponents(token)
        fetchTypes(token)
        fetchStacks(token)
        fetchStyles(token)
        fetchIndustries(token)
        Notification(`${type} Updated Successfully`);
        navigateTo('/categories')
    } catch (error) {
      Notification(`Error Uploading ${type}`);
      console.error(`Error Uploading ${type}: `, error);
    } finally {
      setIsComponentLoading(false);
    }
  };
  let navigate =(value: string)=>{
    fetchUsers(token)
    fetchComponents(token)
    fetchTypes(token)
    fetchStacks(token)
    fetchStyles(token)
    fetchIndustries(token)
  navigateTo('/categories')
}
  const onDeleteCat = () => {
    handleDeleteCategory(type, slug, token, navigate);
  };
  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
      <LoadingOverlay />
        <div className="w-full laptop:max-w-[700px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14">
          <div className="w-full flex justify-between items-start laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 xl:px-0 py-[40px] tablet:pt-[80px] laptop:pt-[100px]">
            <BackButton color="white" />
           <Button
              onClick={edit === "true" ? handlePublish : handleEdit}
              className="flex items-center text-white border border-green-600 bg-green-600 w-[175px] h-10 justify-center text-14 font-medium hover:bg-opacity-90 whitespace-nowrap cursor-pointer"
              disabled={componentLoading}
            >
              <span>{edit === "false" ? 'Edit' : 'Update'}</span>
              {componentLoading && <Loading width={20} height={20} color="#FFFFFF" />}
            </Button>
            
          </div>
          <div className="w-[90%] max-w-[700px] flex flex-col gap-4 tablet:gap-6 laptop:gap-8 mx-auto">
            <InputField
              name="name"
              label="Tagname"
              edit={edit === "true" ? false : true}
              placeholder="Olivia Rhye"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              name="title"
              label="Enter Title"
              edit={edit === "true" ? false : true}
              placeholder="Title ..."
              value={formData.title}
              onChange={handleChange}
            />
            <TextAreaField
              name="description"
              label="Description..."
              edit={edit === "true" ? false : true}
              placeholder="Describe Pitch deck"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={onDeleteCat}
            className="bg-[#FF6464] border-[#FF6464] w-[80%] max-w-[360px] mx-auto shadow-navbarLink inline-flex items-center justify-center p-2 text-[#ffffff] text-sm leading-5 font-normal focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePitch;

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  edit: boolean;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
}

const InputField = ({
  name,
  label,
  placeholder,
  value,
  edit,
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
      disabled={edit}
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
  edit: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = ({
  name,
  edit,
  label,
  placeholder,
  value,
  onChange,
}: TextAreaFieldProps) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <TextArea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-[121px] px-4 py-6 border border-[#C1C9C8]"
      showCount
      disabled={edit}
      style={{ resize: "none" }}
    />
  </div>
);
