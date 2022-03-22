import React from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '@/assets/logo.png';
import { useAccount, useMetaMask } from '@/context/smart-contract.context';

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { walletAddress } = useAccount();
  const { disconnectFromMetaMask } = useMetaMask();

  const handleDisconnectWallet = () => {
    disconnectFromMetaMask?.();
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 md:px-32">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-8 h-8 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item) => (
          <li key={item} className="mx-4 cursor-pointer">
            {item}
          </li>
        ))}
        {walletAddress && (
          <button
            type="button"
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={handleDisconnectWallet}
          >
            Sign out
          </button>
        )}
      </ul>
      <div className="flex relative md:hidden">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item) => (
              <li key={item} className="mx-4 cursor-pointer my-2 text-lg">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
