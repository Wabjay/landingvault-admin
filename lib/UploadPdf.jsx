

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase-config";
import { Button, Upload, Form } from "antd";


  const UploadPdf = ({ pdfUploaded }) => {

    // const [form] = Form.useForm(); 

    const handlePdfUpload = async(e) => {
      const pdf = e.file

      const storageRef = ref(storage, `/pdfFiles/${Date.now()}${pdf.name}`);

      const uploadPdf = uploadBytesResumable(storageRef, pdf);

      uploadPdf.on("state_changed",
        () => {},
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const pdfUrl = await getDownloadURL(uploadPdf.snapshot.ref);
          console.log(pdfUrl)
          pdfUploaded(pdfUrl)
          
        }
    );
  }
  
 

  return (
    <Form.Item>
    <Upload onChange={handlePdfUpload}
      maxCount={1}
      listType="picture"
      beforeUpload={() => false}
    // className="avatar-uploader"
    >
      <Button>Select Pdf</Button>
    </Upload>

  </Form.Item>
  );
};

export default UploadPdf;
