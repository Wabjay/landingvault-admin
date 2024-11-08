import { store } from "@/stores/store";
import { Modal } from "antd";


export const handleLogout = ( ) => {
    const { confirm } = Modal;
    const { setToken } = store();

    const logOut =(navigateTo: (path: string) => void)=>{
          confirm({
      title: "Log Out",
      content: `Are you sure you want to logout?`,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setToken(''); // Assuming setToken(null) clears the token
        navigateTo('/'); // Redirect to the login page after logout
      },
      onCancel() {
        // Handle cancellation if needed
      },
    });
    }

    return {
        logOut
    }
  };