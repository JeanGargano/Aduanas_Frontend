import { useNavigate, useLocation } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determinar cuál está activo basado en la ruta actual
    const activeIndex = SidebarData.findIndex(item => item.link === location.pathname);

    const handleNavigation = (link) => {
        navigate(link);
    };

    return (
        <div className="Sidebar">
            {/* logo */}
            <div className="logo">
                <img src={Logo} alt="" />
                <span>
                    Tit<span></span>ulo
                </span>
            </div>

            {/* Menu Items*/}
            <div className="menu">
                {SidebarData.map((item, index) => (
                    <div
                        className={activeIndex === index ? 'menuItem active' : 'menuItem'}
                        key={index}
                        onClick={() => handleNavigation(item.link)}
                    >
                        <item.icon />
                        <span>{item.heading}</span>
                    </div>
                ))}
                <div className="menuItem">
                    <UilSignOutAlt />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
