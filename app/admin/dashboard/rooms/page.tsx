'use client'
import TitleContainer, {  TitleData } from "@/app/components/Dashboard/TitleContainer/TitleContainer"
export default function DashboardRooms() {

    const titleContainer: TitleData = {title: 'Список номеров', subTitleText: 'В этом разделе вы можете ознакомиться с заявками с сайта и найти контактные данные заявителя'}

    return (
        <TitleContainer item={titleContainer} />
    )
}