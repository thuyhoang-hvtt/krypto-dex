import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';

function Connection() {
  return (
    <>
      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
        Send Crypto <br /> across the world
      </h1>
      <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
      </p>

      <button
        type="button"
        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
      >
        <AiFillPlayCircle className="text-white mr-2" />
        <p className="text-white text-base font-semibold">Connect Wallet</p>
      </button>
    </>
  );
}

export default Connection;
