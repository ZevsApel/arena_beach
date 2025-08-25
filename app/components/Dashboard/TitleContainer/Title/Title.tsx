interface TitleProps {
    title: string;
}


const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h2 className="dashboard-top--title">{title}</h2>
    )
}

export default Title;