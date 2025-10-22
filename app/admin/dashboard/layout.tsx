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
        { id: 'applications', href: '#', title: 'Заявки', svgIcon: 'applications'},
        { id: 'rooms', href: '/admin/dashboard/rooms/', title: 'Номера', svgIcon: 'rooms'}
    ]
   

    return ( 
        <Provider store={store}>
            <div className="dashboard">
                <div className="dashboard-block__sidebar">
                    <div className="dashboard-block__mainpage">
                        <div className="dashboard-mainpage--logo">
                            <Link href="/">
                                <Image src="/svg/logo/logo.svg" alt="Logo" width={42} height={17} />
                            </Link>
                        </div>
                        <div className="dashboard-mainpage__info">
                            <h2 className="dashboard-mainpage__title">Arena B Admin</h2>
                            <p className="dashboard-mainpage__user-mail">{email}</p>
                        </div>
                    </div>
                    <div className="dashboard-sidebar__nav">
                        <MenuContainer items={menuitems} className="" />
                    </div>
                    <div className="auth-form__submit-block">
                        <button className="action-button" onClick={handleLogout}>Выйти из аккаунта</button>
                    </div>
                </div>
                <div className="dashboard-section">
                    {children}
                </div>
            </div>
        </Provider>
    );
}