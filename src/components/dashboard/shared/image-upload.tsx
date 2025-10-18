"use client";

import { FC, useEffect, useState } from "react";
// Imaage
import Image from "next/image";

import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  type: "standard" | "profile" | "cover";
  dontShowPreview: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  type,
  dontShowPreview,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Check If Mounted
  if (!isMounted) {
    return null;
  }

  //Execute On Upload
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (type === "profile") {
    return (
      <div className="broder-2 relative h-52 w-52 rounded-full border-white bg-gray-200 shadow-2xl">
        {value.length > 0 && (
          <Image
            src={value[0]}
            alt=""
            width={300}
            height={300}
            className="absolute top-0 right-0 bottom-0 left-0 h-52 w-52 rounded-full object-cover"
          />
        )}
        <CldUploadWidget uploadPreset="jaytech" onSuccess={onUpload}>
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <>
                <button
                  type="button"
                  disabled={disabled}
                  className="absolute right-0 bottom-6 flex items-center rounded-full bg-[#1E90FF] p-2 text-[17px] font-medium"
                  onClick={onClick}
                >
                  <svg
                    viewBox="0 0 640 512"
                    fill="#fff"
                    height="2em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                </button>
              </>
            );
          }}
        </CldUploadWidget>
      </div>
    );
  } else {
    <div></div>;
  }
};

export default ImageUpload;
