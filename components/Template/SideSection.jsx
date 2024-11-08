import React from "react";
import { store } from "../../store";
import { Link } from "react-router-dom";
import moment from "moment";
import Skeleton from "../Skeleton";
import HiddenText from "../HiddenText";
import { createSlug } from "../slug";
import { Modal } from "antd";
import axios from "@/lib/axios";
import { useNavigate } from 'react-router-dom';

export default function SideSection() {
  const { template, token } = store();

  const { confirm } = Modal;
  const navigate = useNavigate();

  const deleteTemplate = async (id) => {
    confirm({
      title: "Delete Template ",
      content: "Delete Template?",
      okText: "Yes",
      okType: "danger",
      async onOk() {
        try {
          const res = await axios.delete(
            `https://api.pitchdeck.design/templates/delete/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = res?.data 
          console.log(response)
          navigate('/templates');
       
        } catch (err) {
       
        console.log(err);
        }
      },
      onCancel() {},
    });
  };


  return (
    <div className="laptop:sticky laptop:top-[80px] p-6 text-[#2E2E27] bg-white-1 laptop:h-fit laptop:mt-[-34px] w-full laptop:basis-big desktop:basis-large pb-4 laptop:pb-[100px]">
      <p className="text-24 font-bold mb-2">
        <Skeleton>{template?.name}</Skeleton>
      </p>
      <p className="text-[16px] leading-6 mb-2 flex items-center laptop:block desktop:flex">
        <Skeleton>
          {" "}
          Uploaded on {moment(template?.createdAt).format("MMM Do YY")}{" "}
        </Skeleton>
      </p>
      <p className="text-16 font-bold text-[#2E2E27] mb-1">
        <Skeleton>About template</Skeleton>
      </p>
      <p className="text-[16px] leading-6 mb-4">
        <Skeleton>
          <HiddenText text={template?.about} maxLength={150} />
        </Skeleton>
      </p>

      <p className="text-16 font-bold text-[#2E2E27] mb-1">
        <Skeleton>Page highlights</Skeleton>
      </p>
      <p className="text-[16px] leading-6 mb-6">
        <Skeleton>
          <HiddenText text={template?.pageHighlights} maxLength={150} />
        </Skeleton>
      </p>

      <div className="flex flex-col gap-4 p-3 bg-[#F2F1E8] border border-[#CCC8A4] mb-10">
        <div className="flex gap-2">
          <p className="w-[115px] whitespace-nowrap text-14 leading-6 font-normal">
            <Skeleton>No of Pages: </Skeleton>
          </p>
          <p className="w-full text-14 leading-6 font-semibold">
            <Skeleton> {template?.numberOfPages} pages </Skeleton>
          </p>
        </div>
        <div className="flex gap-2">
          <p className="w-[115px] whitespace-nowrap text-14 leading-6 font-normal">
            <Skeleton>Deliverables</Skeleton>
          </p>
          <p className="w-full text-14 leading-6 font-semibold">
            <Skeleton> {template?.deliverables.toString()}</Skeleton>
          </p>
        </div>
        <div className="flex gap-2">
          <p className=" w-fit text-14 leading-6 font-normal">
            <Skeleton>Price</Skeleton>
          </p>
          <p className="w-full flex text-14 leading-6 font-semibold capitalize">
            <Skeleton>{template?.cost.naira}</Skeleton>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7.5" cy="8.97321" r="1.5" fill="#2E2E27" />
              </svg>
            <Skeleton>{template?.cost.dollar}</Skeleton>
          </p>
        </div>
      </div>
      <div className="">
        <Skeleton>
          <Link
            href={template?.linkToPurchase}
            className="mb-10 bg-[#21AB68] border-[#21AB68] shadow-navbarLink inline-flex items-center justify-center p-2  text-[#ffffff]  text-sm leading-5 font-normal focus:outline-none "
          >
            {" "}
            Buy This Template{" "}
          </Link>
        </Skeleton>
        <div className="flex gap-3">
          <Skeleton>
            <Link
              to={`/edittemplate/${createSlug(template?.name)}`}
              className="bg-[#3E7B52] border-[#3E7B52] shadow-navbarLink inline-flex items-center justify-center p-2  text-[#ffffff]  text-sm leading-5 font-normal focus:outline-none "
            >
              {" "}
              Update{" "}
            </Link>
          </Skeleton>
          <Skeleton>
            <button
              onClick={() => {
                deleteTemplate(template._id);
              }}
              className="bg-[#FF6464] border-[#FF6464] shadow-navbarLink inline-flex items-center justify-center p-2  text-[#ffffff]  text-sm leading-5 font-normal focus:outline-none "
            >
              {" "}
              Delete{" "}
            </button>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
