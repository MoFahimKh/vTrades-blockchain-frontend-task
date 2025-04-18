"use client";
import React from "react";

import Layout from "@/components/ui/Layout";
import { useWalletStore } from "@/store/wallet.store";
import { formatAddress } from "@/utils/formatAddress";

export default function Dashboard() {
  const { accountAddress, network } = useWalletStore();

  return (
    <Layout
      showNavbar
      showSidenavbar
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

        <div className="space-y-2">
          <p className="text-lg text-gray-700">
            <span className="font-medium">Wallet Address:</span>{" "}
            {accountAddress ? formatAddress(accountAddress) : "Not connected"}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Network:</span> {network?.name || "Not connected"}
          </p>
        </div>

        <div>
          <h2 className="mt-6 text-xl font-semibold text-gray-800">🔧 Technologies Used</h2>
          <ul className="mt-2 list-inside list-disc text-gray-700">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Ethers.js</li>
            <li>Zustand</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
