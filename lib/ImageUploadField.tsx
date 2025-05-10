import { useState } from "react";

interface ImageUploadFieldProps {
  name: string;
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ name, label, value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(value ? URL.createObjectURL(value) : null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);

    // Generate preview URL
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-16 text-grey-900 h-12 px-4 py-2 border border-[#C1C9C8]"
      />
      {preview && <img src={preview} alt="Preview" className="w-full h-auto mt-2 rounded-lg" />}
    </div>
  );
};

export default ImageUploadField;
