import Menu, { MenuData } from './Menu/Menu';
import Image from 'next/image';

import './Header.scss';

const Header = () => {

    const menuItems: MenuData[] = [
        { text: 'Карта территории', href: "/" },
        { text: 'Услуги', href: '/' },
        { text: 'Виды номеров', href: '/' },
        { text: 'Контакты', href: '/'}
    ]

    return (
        <header>
            <div className='logo-block'>
                <Image src='/upload/Logo.svg' width={87} height={50} alt='Логотип' ></Image>
            </div>
            <Menu items={menuItems}></Menu>
            <div className='booking-block'>
                <button className='booking-button' type='button' aria-label="Забронировать номер">
                    Бронирование
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1007_7779)">
                            <path d="M6 6V8H14.59L5 17.59L6.41 19L16 9.41V18H18V6H6Z" fill="#2D7B9E"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1007_7779">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </header>
    );
}

export default Header;