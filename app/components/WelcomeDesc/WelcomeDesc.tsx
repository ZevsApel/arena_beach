import './WelcomeDesc.scss';

const WelcomeDesc = () => {
    return (
        <div className="welcome-desc-container">
            <div className="desc-top-text">
                <p className="top-text"><span className="top-text__centered">Наш отель на берегу моря объединяет просторную</span><br/>
                    территорию и разнообразные развлечения, чтобы подарить вам незабываемый<br/>
                    отдых и ощущение полного комфорта</p>
            </div>
            <hr className="text-hr" />
            <div className="desc-bottom-text">
                <p className="bottom-text-column greeting-text">
                    Добро пожаловать
                </p>
                <div></div>
                <p className="bottom-text-column">
                    Это место, где вас ждёт большой подогреваемый  бассейн, детский для малышей, уютные беседки и живописный пруд с утками. На территории есть уличный кинотеатр, спортивное поле и детская площадка — все для яркого и спокойного отдыха.
                </p>
                <p className="bottom-text-column">
                    Насладитесь блюдами разных кухонь в кафе и ресторанах, от восточной до чая на дровах. Это место идеально подходит для семьи, компании или тихого отдыха в атмосферной уединённости.
                </p>
            </div>
        </div>
    );
}


export default WelcomeDesc;
