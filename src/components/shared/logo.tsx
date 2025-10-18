// React, Next.js
import { FC } from "react";
import Image from "next/image";

//Logo Image
import LogoImg from "../../../public/assets/icons/favicon (2).ico";

interface LogoProps {
  width: string;
  height: string;
}

const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div className="z-50" style={{ width: width, height: height }}>
      <Image src={LogoImg} alt="Vendora" className="h-full w-full overflow-visible object-cover" />
    </div>
  );
};

export default Logo;
