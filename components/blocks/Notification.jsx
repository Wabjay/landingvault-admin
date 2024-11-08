import { notification } from 'antd';

export const Notification = (message) => {

// const success = {
//   status: "Successful",
//   message: "Successful",

// }

  notification.open({
    message: message,
    // description: message,
  });
};