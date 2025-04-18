"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import Layout from "@/components/ui/Layout";
import { useWalletStore } from "@/store/wallet.store";

import TransferCard from "./TransferCard";

const ContractInteraction = () => {
  const accountAddress = useWalletStore((state) => state.accountAddress);
  const isAccountConnected = useWalletStore((state) => state.isAccountConnected);

  const [tokenData, setTokenData] = useState<{
    name?: string;
    balance?: string;
    totalSupply?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!accountAddress) return;

      setIsLoading(true);
      try {
        const res = await fetch(`/api/contract-interaction?walletAddress=${accountAddress}`);
        const data = await res.json();
        setTokenData(data);
      } catch (error) {
        console.error("Error fetching token data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenData();
  }, [accountAddress]);

  return (
    <Layout
      showNavbar
      showSidenavbar
    >
      <h1 className="mb-4 text-2xl">Contract Interaction</h1>
      <h2 className="mb-2 text-xl">Send ERC20</h2>

      {!isAccountConnected ? (
        <div className="flex items-center gap-2 text-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-gray-500" />
          <span>Connecting to wallet...</span>
        </div>
      ) : isLoading ? (
        <div className="flex items-center gap-2 text-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-gray-500" />
          <span>Fetching token data...</span>
        </div>
      ) : (
        <div className="space-y-2 text-sm">
          <p>
            <strong>Wallet Address:</strong> {accountAddress}
          </p>
          <p>
            <strong>Token Name:</strong> {tokenData.name}
          </p>
          <p>
            <strong>Balance:</strong> {tokenData.balance}
          </p>
          <p>
            <strong>Total Supply:</strong> {tokenData.totalSupply}
          </p>
        </div>
      )}

      <TransferCard />
    </Layout>
  );
};

export default ContractInteraction;
