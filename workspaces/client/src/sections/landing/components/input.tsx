import React from 'react';

interface IProps {
  placeholder: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, target: string) => void;
}

function Input({ placeholder, name, type, value, onChange }: IProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => onChange?.(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
}

export default Input;
