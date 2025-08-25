import SubTitle from "./SubTitle/SubTitle";
import Title from "./Title/Title";

export interface TitleData {
    title: string;
    subTitleText: string;
}

interface TitleContainerProps {
    item: TitleData;
}

const TitleContainer: React.FC<TitleContainerProps> = ({ item }) => {
    return (
        <div className="dashboard-info--top">
            <Title title={item.title} />
            <SubTitle subTitleText={item.subTitleText}/>
        </div>
    )
}

export default TitleContainer;