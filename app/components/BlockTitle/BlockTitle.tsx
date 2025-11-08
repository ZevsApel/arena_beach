import './BlockTitle.scss';

type BlockTitleProps = {
    children: React.ReactNode;
}

const BlockTitle = ({ children }: BlockTitleProps) => {
    return(
        <div className="block-title">
            <p>{children}</p>
        </div>
    );
}

export default BlockTitle;