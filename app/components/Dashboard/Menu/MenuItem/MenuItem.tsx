interface MenuItemProps {
    href: string;
    title: string;
    className?: string;
    isActive?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
    href, 
    title, 
    className = '', 
    isActive = false, 
    onClick,
}) => {
    return (
        <a href={href} onClick={onClick} className={`${className} ${isActive ? 'active' : ''}`}>
            {title}
        </a>
    );
};

export default MenuItem;