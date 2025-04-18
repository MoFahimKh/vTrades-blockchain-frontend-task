/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { create } from "zustand";
import { persist } from "zustand/middleware";


import getWalletDetails from "@/utils/ethersUtils";

import { useNotificationStore } from "./notification.store";

interface WalletState {
  isAccountConnected: boolean;
  isAccountLoading: boolean;
  accountAddress: string;
  balance: string | null;
  error: string | null;
  network: any | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isAccountConnected: false,
      isAccountLoading: false,
      accountAddress: "",
      balance: null,
      network: null,
      error: null,

      connectWallet: async () => {
        set({ isAccountLoading: true });
      
        try {
          if (!window.ethereum) {
            set({ error: "MetaMask is not installed!", isAccountLoading: false });
            useNotificationStore.getState().addNotification({
              type: "error",
              text: "MetaMask is not installed!",
            });
            return;
          }
      
          const { balance, address, network } = await getWalletDetails();
      
          if (network.chainId.toString() !== "11155111") { 
            set({ isAccountLoading: false });
            useNotificationStore.getState().addNotification({
              type: "error",
              text: "Please switch to Sepolia network.",
            });
      
            // Prompt user to switch network
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xaa36a7" }], // Sepolia in hex
              });
            } catch (switchError) {
              console.error("Chain switch failed:", switchError);
            }
      
            return;
          }
      
          set({
            isAccountLoading: false,
            isAccountConnected: true,
            accountAddress: address,
            balance: ethers.formatEther(balance),
            network,
            error: null,
          });
      
          useNotificationStore.getState().addNotification({
            type: "success",
            text: `Wallet connected successfully!`,
          });
      
          // === Handle Account & Chain Change Events ===
          window.ethereum.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0 || accounts[0] !== address) {
              useWalletStore.getState().disconnectWallet();
              useNotificationStore.getState().addNotification({
                type: "error",
                text: "You have changed the account.",
              });
            }
          });
      
          window.ethereum.on("chainChanged", async (chainId: string) => {
            if (chainId !== "0xaa36a7") {
              useNotificationStore.getState().addNotification({
                type: "error",
                text: "Please switch back to Sepolia network.",
              });
      
              // Try to switch back to Sepolia
              try {
                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0xaa36a7" }],
                });
              } catch (error) {
                console.error("Failed to switch back to Sepolia:", error);
              }
            }
          });
      
        } catch (error) {
          console.error("Wallet connection failed:", error);
          set({
            isAccountLoading: false,
            error: "Failed to connect wallet. Please try again.",
          });
      
          useNotificationStore.getState().addNotification({
            type: "error",
            text: "Failed to connect wallet. Please try again.",
          });
        }
      }
      ,

      disconnectWallet: () => {
        set({
          isAccountConnected: false,
          isAccountLoading: false,
          accountAddress: "",
          balance: null,
          network: null,
          error: null,
        });

        useNotificationStore.getState().addNotification({
          type: "error",
          text: "Wallet disconnected.",
        });
      },
    }),
    {
      name: "wallet-store", // Key used in localStorage
      partialize: (state) => ({
        isAccountConnected: state.isAccountConnected,
        accountAddress: state.accountAddress,
        balance: state.balance,
        network: state.network,
      }),
    }
  )
);
