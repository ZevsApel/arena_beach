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
            <a href={href} onClick={onClick} className={`flex items-center gap-3 w-full ${className} ${isActive ? 'active' : ''}`}>
                <Image src={`/svg/dashboard/menuIcons/${svgIcon}.svg`} alt={title} />
                {title}
            </a>
        </>
    );
};

export default MenuItem;