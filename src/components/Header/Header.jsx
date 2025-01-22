import React from "react";

const Header = () => {
  return (
    <header className="bg-white sticky top-0">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* logo */}
        <div className="flex flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        {/* Middle link items */}
        <div className="flex gap-x-12">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-3xl font-semibold text-gray-900"
              aria-expanded="false"
            >
              <a href="#">DIGI</a>
            </button>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <a href="#" className="text-lg font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
