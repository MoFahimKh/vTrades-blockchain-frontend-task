import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

import { contractAddress, ERC20_ABI } from "@/utils/contractDetails";

// Use Infura Sepolia RPC
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("walletAddress");
  
    try {
      const [ totalSupply] = await Promise.all([
        // contract.decimals().catch(() => 18),
        contract.totalSupply().catch(() => 0),
      ]);
  
      let balance = null;
      if (walletAddress) {
        balance = await contract.balanceOf(walletAddress).catch(() => null);
      }
  
      return NextResponse.json({
        name: "ERC20", // Hardcoded name
        // decimals,
        totalSupply: totalSupply.toString(),
        ...(balance !== null && { balance: balance.toString() }),
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return NextResponse.json({ error: err.message || "Unexpected server error" }, { status: 500 });
    }
  }
  
