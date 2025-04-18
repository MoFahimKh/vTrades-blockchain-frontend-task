import React from "react";

import Loader from "./Loader";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick, className, loading = false }) => {
  return (
    <button
      onClick={loading ? undefined : onClick}
      className={`bg-primary flex h-11 cursor-pointer items-center justify-center rounded-md px-3 py-6 text-white ${loading ? "w-44 cursor-not-allowed" : ""} ${className}`}
      disabled={loading}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <Loader color="text-white" />
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {text}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
