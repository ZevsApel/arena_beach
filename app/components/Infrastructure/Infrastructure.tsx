import BlockTitle from "../BlockTitle/BlockTitle";
import './Infrastructure.scss';

const Infrastructure = () => {
    return (
        <div className="infrastructure-container">
            <div className="top-content">
                <BlockTitle>Инфраструктура отеля</BlockTitle>
                <p className="additional-text">Наша инфраструктура создана, чтобы каждый гость нашёл здесь своё идеальное место для отдыха и развлечений. Просторный бассейн и пляж для любителей воды, уличный кинотеатр для атмосферных вечеров, детская площадка и спортивное поле для активного времяпрепровождения. А разнообразие кафе и ресторанов порадует даже самых взыскательных гурманов.</p>
            </div>
            <div className="infrastructure-content">
                <div className="infrastructure-item">
                    <div className="item-name">
                        <p>Кинотеатр</p>
                    </div>
                    <img src='/upload/infrastructure/rectangle-1442.jpg' className="item-image" />
                    <div className="item-features">
                        Уличный кинотеатр, кресла-груши
                    </div>
                    <div className="item-count">
                        01
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Infrastructure;