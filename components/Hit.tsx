import React from "react";
import Image from "next/image";
// import { formatter } from "~/utils/priceFormatter";

type Props = { hit: any };

const Hit = ({ hit }: Props) => {
  return (
    <div className="w-full bg-white ">
      <div className="block bg-white">
        <Image
          src={hit.imageSrc}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
          alt={hit.name}
        />
      </div>
      <div className="p-2 border-t border-gray-100">
        <p className="truncate">{hit.name}</p>
        <p className="block text-sm font-medium text-gray-500">
          {hit.category}
        </p>
        <p className="py-4 font-bold text-md">{hit.price}</p>
      </div>
    </div>
  );
};

export default Hit;
