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
    // console.log("file is: ", fileList[0]);
    if (fileList.length === 0) {
      console.error("Please upload a file first.");
      return;
    }
    setUploading(true);

    // Create FormData and explicitly log its contents
    const formData = new FormData();

    // console.log("FormData contents:", {
    //   image: formData.get("image"),
    //   name: formData.get("image")?.name,
    //   type: formData.get("image")?.type,
    // });

    if (fileList[0].originFileObj.type.startsWith("video/")) {
      formData.append("video", fileList[0].originFileObj || fileList[0]);
      fetch("http://127.0.0.1:5000/predict-video", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("Response Status:", response.status);
          return response.json();
        })
        .then((data) => {
          setUploading(false);
          console.log("Upload Result:", data);
          alert(
            `Detected as ${data.label} with ${
              data.prediction * 100
            }% confidence`
          );
        })
        .catch((error) => {
          setUploading(false);
          console.error("Full Upload Error:", error);
          alert("File upload failed. Please try again.");
        });
    }
    if (fileList[0].originFileObj.type.startsWith("image/")) {
      formData.append("image", fileList[0].originFileObj || fileList[0]);
      fetch("http://127.0.0.1:5000/predict-img", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("Response Status:", response.status);
          return response.json();
        })
        .then((data) => {
          setUploading(false);
          console.log("Upload Result:", data);
          alert(
            `Detected as ${data.result} with ${
              data.confidence * 100
            }% confidence`
          );
        })
        .catch((error) => {
          setUploading(false);
          console.error("Full Upload Error:", error);
          alert("File upload failed. Please try again.");
        });
    }
  };
  const uploadProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    beforeUpload(file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage || isVideo) {
        message.error(`${file.name} should either a video or an image file`);
        return false;
      }
      // if (!isLt2M) {
      //   message.error('Image must be smaller than 2MB!');
      //   return false;
      // }

      return true;
    },
    onChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileList(fileList);
    },
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
