'use client';

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<Props> =({ open, onClose, children }) => {
    if(!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-window" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;