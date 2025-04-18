export const formatAddress = (address: string, length: number = 6): string => {
  if (!address || address.length < length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
