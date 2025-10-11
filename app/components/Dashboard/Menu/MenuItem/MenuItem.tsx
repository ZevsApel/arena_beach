"use client";

import Image from "next/image";
import Link from "next/link";

interface MenuItemProps {
  href: string;
  title: string;
  className?: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  svgIcon: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  title,
  className = '',
  isActive = false,
  svgIcon,
  onClick,
}) => {
  const computedClassName = `dashboard-nav__link ${isActive ? 'active' : ''}`;

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={computedClassName}
    >
      <Image
        src={`/upload/dashboardIcons/menuIcons/${svgIcon}.svg`}
        alt={title}
        width={16}
        height={16}
        className='dashboard-link__img'
      />
      {title}
    </Link>
  );
};

export default MenuItem;