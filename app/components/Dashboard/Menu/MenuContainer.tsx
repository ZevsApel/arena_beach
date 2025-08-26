import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/slice';
import { setActiveMenuItem } from '@/lib/redux/slices/dashboard/menu/menuSlice';
import MenuItem from './MenuItem/MenuItem';

export interface MenuItemData {
  id: string;
  href: string;
  title: string;
  className?: string;
  svgIcon: string;
}

interface MenuContainerProps {
  items: MenuItemData[];
  className?: string;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ items, className = '' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeMenuItemId = useSelector((state: RootState) => state.menuItem.activeMenuItemId);

  // Восстановление activeMenuItemId из sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return; // Пропускаем на сервере

    const savedMenuItemId = sessionStorage.getItem('activeMenuItemId');

    const isValidMenuItem = savedMenuItemId && items.some((item) => item.id === savedMenuItemId);

    if (isValidMenuItem && savedMenuItemId !== activeMenuItemId) {

      // Восстанавливаем из sessionStorage
      dispatch(setActiveMenuItem(savedMenuItemId));
      console.log('Restored activeMenuItemId from sessionStorage:', savedMenuItemId);
      
    } else if (!isValidMenuItem || !savedMenuItemId) {

      // Если sessionStorage пуст или ID невалиден, устанавливаем первый пункт меню
      const defaultMenuItem = items[0]?.id || null;

      if (defaultMenuItem && defaultMenuItem !== activeMenuItemId) {

        dispatch(setActiveMenuItem(defaultMenuItem));
        sessionStorage.setItem('activeMenuItemId', defaultMenuItem || '');
        console.log('Set activeMenuItemId to default:', defaultMenuItem);
        
      }
    }
  }, [dispatch, items, activeMenuItemId]);

  const handleItemClick = (id: string) => {
    dispatch(setActiveMenuItem(id));
  };

  return (
    <nav className={`${className}`}>
      <ul className="flex flex-col items-center">
        {items.map((item) => (
          <li key={item.id} className="dashboard-nav--item-block w-full">
            <MenuItem
              href={item.href}
              title={item.title}
              className={item.className}
              isActive={item.id === activeMenuItemId}
              onClick={() => handleItemClick(item.id)}
              svgIcon={item.svgIcon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuContainer;