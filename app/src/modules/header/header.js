import avatar from '../../img/user-avatar.png';
import arrow from '../../img/arrow-down.svg';

import { useState, useEffect, useRef } from 'react';

function Header() {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null);

    const onOpenMenu = () => {
        setMenu(!menu);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="container">
                <div className="header-container">
                    <a href="#" className="logo">Awesome Kanban-Board</a>
                    <div className="user-menu" ref={menuRef}>
                        <button onClick={onOpenMenu}>
                            <div className="user-avatar">
                                <img src={avatar} alt="user avatar" />
                            </div>
                            <span><img src={arrow} alt="arrow down" /></span>
                        </button>

                        {menu ? (
                            <div className="dropdown-menu">
                                <ul>
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Log Out</a></li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
