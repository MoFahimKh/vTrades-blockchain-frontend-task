"use client";
import Image from "next/image";
import React from "react";

import { useWalletStore } from "@/store/wallet.store";
import { formatAddress } from "@/utils/formatAddress";
import WalletIcon from "@icons/wallet-icon.svg";

import Button from "./ui/Button";

interface ConnectWalletProps {
  className?: string;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ className }) => {
  const { connectWallet, isAccountLoading, accountAddress } = useWalletStore();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <Button
      text={accountAddress ? formatAddress(accountAddress) : "Connect Wallet"}
      icon={
        <Image
          src={WalletIcon}
          alt="Wallet Icon"
          width={20}
          height={20}
        />
      }
      className={`h-10! [border-radius:5%] border border-white ${className}`}
      onClick={handleConnect}
      loading={isAccountLoading}
    />
  );
};

export default ConnectWallet;
