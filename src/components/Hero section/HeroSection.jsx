"use client";
import { Button, Modal, Upload } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";

const HeroSection = () => {
  const { Dragger } = Upload;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleUpload = () => {
    if (fileList.length === 0) {
      console.error("Please upload a file first.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileList[0]);
    console.log("file", fileList[0]);
    let apiEndpoint = "";
    // Determine file type and set API endpoint
    if (fileList[0].type.startsWith("image/")) {
      console.log("It is an image");
      apiEndpoint = "";
    } else if (fileList[0].type.startsWith("video/")) {
      console.log("It is a video");
      apiEndpoint = "";
    } else {
      console.log("Invalid file type. Please upload an image or video.");
      return;
    }
    fetch(apiEndpoint, {
      method: "POST",
      body: formData,
      // headers: {
      //   "content-type": "application/json",
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        setUploading(false);
        console.success("File uploaded successfully!");
      })
      .catch((error) => {
        setUploading(false);
        console.error("File upload failed.", error);
      });
  };
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const uploadProps = {
    disabled: fileList.length > 0 ? true : false,
    name: "file",
    multiple: false,
    action: "",
    listType: "picture",
    beforeUpload(file) {
      if (file.size > MAX_FILE_SIZE) {
        console.log("File is too large! Maximum size is 10MB.");
        return Upload.LIST_IGNORE;
      }
      // console.log("file size!!!!!: ", file.size);
      return true;
    },
    onChange(info) {
      const { file, fileList: updatedFileList } = info;
      console.log("type: ", file);
      const { status } = file;
      if (status === "done") {
        setFileList([...updatedFileList]);
      } else if (status === "error") {
        console.log(`${file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setFileList((prevFileList) =>
        prevFileList.filter((item) => item.uid !== file.uid)
      );
    },
    disabled: fileList.length >= 1,
  };

  return (
    <div className="flex justify-between items-center gap-4 px-40 pt-24 pb-12">
      <div className="left flex flex-col items-start">
        <h2 className="text-[#5777BA] text-[45px] font-bold mb-2">
          DeepFake Detect
        </h2>
        <p className="text-[#515f7d] text-xl mb-2">
          Upload an image or video to test for possible deepfakes
        </p>
        <button
          className="border-2 rounded border-slate-200 cursor-pointer px-4 py-2 hover:bg-slate-200 text-[#515f7d]"
          onClick={() => showModal()}
        >
          Get Started
        </button>
        <Modal
          title={null}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={600}
          style={{
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <Dragger
            {...uploadProps}
            style={{ padding: "20px", borderRadius: "8px" }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
            </p>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              Drop files here
            </p>
            <p style={{ fontSize: "14px", color: "#888" }}>or</p>
            <Button type="primary">Select a file →</Button>
          </Dragger>

          {fileList.length > 0 && (
            <Button
              type="primary"
              onClick={handleUpload}
              loading={uploading}
              style={{ marginTop: "20px" }}
            >
              Analyze
            </Button>
          )}
        </Modal>
      </div>
      <div className="right w-1/2">
        <div className="imagesGrid grid grid-cols-3 border-2 rounded">
          <div>
            <img src="/Images/1.jpg" className="h-full" alt="Image" />
          </div>
          <div>
            <img src="/Images/2.jpg" className="h-full" alt="Image" />
          </div>
          <div>
            <img src="/Images/3.jpg" className="h-full" alt="Image" />
          </div>
          <div>
            <img src="/Images/4.jpg" className="h-full" alt="Image" />
          </div>
          <div>
            <img src="/Images/5.jpg" className="h-full" alt="Image" />
          </div>
          <div>
            <img src="/Images/6.jpg" className="h-full" alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
