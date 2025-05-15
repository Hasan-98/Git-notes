import './Header.css'
import logo from './Emumba Logo 1.png'
export default function Header() {
    return (
        <header className="header">
            <nav>
                <img src={logo} alt="logo" className="logo" />
            </nav>
        </header>
    );
}