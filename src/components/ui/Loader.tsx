import React from "react";

interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = "text-blue-500" }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <i className={`fa fa-spinner fa-spin fa-fw text-2xl ${color}`} />
    </div>
  );
};

export default Loader;
