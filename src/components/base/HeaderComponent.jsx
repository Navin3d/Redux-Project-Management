import { Avatar, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

const HeaderComponent = () => {

    const navigate = useNavigate();

    const navItems = [
        {
            key: "Home",
            label: "Home",
            onClick: () => { navigate("/") }
        },
        {
            key: "Projects",
            label: "Projects",
            onClick: () => { navigate("/projects/all") }
        },
        {
            key: "Profile",
            label: "Profile",
            onClick: () => { navigate("/profile") }
        },
        {
            key: "Logout",
            label: "Logout",
            onClick: () => { navigate("/profile") }
        },
    ];

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Avatar src={"https://content.tupaki.com/twdata/2020/0920/news/Rajni-To-Not-Come-Out-For-Shooting-Till-Vaccine-Arrives--1601448273-1492.jpg"} />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={navItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
        </Header>
    );
}

export default HeaderComponent;