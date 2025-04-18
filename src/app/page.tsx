"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ConnectWallet from "@/components/ConnectWallet";
import { useWalletStore } from "@/store/wallet.store";
// import bgIcon from "@images/bg.svg";

export default function Home() {
  const { isAccountConnected } = useWalletStore();
  const router = useRouter();

  useEffect(() => {
    if (isAccountConnected) {
      router.push("/dashboard");
    }
  }, [isAccountConnected, router]);

  return (
    <div className="m-auto flex">
      <ConnectWallet className="m-auto" />
    </div>
  );
}
