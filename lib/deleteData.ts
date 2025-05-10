import { message, Modal } from "antd";
import axios from "@/lib/axios";

export const handleDeletePage = async (
  name: string,
  id: string,
  token: string,
  navigateTo?: (path: string) => void // Optional navigateTo
): Promise<void> => {
  const { confirm } = Modal;

  confirm({
    title: "Delete Page",
    content: `Are you sure you want to delete "${name}"?`,
    okText: "Yes",
    okType: "danger",
    onOk: async () => {
      try {
        // Make DELETE request
        await axios.delete(`/page/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Show success message
        message.success(`"${name}" deleted successfully.`);

        // Optional navigation after deletion
        if (navigateTo) {
          navigateTo("/"); // Navigate to the desired path
        }
      } catch (error: any) {
        // Log and handle errors
        console.error("Error deleting page:", error);

        // Extract error message or use default
        const errorMessage =
          error.response?.data?.message || "Failed to delete the page. Please try again.";
        message.error(errorMessage);
      }
    },
    onCancel() {
      console.log("Deletion canceled");
    },
  });
};


export const handleDeleteCategory = async (
  name: string,
  id: string,
  token: string,
  navigateTo: (path: string) => void,
  title?: string,
) => {
  const { confirm } = Modal;

  confirm({
    title: "Delete Category",
    content: `Are you sure you want to delete ${title}?`,
    okText: "Yes",
    okType: "danger",
    onOk: async () => {
      try {
        await axios.delete(`/${name}/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        message.success(`${name} deleted successfully.`);
        navigateTo("/"); // Navigate only after successful deletion
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
