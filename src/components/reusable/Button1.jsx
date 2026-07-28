import React from "react";

const Button1 = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-linear-to-bl from-blue-500 to-cyan-300
        hover:from-blue-600 hover:to-cyan-400
        text-white
        px-5 py-2.5
        rounded-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02]
        hover:shadow-lg cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button1;