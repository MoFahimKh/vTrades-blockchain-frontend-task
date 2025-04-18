import Image from "next/image";
import { useState } from "react";

import BlueTick from "@icons/blue-tick.svg";
import ClientActiveIcon from "@icons/client-active.svg";
import ClientIcon from "@icons/client.svg";
import FreelancerActiveIcon from "@icons/freelancer-active.svg";
import FreelancerIcon from "@icons/freelancer.svg";

interface UserTypeCardProps {
  type: "freelancer" | "client";
  isActive: boolean;
  onClick: () => void;
  showDescription?: boolean;
  size?: number;
}

export default function UserTypeCard({
  type,
  isActive,
  onClick,
  showDescription = true,
  size = 150,
}: UserTypeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isClient = type === "client";
  const icon = isClient ? ClientIcon : FreelancerIcon;
  const activeIcon = isClient ? ClientActiveIcon : FreelancerActiveIcon;
  const title = isClient ? "Client" : "Freelancer";
  const description = isClient
    ? "Post jobs and hire talent"
    : "Find jobs and work with clients";

  const borderColor =
    isActive || isHovered ? "border-[#2546f0]" : "border-[#eeeeee]";
  const textColor = isActive || isHovered ? "text-[#2546f0]" : "text-[#333]";

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circular Icon Container */}
      <div
        className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 
        ${borderColor} ${
          isActive || isHovered ? "border-[5px] shadow-lg" : ""
        }`}
        style={{ width: size, height: size }}
      >
        <Image
          src={isActive || isHovered ? activeIcon : icon}
          alt={`${title} Icon`}
          width={size * 0.53} // scale icon size relatively
          height={size * 0.53}
        />

        {isActive && (
          <div className="absolute top-2 right-2">
            <Image src={BlueTick} alt="Selected" width={24} height={24} />
          </div>
        )}
      </div>

      <div
        className={`mt-3 text-[20px] font-semibold text-center transition-all duration-300 ${textColor}`}
      >
        {title}
      </div>

      {showDescription && (
        <div className="text-sm text-gray-500 text-center">{description}</div>
      )}
    </div>
  );
}
