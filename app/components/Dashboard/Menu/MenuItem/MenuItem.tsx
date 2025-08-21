import Image from "next/image";

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
    return (
        <>
        <Image src={`/upload/dashboardIcons/menuIcons/${svgIcon}.svg`} alt={title} />
        <a href={href} onClick={onClick} className={`${className} ${isActive ? 'active' : ''}`}>
            {title}
        </a></>
    );
};

export default MenuItem;