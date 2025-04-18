"use client";

import { ethers } from "ethers";
import { useState } from "react";

import { useNotificationStore } from "@/store/notification.store";
import { transferTokens } from "@/utils/ethersUtils";

const TransferCard = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const { addNotification } = useNotificationStore();

  const handleTransfer = async () => {
    try {
      setStatus("Initiating transfer...");

      if (!window.ethereum) throw new Error("MetaMask not found");

      const decimals = 0;
      const parsedAmount = ethers.parseUnits(amount, decimals);

      const tx = await transferTokens("", recipient, parsedAmount);
      await tx.wait();

      setStatus("✅ Transfer successful!");

      addNotification({
        type: "success",
        text: `Sent ${amount} tokens to ${recipient}`
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
      setStatus(`❌ Error sending tokens: ${err.message}`);

      addNotification({
        type: "error",
        text: err.message || "Transaction failed"
      });
    }
  };

  return (
    <div className="m-auto mt-12 w-full max-w-md rounded-xl bg-white p-4 shadow">
      <h3 className="mb-2 text-lg font-semibold">Transfer Tokens</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="mb-2 w-full rounded border px-3 py-2"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2 w-full rounded border px-3 py-2"
      />
      <button
        onClick={handleTransfer}
        className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
      >
        Send Tokens
      </button>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
};

export default TransferCard;
