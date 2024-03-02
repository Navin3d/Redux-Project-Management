import { Avatar, Layout, Menu, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DEVELOPER } from '../../data';
import { setProfile } from '../../redux/profile-slice';
import { getProfile } from '../../services/auth-service';
import { reset, toggleWeb3 } from '../../redux/auth-slice';
import { destroyProject } from '../../redux/project-slice';
import { toggleWeb3Status } from '../../services/web3-service';
const { Header } = Layout;

const ConnectBlockchainButton = () => {
    const enabledWeb3 = useSelector(state => state.auth.enabledWeb3);
    const dispatch = useDispatch();

    console.log("enabledWeb3", enabledWeb3)

    return (
        <div>
            <h1 style={{ color: "white" }}>xxx {"" + enabledWeb3}</h1>
            <input type="checkbox" defaultValue={!enabledWeb3} onChange={(e) => {
                console.log("hhh", e.target.checked);
                toggleWeb3Status(e.target.checked);
                dispatch(toggleWeb3(e.target.checked));
            }} id="lock" />
            <label for="lock" class="lock-label">
                <span class="lock-wrapper">
                    <span class="shackle"></span>
                    <svg
                        class="lock-body"
                        width=""
                        height=""
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 5C0 2.23858 2.23858 0 5 0H23C25.7614 0 28 2.23858 28 5V23C28 25.7614 25.7614 28 23 28H5C2.23858 28 0 25.7614 0 23V5ZM16 13.2361C16.6137 12.6868 17 11.8885 17 11C17 9.34315 15.6569 8 14 8C12.3431 8 11 9.34315 11 11C11 11.8885 11.3863 12.6868 12 13.2361V18C12 19.1046 12.8954 20 14 20C15.1046 20 16 19.1046 16 18V13.2361Z"
                            fill="white"
                        ></path>
                    </svg>
                </span>
            </label>
        </div>
    );
}

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
            onClick: () => { dispatch(reset()); dispatch(destroyProject()); }
        },
    ];

    return (
        <div>
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
                <Tooltip title="Store Project Securely In Blockchain." color={"red"} >
                    <ConnectBlockchainButton />
                </Tooltip>
            </Header>
        </div>
    );
}

export default HeaderComponent;