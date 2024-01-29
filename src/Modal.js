import React from 'react'
import ReactDOM from 'react-dom'

export default function Modal({children , onClose}) {
  return ReactDOM.createPortal  (
    <>
    <div style={OVERLAY_STYLES} />
<div style={MODAL_STYLES}>
    <i class="bi bi-x-lg text-danger fs-2 position-relative" style={{left:"97%",cursor:'pointer'}} onClick={onClose}></i>
    {children}
</div>
    </>,
    document.getElementById("cart-root")                //sending the cart to another div to render in html (index.html)
  )
}

const OVERLAY_STYLES ={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0.7)',
    zIndex:100
}

const MODAL_STYLES ={
    position:'fixed',
    top:'5%',
    left:'5%',
    backgroundColor:'rgb(34,34,34)',
    transform:'translate (-50%, -50%)',
    zIndex:100,
    height:'90%',
    width:'90%'
}
