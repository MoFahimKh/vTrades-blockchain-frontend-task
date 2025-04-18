"use clinet";
import Image from "next/image";

import { useWalletStore } from "@/store/wallet.store";
import WalletIcon from "@icons/wallet-icon.svg";

const Navbar: React.FC = () => {
  const { network } = useWalletStore();
  return (
    <header className="bg-primary flex h-14 w-full items-center justify-between px-6 text-white shadow">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image
          src={WalletIcon}
          alt="Wallet Icon"
          width={24}
          height={24}
        />
        vTrade
      </div>
      <div>Network : {network && network.name.toUpperCase()}</div>
    </header>
  );
};

export default Navbar;
