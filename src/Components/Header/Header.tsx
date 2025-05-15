import './Header.css'
import logo from './Emumba Logo 1.png'
import Search from '../Search/Search';
export default function Header() {
    return (
        <header className="header">
            <nav>
                <img src={logo} alt="logo" className="logo" />
                <Search />
            </nav>
        </header>
    );
}