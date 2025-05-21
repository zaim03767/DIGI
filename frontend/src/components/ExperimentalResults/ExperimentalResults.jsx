import React from "react";
import { FaCheck } from "react-icons/fa";
const ExperimentalResults = () => {
  return (
    <div className="flex justify-between items-center gap-4 px-40 pb-12">
      <div className="left flex flex-col items-start">
        <h2 className="text-[#5777BA] text-[44px] font-bold mb-2">
          Experimental Results
        </h2>
        <p className="text-[#515f7d] text-xl mb-2 text-justify">
          We have performed extensive training and hyperparameter tuning, such
          as comparing different EfficientNet models, number of convolution
          layers, weights, data augmentations, dropout rates, and regularizers.
          In the end, the following settings give us the best results:
        </p>
        <ul className="text-[#515f7d] text-xl mb-2 pt-4 flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Input Size: 299,299
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Batch Size: 32
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Optimizer: Adam
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Learning Rate: 0.00001
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Dropout Rate: 0.5
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Regularization: L2 with 0.001 rate
          </li>
        </ul>
        <div className="images flex items-center gap-4 w-full pt-4">
          <img src="/Images/graph1.jpeg" alt="Image" className="w-1/2 h-72" />
          <img src="/Images/graph2.jpeg" alt="Image" className="w-1/2 h-72" />
        </div>
        <ul className="text-[#515f7d] text-xl mb-2 pt-4 flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Accuracy: 96.36%
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Precision: 94.95%
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            Recall: 97.94%
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={15} color="#5777BA" />
            We have achieved better results with XceptionNet and LSTM based on a
            <a href="#" className="text-[#5777BA]">
              public deepfake detection benchmark
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExperimentalResults;
