interface SubTitleProps {
    subTitleText: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ subTitleText }) => {
    return (
        <p className="dashboard-top--subtitle">{subTitleText}</p>
    )
}

export default SubTitle;