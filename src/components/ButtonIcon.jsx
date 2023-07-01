import './ButtonIcon.css';

const ButtonIcon = ( { children, number } ) => {
    return <button className='btn-icon-header'> {children} {number == null ? '' : <span className="icon-bell">{number}</span> } </button>
}

export default ButtonIcon;