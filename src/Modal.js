import React from "react";
import ReactDOM from "react-dom"
import './style.css'
function Modal({ isOpen, setIsOpen }) {

    if (!isOpen) {
        return null;
    }
    return ReactDOM.createPortal(
        <div className="Modal">
            <button className="Modal__close-button" onClick={() => setIsOpen(false) }>x</button>
            <p>hola mundo</p>
            <form>

            </form>
        </div>,
        document.getElementById('modal')
    );
}


export default Modal;

