// deleteData.ts

import { Modal } from "antd";
import axios from "@/lib/axios";

export const handleDeletePitch = async (name: string, id: string, token: string, navigateTo: (path: string) => void) => {
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
console.log(id)

  confirm({
    title: "Delete Pitch",
    content: `Are you sure you want to delete ${name}?`,
    okText: "Yes",
    okType: "danger",
    onOk: async () => {
      try {
        await axios.delete(`/page/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        navigateTo('/');
      } catch (error) {
        console.error("Error deleting pitch:", error);
        // Handle error state or display error message to the user
      }
    },
    onCancel() {
      // Handle cancellation if needed
    },
  });
};



export const handleDeleteTemplate = async (name: string, id: string, token: string, navigateTo: (path: string) => void) => {
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
console.log(id)

  confirm({
    title: "Delete Template",
    content: `Are you sure you want to delete ${name}?`,
    okText: "Yes",
    okType: "danger",
    onOk: async () => {
      try {
        await axios.delete(`/template/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        navigateTo('/templates');
      } catch (error) {
        console.error("Error deleting template:", error);
        // Handle error state or display error message to the user
      }
    },
    onCancel() {
      // Handle cancellation if needed
    },
  });
};
