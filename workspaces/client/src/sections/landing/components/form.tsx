import React from 'react';
import { Loader } from '@/components';
import Input from './input';

interface IProps {
  isLoading: boolean;
  isConnected: boolean;
  data: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>, target: string) => void;
  onSubmit: () => void;
}

function Form({ isConnected, isLoading, data, onInputChange, onSubmit }: IProps) {
  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
      <Input
        placeholder="Address To"
        name="addressTo"
        type="text"
        onChange={onInputChange}
        value={data.addressTo}
      />
      <Input
        placeholder="Amount (ETH)"
        name="amount"
        type="number"
        onChange={onInputChange}
        value={data.amount}
      />
      <Input
        placeholder="Keyword (Gif)"
        name="keyword"
        type="text"
        onChange={onInputChange}
        value={data.keyword}
      />
      <Input
        placeholder="Enter Message"
        name="message"
        type="text"
        onChange={onInputChange}
        value={data.message}
      />

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {isLoading ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer disabled:hover:bg-transparent disabled:cursor-not-allowed"
          disabled={!isConnected}
        >
          Send now
        </button>
      )}
    </div>
  );
}

export default Form;
