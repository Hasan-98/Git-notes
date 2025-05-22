import styles from './Header.module.css';
import logo from '../../../public/appLogo.png';
import LoginWithGithub from '../../firebaseAuth';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import useGistStore from '../../store/gistStore';
import { Link } from 'react-router-dom';

export default function Header() {
    const { isLoggedIn, user, login, logout  } = useAuthStore();
    const { gists } = useGistStore();
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
    
    console.log('user in header', user);
    console.log('gists in header', gists);
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" >
                    <img src={logo} alt="logo" className={styles.logo} />
                </Link>
                {
                    isLoggedIn ? (
                        <div className={styles.profile}>
                            <img
                                src={user?.avatar_url}
                                alt="profile"
                                className={styles["profile-avatar"]}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className={styles["dropdown-menu"]}>
                                    <div className={styles["dropdown-header"]}>Signed in as <br /><strong>{user?.name}</strong></div>
                                    <hr />
                                    <Link to="/profile" state={{ user, gists }}>Your gists</Link>
                                    <Link to="/profile" state={{ user, gists, isStarred: true }}>Starred gists</Link>
                                    <a href={`https://github.com/${user?.user_name}`} target="_blank">Your GitHub profile</a>
                                    <button onClick={logout}>Sign out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={handleLogin} className={styles["header__button"]}>Login</button>
                    )
                }
            </nav>
        </header>
    );
}