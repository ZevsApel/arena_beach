export interface SureModalData {
  sureText: string;
  handleAccept: () => void;
  handleDecline: () => void;
}

const SureModal: React.FC<SureModalData> = ({ sureText, handleAccept, handleDecline }) => {
  return (
    <div className="sure_modal__container">
      <div className="sure_modal__block">
        <h2 className="sure_moda__text">{sureText}</h2>
        <div className="sure_modal__buttons_block">
          <button className="sure_modal__decline action-button" onClick={handleDecline}>
            Отменить
          </button>
          <button className="sureModal__accept action-button" onClick={handleAccept}>
            Подтвердить
          </button>
        </div>
        <button className="close" onClick={handleDecline} aria-label="Close"></button>
      </div>
    </div>
  );
};

export default SureModal;
