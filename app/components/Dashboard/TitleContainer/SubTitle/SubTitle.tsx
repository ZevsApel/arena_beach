interface SubTitleProps {
  subTitleText: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ subTitleText }) => {
  return <p className="dashboard-top__text">{subTitleText}</p>;
};

export default SubTitle;
