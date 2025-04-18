"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { useWalletStore } from "@/store/wallet.store";
import { formatAddress } from "@/utils/formatAddress";
import dashboardIcon from "@icons/dashboard.svg";
import submissionsIcon from "@icons/my-submissions.svg";

import Card from "./Card";

const SideNavbar = () => {
  const { disconnectWallet, accountAddress, network } = useWalletStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleDisconnect = async () => {
    disconnectWallet();
    router.push("/");
  };

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <nav className="mt-5 ml-3.5 flex h-[95%] w-65 flex-col justify-between rounded-2xl rounded-br-2xl bg-white p-6 align-middle">
      <div className="flex h-full flex-col justify-between">
        {/* Top menu */}
        <div className="space-y-6">
          <ul className="space-y-2">
            <li
              onClick={() => handleNavigation("/dashboard")}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-[#f0f2f9] hover:text-blue-600"
            >
              <Image
                src={dashboardIcon}
                alt="Dashboard"
                width={20}
                height={20}
              />
              <span>Dashboard</span>
            </li>
            <li
              onClick={() => handleNavigation("/contract-interaction")}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-[#f0f2f9] hover:text-blue-600"
            >
              <Image
                src={submissionsIcon}
                alt="My Submissions"
                width={20}
                height={20}
              />
              <span>Contract Interaction</span>
            </li>
          </ul>
        </div>

        {/* Bottom menu */}
        <div className="space-y-2">
          <Card
            address={formatAddress(accountAddress)}
            network={network && network.name}
            className="bg-transparent"
            onLogout={handleDisconnect}
          />
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
