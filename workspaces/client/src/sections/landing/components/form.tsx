import { useEffect, useState } from 'react';
import { Loader } from '@/components';
import Input from './input';

function Form() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
      <Input placeholder="Address To" name="addressTo" type="text" />
      <Input placeholder="Amount (ETH)" name="amount" type="number" />
      <Input placeholder="Keyword (Gif)" name="keyword" type="text" />
      <Input placeholder="Enter Message" name="message" type="text" />

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {isLoading ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={() => null}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
        >
          Send now
        </button>
      )}
    </div>
  );
}

export default Form;
