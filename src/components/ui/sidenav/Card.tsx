"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";

import defaultAvatar from "@icons/freelancer-active.svg";
import logoutIcon from "@icons/logout.svg";

interface CardProps {
  address: string;
  network: string;
  avatar?: StaticImageData | string;
  className?: string;
  onLogout?: () => void;
}

const Card: React.FC<CardProps> = ({ address, network, avatar, className = "", onLogout }) => {
  return (
    <div
      className={`-ml-[17px] flex w-[225px] items-center justify-between rounded-xl p-2 ${className}`}
    >
      <div className="flex items-center gap-3">
        <Image
          src={avatar ? avatar : defaultAvatar}
          alt={`${address} Avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-medium">{address}</p>
          <p className="text-xs text-gray-500">{network}</p>
        </div>
      </div>
      <Image
        src={logoutIcon}
        alt="Logout"
        width={35}
        height={30}
        className="cursor-pointer rounded-md p-1 hover:bg-[#f0f2f9]"
        onClick={onLogout}
      />
    </div>
  );
};

export default Card;
