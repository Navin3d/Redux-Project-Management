import { Avatar, Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DEVELOPER } from '../../data';
import { setProfile } from '../../redux/profile-slice';
import { getProfile } from '../../services/auth-service';
const { Header } = Layout;

const HeaderComponent = () => {

    const dispatch = useDispatch();
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
            onClick: () => {
                getProfile("me")
                    .then(res => {
                        dispatch(setProfile(res.data["data"]["developer"]))
                    })
                    .catch(e => {
                        console.log(e);
                        dispatch(setProfile(DEVELOPER))
                    });
            }
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