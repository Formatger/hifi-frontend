import React from "react";
import CaretRight from "../assets/images/CaretRight.svg";
import Image from "next/image";

interface BreadcrumbItem {
  label: string;
  link: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
}: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="">
      <ol role="list" className="flex flex-wrap">
        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            {item?.current || index === items?.length - 1 ? (
              <span className="blue-text w-40 truncated">
                {item?.label}
              </span>
            ) : (
              <a href={item.link}>
                {item?.label}
              </a>
            )}
            {index < items?.length - 1 && (
              <div>
                <Image src={CaretRight} alt="CaretRight" className="bread-arrow" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
