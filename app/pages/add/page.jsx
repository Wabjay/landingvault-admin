"use client";
import { useState } from "react";
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
import Loading from "@/components/blocks/LoadingComponent";
import BackButton from "@/components/blocks/BackButton";
import { createSlug } from "@/components/blocks/slug";
import { Notification } from "@/components/blocks/Notification";
import { useNavigation } from "@/components/utils/navigations";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function AddPage() {
  const { token, setIsComponentLoading, fetchAllPages } = store();
  const router = useRouter();
  const { navigateTo } = useNavigation();

  const [color, setColor] = useState("");
  const [formData, setFormData] = useState({
    pageImage: null,
    pageCoverImage: null,
    brandName: "",
    brandDescription: "",
    websiteUrl: "",
    componentType: [],
    industry: [],
    stacks: [],
    style: [],
    type: [],
    mode: "light",
    colorPalette: "",
  });

  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Modified image upload handler with better logging
  const handleImageUpload = (type) => ({ file }) => {
    if (file) {
      console.log(`Uploading ${type} image:`, file.name, file.size, file.type);
      setFormData(prevFormData => ({
        ...prevFormData,
        [type === 'cover' ? 'pageCoverImage' : 'pageImage']: file
      }));
    } else {
      console.log(`No file selected for ${type} image`);
    }
  };

  const handleFormDataUpdate = (res) => {
    setFormData({ ...formData, [res.name]: res.value });
  };

  const handlePublish = async () => {
    const updatedTitle = formData.componentType[0]
      .toLowerCase()
      .replace("page", "")
      .trim();

    let brandName = formData.brandName.replace(/\s+/g, " ").trim();

    // const payload = new FormData();
    
    // if (formData.pageCoverImage) {
    //   console.log('Appending cover image:', formData.pageCoverImage.name);
    //   payload.append('pageCoverImage', formData.pageCoverImage);
    // }
    // if (formData.pageImage) {
    //   console.log('Appending main image:', formData.pageImage.name);
    //   payload.append('pageImage', formData.pageImage);
    // }
    // payload.append('brandName', formData.brandName);
    // payload.append('brandDescription', formData.brandDescription);
    // payload.append('websiteUrl', formData.websiteUrl);
    // payload.append('componentType', formData.componentType);
    // payload.append('industry', formData.industry);
    // payload.append('stacks', formData.stacks);
    // payload.append('style', formData.style);
    // payload.append('type', formData.type);
    // payload.append('mode', formData.mode);
    // payload.append('colorPalette', formData.colorPalette);

    // Log the payload contents
    // console.log('FormData contents:');
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    if (!urlPattern.test(formData.websiteUrl)) {
      Notification("Please enter a valid website URL");
      return;
    }

    if (!formData.brandName || !formData.brandDescription) {
      Notification("Brand Name and Description are required");
      return;
    }

    try {
      setIsComponentLoading(true);
    //   console.log('Appending cover image:', formData.pageCoverImage.name);

      const response = await axios.post("/page/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": "true",
        },
      });

      console.log('Upload response:', response.data.page);

      const { data } = response;
      const newPageSlug = data.page.id || createSlug(payload.get('brandName'));

      setFormData({
        pageImage: null,
        pageCoverImage: null,
        brandName: "",
        brandDescription: "",
        websiteUrl: "",
        componentType: [],
        industry: [],
        stacks: [],
        style: [],
        type: [],
        mode: "light",
        colorPalette: "",
      });

      Notification("Page Uploaded Successfully");
      fetchAllPages();
      navigateTo(`/pages/${newPageSlug}`);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      Notification(`Error Uploading Page: ${error.message}`);
    } finally {
      setIsComponentLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[900px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14">
          <div className="w-full flex sticky top-[-20px] tablet:top-[-60px] z-50 bg-white justify-between items-start mx-auto px-4 tablet:px-6 laptop:px-0 pb-5 pt-10 tablet:pt-[80px]">
            <BackButton to="/pages" color="white" />
            <Button onClick={handlePublish} className="flex items-center gap-2 border border-[#000] bg-[#000] px-4 py-2 text-16 text-[#FFFFFF] hover:bg-opacity-90 w-fit h-fit mr-0 ml-auto whitespace-nowrap cursor-pointer">
              <span>Update Page</span> <Loading width={20} height={20} color="#FFFFFF" />
            </Button>
          </div>
          <p className="text-[64px] font-bold leading-[72px] tracking-[-2px] text-[#2E2E27] mx-auto w-full">
            Create page
          </p>

          <div className="w-full px-4 tablet:px-6 laptop:px-0 flex flex-col gap-4 tablet:gap-6 laptop:gap-8 mx-auto">
            {/* Modified Cover Image Upload */}
            <div className="w-full overflow-hidden flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => {
                  console.log('Before upload check:', file);
                  return true;
                }}
                customRequest={({ file, onSuccess, onError }) => {
                  try {
                    handleImageUpload('cover')({ file });
                    setTimeout(() => onSuccess("ok"), 0); // Simulate async upload
                  } catch (err) {
                    console.error('Upload error:', err);
                    onError(err);
                  }
                }}
              >
                {formData.pageCoverImage ? (
                  <img 
                    src={URL.createObjectURL(formData.pageCoverImage)} 
                    alt="Cover preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                )}
              </Upload>
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
              value={formData.colorPalette }
              onChange={handleChange}
            />

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
            
            {/* Modified Main Image Upload */}
            <div className="w-full overflow-hidden flex flex-col gap-4 bg-white h-[342px] items-center justify-center border border-dashed border-[#D2D2CF]">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => {
                  console.log('Before upload check:', file);
                  return true;
                }}
                customRequest={({ file, onSuccess, onError }) => {
                  try {
                    handleImageUpload('main')({ file });
                    setTimeout(() => onSuccess("ok"), 0); // Simulate async upload
                  } catch (err) {
                    console.error('Upload error:', err);
                    onError(err);
                  }
                }}
              >
                {formData.pageImage ? (
                  <img 
                    src={URL.createObjectURL(formData.pageImage)} 
                    alt="Main preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Button icon={<UploadOutlined />}>Upload Main Image</Button>
                )}
              </Upload>
            </div>
            
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

// Input Field Component
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

// Text Area Component
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

// Select Field Component
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