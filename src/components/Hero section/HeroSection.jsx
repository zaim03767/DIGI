"use client";
import { Button, Modal, Upload } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

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
    fetch("http://192.168.0.104:3001/pharmacy/67712463a6017abc8325f472/stock", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/json",
      },
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
  const uploadProps = {
    name: "file",
    multiple: false,
    action: "",
    onChange(info) {
      const { file } = info;
      const { status } = file;
      console.log("File uploaded is: ", file);
      if (status === "done") {
        setFileList([file]);
      } else if (status === "error") {
        console.error(`${file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex justify-between items-center gap-4 px-40 pt-24 pb-12">
      <div className="left flex flex-col items-start">
        <h2 className="text-[#5777BA] text-[45px] font-bold mb-2">
          DeepFake Detect
        </h2>
        <p className="text-[#515f7d] text-xl mb-2">
          Upload an image to test for possible deepfakes
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
              Send to Backend
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
