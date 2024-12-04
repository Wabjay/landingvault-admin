"use client";
import { useState, ChangeEvent } from "react";
import { Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
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
// interface FormData {
//   pageImage: string;
//   pageCoverImage: string;
//   brandName: string;
//   brandDescription: string;
//   websiteUrl: string;
//   componentType: string[];
//   industry: string[];
//   stacks: string[];
//   style: string[];
//   type: string[];
//   mode: string;
//   colorPalette: string[];
// }

export default function AddPage() {
  const { token, setIsComponentLoading, fetchAllPages } = store();
  const router = useRouter();
  const { navigateTo } = useNavigation();

  const [color, setColor] = useState("");

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
    colorPalette: [],
  });

  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "colorPalette") {
      const newValue = value.split(",");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue.map((color) => color.trim()),
      }));
      setColor(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Handle image upload
  const getImage = (res) => {
    setFormData({ ...formData, pageCoverImage: res,  pageImage: res  });
  };

  // const getMainImage = (res: string) => {
  //   setFormData({ ...formData, pageImage: res });
  // };

  // Handle update for form data from select components
  const handleFormDataUpdate = (res) => {
    setFormData({ ...formData, [res.name]: res.value });
  };

  const handlePublish = async () => {

    const updatedTitle = formData.componentType[0]
    .toLowerCase()
    .replace("page", "")
    .trim();
    // Creating the payload with the updated brandName
    const payload = {
      ...formData,
      brandName: formData.brandName +" "+ updatedTitle // Dynamically setting the updated brandName
    };

    // Validate the website URL
    if (!urlPattern.test(formData.websiteUrl)) {
      Notification("Please enter a valid website URL");
      return;
    }

    // Validate required fields
    if (!formData.brandName || !formData.brandDescription) {
      Notification("Brand Name and Description are required");
      return;
    }

    try {
      setIsComponentLoading(true); // Show loading state
// console.log(payload)
      // Make API call to create the page
      const response = await axios.post("/page", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      });

      // Extract the created page slug or ID from the response
      const { data } = response;
      // const newPageSlug = createSlug(payload.brandName);
      const newPageSlug = data.slug || createSlug(payload.brandName);

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

      Notification("Page Uploaded Successfully"); // Show success message
      fetchAllPages(); // Refresh page list

      // Navigate to the newly created page
      navigateTo(`/pages/${newPageSlug}`);
    } catch (error) {
      // Handle errors gracefully
      Notification("Error Uploading Page");
      console.error("Error uploading Page:", error);
    } finally {
      setIsComponentLoading(false); // Hide loading state
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[900px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14">
        <div className="w-full flex sticky top-[-20px] tablet:top-[-60px] z-50 bg-white justify-between items-start mx-auto px-4 tablet:px-6 laptop:px-0 pb-5 pt-10 tablet:pt-[80px]">
            <BackButton color="white" />
            <Button onClick={handlePublish} className="flex items-center gap-2 border border-[#000] bg-[#000] px-4 py-2 text-16 text-[#FFFFFF] hover:bg-opacity-90 w-fit h-fit mr-0 ml-auto whitespace-nowrap cursor-pointer">
              <span>Update Page</span> <Loading width={20} height={20} color="#FFFFFF" />
            </Button>
          </div>
          <p className="text-[64px] font-bold leading-[72px] tracking-[-2px] text-[#2E2E27] mx-auto w-full">
            Create page
          </p>

          <div className="w-full px-4 tablet:px-6 laptop:px-0 flex flex-col gap-4 tablet:gap-6 laptop:gap-8 mx-auto">
            <div className="w-full overflow-hidden flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <ImageCover
                coverImage={getImage}
                coverPath="coverImages"
                uploaded={formData.pageCoverImage}
              />
            </div>

            <InputField
              name="brandName"
              label="Enter website name"
              placeholder="Title..."
              value={formData.brandName}
              onChange={handleChange}
            />

            <TextAreaField
              name="brandDescription"
              label="About"
              placeholder="Describe Pitch deck"
              value={formData.brandDescription}
              onChange={handleChange}
            />

            <SelectField
              name="industry"
              label="Industry"
              component={SelectIndustry}
              value={formData.industry}
              onChange={handleFormDataUpdate}
            />
            <SelectField
              name="componentType"
              label="Component Type"
              component={SelectComponentType}
              value={formData.componentType}
              onChange={handleFormDataUpdate}
            />
            <SelectField
              name="stacks"
              label="Stack"
              component={SelectStack}
              value={formData.stacks}
              onChange={handleFormDataUpdate}
            />
            <SelectField
              name="mode"
              label="Mode"
              component={SelectMode}
              value={formData.mode}
              onChange={handleFormDataUpdate}
            />
            <SelectField
              name="style"
              label="Style"
              component={SelectStyle}
              value={formData.style}
              onChange={handleFormDataUpdate}
            />
            <SelectField
              name="type"
              label="Type"
              component={SelectType}
              value={formData.type}
              onChange={handleFormDataUpdate}
            />
            <InputField
              name="colorPalette"
              label="Enter Colors"
              placeholder="colors..."
              value={color}
              onChange={handleChange}
            />

            {/* <InputField type="number" name="updatedAt" label="Date" placeholder="10" value={formData.updatedAt} onChange={handleChange} /> */}
            <InputField
              type="string"
              name="websiteUrl"
              label="Website Link"
              placeholder="www.teslim.com"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
            {(formData.websiteUrl.length > 5 && !urlPattern.test(formData.websiteUrl) ) && (
              <p className="text-red text-12 mt-[-12px] tablet:mt-[-20px] laptop:gmt-[-28px]">
                Please enter a valid website URL
              </p>
            )}
            {/* <div className="w-full overflow-hidden flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <MainImage
                coverImage={getMainImage}
                coverPath="coverImages"
                uploaded={formData.pageImage}
              />
            </div> */}
            <Button
              onClick={handlePublish}
              className="flex items-center gap-2 border border-[#000] bg-[#000] px-4 py-2 text-16 text-[#FFFFFF] hover:bg-opacity-90 w-fit h-fit mr-0 ml-auto whitespace-nowrap cursor-pointer"
            >
              <span>Save and upload</span>{" "}
              <Loading width={20} height={20} color="#FFFFFF" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Input Field Component with TypeScript
const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
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
const TextAreaField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
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
const SelectField = ({
  name,
  label,
  component: Component,
  value,
  onChange,
}) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <Component value={onChange} initialValue={value} />
  </div>
);
