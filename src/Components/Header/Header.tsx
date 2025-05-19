import './Header.css';
import logo from '../../../public/appLogo.png';
import LoginWithGithub from '../../firebaseAuth';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

export default function Header() {
    const { isLoggedIn, user, login, logout } = useAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogin = async () => {
        try {
            const result = await LoginWithGithub();
            if (result?.token && result?.user) {
                login(result.token, result.user);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    console.log('user in header', user)
    return (
        <header className="header">
            <nav className="nav">
                <img src={logo} alt="logo" className="logo" />
                {
                    isLoggedIn ? (
                        <div className="profile">
                            <img
                                src={user?.avatar_url}
                                alt="profile"
                                className="profile-avatar"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">Signed in as <br /><strong>{user?.name}</strong></div>
                                    <hr />
                                    <a href="#">Your gists</a>
                                    <a href="#">Starred gists</a>
                                    <a href={`https://github.com/${user?.user_name}`} target="_blank" rel="noreferrer">Your GitHub profile</a>
                                    <a href="#">Help</a>
                                    <button onClick={logout}>Sign out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="header__button">Login</button>
                    )
                }
            </nav>
        </header>
    );
}
