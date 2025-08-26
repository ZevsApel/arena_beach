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
  console.log('MenuItem:', { title, isActive }); // Для отладки
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 w-full ${className} ${isActive ? 'active' : ''}`}
    >
      <Image src={`/upload/dashboardIcons/menuIcons/${svgIcon}.svg`} alt={title} width={12} height={12} />
      {title}
    </Link>
  );
};

export default MenuItem;