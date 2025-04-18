# vTrade – Blockchain Frontend Task

This is a blockchain-based frontend application built using **Next.js**, **TailwindCSS**, **Ethers.js**, and **Zustand** for state management. It supports wallet connection, displays the connected wallet's address and current network, and persists the changes of both across sessions.

## 🚀 Features

- 🔗 **Wallet Connect** – Connect Ethereum wallets (e.g., MetaMask)
- 🧠 **State Management** – Persist address and network using Zustand
- 🌐 **Network Detection** – Display and update current Ethereum network
- 💅 **TailwindCSS** – Utility-first styling framework
- ⚡ **Ethers.js** – Ethereum interaction and network/wallet access
- 💻 **Next.js** – Modern fullstack React framework

## 🔧 Prerequisites

Make sure you have the following installed:

- **Node.js**: `>=20 <22`
- **pnpm**: `>=10.8.0 <11`

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MoFahimKh/vTrades-blockchain-frontend-task.git
cd vTrades-blockchain-frontend-task
```

### 2.Install Dependencies

```bash
pnpm install
```

### 3. Start the Development Server

```bash
pnpm dev
```

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Ethers.js](https://docs.ethers.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 🌐 Wallet & Network Persistence

The app:

- Connects to Ethereum wallets
- Displays the current wallet address
- Detects and displays the connected Ethereum network
- Persists both wallet address and network changes using Zustand
