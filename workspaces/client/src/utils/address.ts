export const anonymizeAddress = (address?: string) => {
  if (!address) {
    return '0xXXX..XXXXX';
  }

  return [
    address.toUpperCase().slice(0, 5),
    address.toUpperCase().slice(address.length - 5, address.length),
  ].join('..');
};
