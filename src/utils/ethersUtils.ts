import { ethers } from "ethers";

import { contractAddress, ERC20_ABI } from "./contractDetails";

const getWalletDetails = async (): Promise<{ balance: bigint; address: string; network: ethers.Network }> => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);
  const network = await provider.getNetwork();
  return { balance, address, network };
};

export const getERC20Contract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, ERC20_ABI, signer);
};

export const getTokenName = async (): Promise<string> => {
  const contract = await getERC20Contract();
  try {
    return await contract.name();
  } catch {
    return "ERC20";
  }
};

export const getTokenDecimals = async (): Promise<number> => {
  const contract = await getERC20Contract();
  try {
    return await contract.decimals();
  } catch {
    return 18;
  }
};

export const getTokenBalance = async (contractAddress: string, walletAddress: string): Promise<bigint> => {
  const contract = await getERC20Contract();
  return await contract.balanceOf(walletAddress);
};

export const transferTokens = async (
  contractAddress: string,
  to: string,
  amount: bigint
): Promise<ethers.TransactionResponse> => {
  const contract = await getERC20Contract();
  const tx = await contract.transfer(to, amount);
  return tx;
};

export default getWalletDetails;
