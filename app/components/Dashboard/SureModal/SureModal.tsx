
export interface SureModalData {
    sureText: string,
    handleAccept: () => void,
    handleDecline: () => void
}




const SureModal: React.FC<SureModalData> = ({ sureText, handleAccept, handleDecline }) => {
    return(
        <div className="sure_modal__container">
            <div className="sure_modal__block">
                <div className="sure_modal__close" onClick={handleDecline}></div>
                <p className="sure_moda__text">{sureText}</p>
                <div className="sure_modal__buttons_block">
                    <button className="sure_modal__decline" onClick={handleDecline}>Отменить</button>
                    <button className="sureModal__accept" onClick={handleAccept}>Подтвердить</button>
                </div>
            </div>
        </div>
    );
}

export default SureModal;