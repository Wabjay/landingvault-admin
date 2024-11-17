// deleteData.ts

import { message, Modal } from "antd";
import axios from "@/lib/axios";
import { store } from "@/stores/store";

export const handleDeletePage = async (name: string, id: string, token: string, navigateTo: (path: string) => void) => {
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
console.log(id)

  confirm({
    title: "Delete page",
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
        message.success(`${name} deleted successfully.`);
        navigateTo('/');
      } catch (error) {
        console.error("Error deleting page:", error);
        message.error("Failed to delete the page. Please try again.");
        // Handle error state or display error message to the user
      }
    },
    onCancel() {
      // Handle cancellation if needed
    },
  });
};



export const handleDeleteCategory = async (name: string, id: string, token: string, navigateTo: (path: string) => void) => {
  const { confirm } = Modal;

  confirm({
    title: "Delete Category",
    content: `Are you sure you want to delete ${name}?`,
    okText: "Yes",
    okType: "danger",
    onOk: async () => {
      try {
        await axios.delete(`/${name}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        message.success(`${name} deleted successfully.`);
        navigateTo('/');
      } catch (error) {
        console.error("Error deleting category:", error);
        message.error("Failed to delete the category. Please try again.");
      }
    },
    onCancel() {
      console.log("Deletion canceled");
    },
  });
};



