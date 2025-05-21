import React from "react";

const footer = () => {
  return (
    <div className="bg-blue-200 py-4 w-full flex justify-around items-center">
      <a href="Github" className="text-[#366ee7] font-bold">
        GitHub
      </a>
      <p>
        Designed by{" "}
        <a href="Github" className="font-bold text-[#366ee7]">
          TailwindMade
        </a>
      </p>
    </div>
  );
};

export default footer;
