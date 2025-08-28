'use client';

import MenuContainer, { MenuItemData } from "@/app/components/Dashboard/Menu/MenuContainer";
import { AppDispatch, RootState, store } from "@/lib/redux/slice";
import { checkAuth, clearUser, setError } from "@/lib/redux/slices/emailSLice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
        { id: 'applications', href: '#', title: 'Заявки', className: 'dashboard-nav--item', svgIcon: 'applications'},
        { id: 'rooms', href: '/admin/dashboard/rooms', title: 'Номера', className: 'dashboard-nav--item', svgIcon: 'rooms'}
    ]
   

    return ( 
        <Provider store={store}>
            <div className="dashboard flex">
                <div className="dashboard-sidebar">
                    <div className="dashboard-sidebar--mainpage flex items-center justify-center">
                        <div className="dashboard-mainpage--logo">
                            <Link href="/">
                                <Image src="/svg/logo/logo.svg" alt="Logo" width={42} height={17} />
                            </Link>
                        </div>
                        <div className="dashboard-mainpage--info">
                            <h2 className="dashboard-mainpage--title">Arena B Admin</h2>
                            <p className="dashboard-mainpage--user-mail">{email}</p>
                        </div>
                    </div>
                    <div className="dashboard-sidebar--nav">
                        <MenuContainer items={menuitems} className="" />
                    </div>
                    <button className="authorization-form--submit-button" onClick={handleLogout}>Выйти из аккаунта</button>
                </div>
                <div className="dashboard-info">
                    {children}
                </div>
            </div>
        </Provider>
    );
}