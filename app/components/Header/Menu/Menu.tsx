import './Menu.scss';

export interface MenuData {
    text: string;
    href: string;
}

interface MenuContainerProps {
    items: MenuData[];
}

const Menu: React.FC<MenuContainerProps> = ({ items }) => {
    return (
        <nav className="header-menu">
            <ul className="header-menu-list">
                {items.map((item, index) => (
                    <li className="menu-list-item" key={index}>
                        <a className="menu-item-link" href={item.href}>{item.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Menu;