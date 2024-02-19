import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExperimentOutlined, UserOutlined, BarsOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HeaderComponent from '../components/base/Header';
import FooterComponent from '../components/base/Footer';
const { Content, Sider } = Layout;


const SideNavLayout = ({ element, breadcrumb = [{ title: "/" }] }) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const subnavItems = [
        {
            key: `user`,
            icon: createElement(UserOutlined),
            label: `User`,
            children: [
                {
                    key: "Disable M2D",
                    label: "Disable M2F",
                    onClick: () => { navigate("/profile") }
                },
                {
                    key: "Enable M2D",
                    label: "Enable M2F",
                    onClick: () => { navigate("/profile") }
                },
                {
                    key: "Profile",
                    label: "Profile",
                    onClick: () => { navigate("/profile") }
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
                    onClick: () => { navigate("/projects/requested") }
                },
                {
                    key: "Ongoing Projects",
                    label: "Ongoing Projects",
                    onClick: () => { navigate("/projects/ongoing") }
                },
                {
                    key: "Admin Projects",
                    label: "Admin Projects",
                    onClick: () => { navigate("/projects/admin") }
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
            icon: createElement(BarsOutlined),
            label: `Tasks`,
            children: [
                {
                    key: "Pending Tasks",
                    label: "Pending Tasks",
                    onClick: () => { navigate("/tasks/pending") }
                },
                {
                    key: "Completed Tasks",
                    label: "Completed Tasks",
                    onClick: () => { navigate("/tasks/completed") }
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
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}
                            items={subnavItems}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        {element}
                    </Content>
                </Layout>
            </Content>
            <FooterComponent />
        </Layout>
    );
};

export default SideNavLayout;
