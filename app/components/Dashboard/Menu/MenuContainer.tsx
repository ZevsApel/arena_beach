// src/app/components/Dashboard/Menu/MenuContainer.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/slice';
import { setActiveMenuItem } from '@/lib/redux/slices/dashboard/menu/menuSlice';
import MenuItem from './MenuItem/MenuItem';

export interface MenuItemData {
  id: string;
  href: string;
  title: string;
  className?: string;
}

interface MenuContainerProps {
  items: MenuItemData[];
  className?: string;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ items, className = '' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeMenuItemId = useSelector((state: RootState) => state.menuItem.activeMenuItemId);

  const handleItemClick = (id: string) => {
    dispatch(setActiveMenuItem(id));
  };

  return (
    <nav className={`flex space-x-4 p-4 ${className}`}>
      <ul className="flex flex-col space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <MenuItem
              href={item.href}
              title={item.title}
              className={item.className}
              isActive={item.id === activeMenuItemId}
              onClick={() => handleItemClick(item.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuContainer;