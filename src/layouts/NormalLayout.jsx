import { Layout, theme } from 'antd';
import HeaderComponent from '../components/base/HeaderComponent';
import FooterComponent from '../components/base/Footer';
import Profile from '../components/base/Profile';
const { Content } = Layout;

const NormalLayout = ({ element }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <HeaderComponent />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        {element}
                        <Profile />
                    </Content>
                </Layout>
            </Content>
            <FooterComponent />
        </Layout>
    );
};
export default NormalLayout;