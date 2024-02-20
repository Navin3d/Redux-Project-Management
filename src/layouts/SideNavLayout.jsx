import { createElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExperimentOutlined, UserOutlined, ColumnWidthOutlined, FolderOpenOutlined, BugOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Modal } from 'antd';
import { getProfile, toggleM2F } from '../services/auth-service';
import HeaderComponent from '../components/base/HeaderComponent';
import FooterComponent from '../components/base/Footer';
import ShowQRCode from '../components/auth/ShowQRCode';
import Profile from '../components/base/Profile';
import { setProfile } from '../redux/profile-slice';
import { DEVELOPER } from '../data';
import { useDispatch } from 'react-redux';
const { Content, Sider } = Layout;


const SideNavLayout = ({ element, breadcrumb = [{ title: "Projects" }] }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const [link, setLink] = useState("https://github.com/Navin3d");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEnableM2F = _ => {
        toggleM2F(true)
            .then(res => {
                setLink(res.data["qrcode_url"]);
                setIsModalOpen(true);
            })
            .catch(e => {
                setIsModalOpen(true);
                console.log(e);
            });
    }

    const handleOpenProfile = _ => {
        getProfile("me")
            .then(res => {
                dispatch(setProfile(res.data["data"]["developer"]))
            })
            .catch(e => {
                console.log(e);
                dispatch(setProfile(DEVELOPER))
            });
    }

    const subnavItems = [
        {
            key: `user`,
            icon: createElement(UserOutlined),
            label: `User`,
            children: [
                {
                    key: "Disable M2D",
                    label: "Disable M2F",
                    onClick: () => {
                        toggleM2F(false).catch(e => { console.log(e) });
                    }
                },
                {
                    key: "Enable M2D",
                    label: "Enable M2F",
                    onClick: () => { handleEnableM2F() }
                },
                {
                    key: "Profile",
                    label: "Profile",
                    onClick: () => { handleOpenProfile() }
                }
            ],
        },
        {
            key: `project`,
            icon: createElement(ExperimentOutlined),
            label: `Project`,
            children: [
                {
                    key: "Projects Requests",
                    label: "Requested Projects",
                    onClick: () => {
                        navigate("/projects/requestedProjects", { replace: true });
                    }
                },
                {
                    key: "Ongoing Projects",
                    label: "Ongoing Projects",
                    onClick: () => { navigate("/projects/projects", { replace: true }) }
                },
                {
                    key: "Admin Projects",
                    label: "Admin Projects",
                    onClick: () => { navigate("/projects/createdProjects", { replace: true }) }
                },
                {
                    key: "All Projects",
                    label: "All Projects",
                    onClick: () => { navigate("/projects/all") }
                },
            ],
        },
        {
            key: `tasks`,
            icon: createElement(BugOutlined),
            label: `Tasks`,
            children: [
                {
                    key: "Pending Tasks",
                    label: "Pending Tasks",
                    onClick: () => { navigate("/tasks/auth/pending") }
                },
                {
                    key: "Completed Tasks",
                    label: "Completed Tasks",
                    onClick: () => { navigate("/tasks/auth/completed") }
                },
            ],
        },
        {
            key: `Parser`,
            label: `Parser`,
            type: "group",
            children: [
                {
                    key: "Parser",
                    icon: createElement(FolderOpenOutlined),
                    label: "Upload Projects",
                    onClick: () => { navigate("/upload") }
                },
                {
                    key: "toggle",
                    icon: createElement(ColumnWidthOutlined),
                    label: "Toggle",
                    onClick: () => { setCollapsed(!collapsed) }
                },
            ],
        },
    ];

    return (
        <Layout>
            <HeaderComponent />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    items={breadcrumb}
                />
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        collapsible
                        collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultOpenKeys={['project']}
                            style={{
                                height: '100%',
                            }}
                            items={subnavItems}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 250,
                        }}
                    >
                        {element}
                        <Modal title="Authenticator Token" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <ShowQRCode link={link} />
                        </Modal>
                        <Profile />
                    </Content>
                </Layout>
            </Content>
            <FooterComponent />
        </Layout>
    );
};

export default SideNavLayout;
