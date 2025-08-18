'use client';

import MenuContainer, { MenuItemData } from "@/app/components/Dashboard/Menu/MenuContainer";
import { AppDispatch, RootState, store } from "@/lib/redux/slice";
import { checkAuth, clearUser, setError } from "@/lib/redux/slices/emailSLice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { email } = useSelector((state: RootState) => state.email);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            dispatch(clearUser());
            router.push('/admin/login')
        } catch(error) {
            console.error('Ошибка выхода:', error);
            dispatch(setError(`Не удалось выйти из аккаунта: ${error}`))
        }
    }

    
    const menuitems: MenuItemData[] =[
        { id: 'applications', href: '/', title: 'Заявки', className: ''},
        { id: 'rooms', href: '/', title: 'Номера', className: ''}
    ]
   

    return (
        <Provider store={store}>
            <div className="dashboard">
                <div className="dashboard-sidebar">
                    <div className="dashboard-sidebar--mainpage flex items-center justify-center">
                        <div className="dashboard-mainpage--logo">
                            <Image src="/svg/logo/logo.svg" alt="Logo" />
                        </div>
                        <div className="dashboard-mainpage--info">
                            <h2>Arena B Admin</h2>
                            <p>{email}</p>
                        </div>
                    </div>
                    <button className="authorization-form--submit-button" onClick={handleLogout}>Выйти из аккаунта</button>
                    <div className="dashboard-sidebar--nav">
                        <MenuContainer items={menuitems} className="" />
                        <nav>
                            <ul>
                                <li>Заявки</li>
                                <li>Номера</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="dashboard-info">
                    {children}
                </div>
            </div>
        </Provider>
    );
}