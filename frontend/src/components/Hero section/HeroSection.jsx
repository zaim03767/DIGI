"use client";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import jsPDF from "jspdf";
import "jspdf-autotable";

const HeroSection = () => {
  const { Dragger } = Upload;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setResultData(null);
    setFileList([]);
  };

  const handleResultModalCancel = () => {
    setIsResultModalVisible(false);
    setResultData(null);
  };

  const handleUpload = () => {
    if (fileList.length === 0) {
      console.error("Please upload a file first.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
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
          setIsModalVisible(false); // Close first modal
          setResultData({
            label: data.label,
            confidence: data.prediction * 100,
            fakeDetections: data.fake_detections,
          });
          setIsResultModalVisible(true); // Show result modal
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
          setIsModalVisible(false); // Close first modal
          setResultData({
            label: data.result,
            confidence: data.confidence * 100,
          });
          setIsResultModalVisible(true); // Show result modal
        })
        .catch((error) => {
          setUploading(false);
          console.error("Full Upload Error:", error);
          alert("File upload failed. Please try again.");
        });
    }
  };

  const downloadPDF = () => {
    if (!resultData) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("DeepFake Detection Result", 20, 20);
    doc.setFontSize(12);
    doc.text(`Label: ${resultData.label}`, 20, 40);
    doc.text(`Confidence: ${resultData.confidence.toFixed(2)}%`, 20, 50);

    if (resultData.fakeDetections && resultData.fakeDetections.length > 0) {
      // Prepare table data
      const tableData = resultData.fakeDetections.map((detection) => [
        detection.frame_index,
        `${(detection.prediction * 100).toFixed(2)}%`,
      ]);

      // Add table to PDF
      doc.autoTable({
        startY: 60,
        head: [["Frame Index", "Prediction (%)"]],
        body: tableData,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [52, 152, 219] }, // Blue header
        alternateRowStyles: { fillColor: [240, 240, 240] }, // Light grey rows
      });
    }

    // Save the PDF
    doc.save("DeepFake-Detection-Result.pdf");
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    listType: "picture",
    beforeUpload(file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        message.error(`${file.name} should be either a video or an image file`);
        return false;
      }

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
          onClick={showModal}
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

        {/* Result Modal */}
        <Modal
          title="Detection Result"
          open={isResultModalVisible}
          onCancel={handleResultModalCancel}
          footer={null}
          centered
          width={600}
          style={{
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          {resultData && (
            <>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                Detected as: {resultData.label}
              </p>
              <p style={{ fontSize: "16px", color: "#888" }}>
                Confidence: {resultData.confidence.toFixed(2)}%
              </p>
              {resultData.fakeDetections && (
                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    marginTop: "15px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #ddd",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f2f2f2",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        <th
                          style={{
                            padding: "10px",
                            textAlign: "left",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          Frame Index
                        </th>
                        <th style={{ padding: "10px", textAlign: "left" }}>
                          Prediction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultData.fakeDetections.map((detection, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              borderRight: "1px solid #ddd",
                            }}
                          >
                            {detection.frame_index}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              color: "red",
                              fontWeight: "bold",
                            }}
                          >
                            {(detection.prediction * 100).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Button
                type="primary"
                onClick={downloadPDF}
                style={{ marginTop: "20px" }}
              >
                Download PDF Text
              </Button>
            </>
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
