"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useNotificationStore } from "@/store/notification.store";
import { useWalletStore } from "@/store/wallet.store";

const WalletEventsListener = () => {
  const router = useRouter();
  const { disconnectWallet, connectWallet } = useWalletStore();

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (!accounts.length) return;

      disconnectWallet();
      useNotificationStore.getState().addNotification({
        type: "error",
        text: "You have changed the account."
      });

      router.push("/");
    };

    const handleChainChanged = async (chainId: string) => {
      if (chainId !== "0xaa36a7") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }]
          });

          useNotificationStore.getState().addNotification({
            type: "success",
            text: "Switched back to Sepolia network."
          });
        } catch (err) {
          console.error("Chain switch failed:", err);
        }
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [disconnectWallet, connectWallet, router]);

  return null;
};

export default WalletEventsListener;
