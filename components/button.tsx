import { cls } from "@libs/client/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
  color?: string;
}

export default function Button({
  large = false,
  onClick,
  text,
  color,
  ...rest
}: ButtonProps) {
  const colorText: string = color
    ? color
    : "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500";
  return (
    <button
      {...rest}
      className={cls(
        `w-full 
        text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2  focus:outline-none`,
        large ? "py-3 text-base" : "py-2 text-sm ",
        colorText
      )}
    >
      {text}
    </button>
  );
}
