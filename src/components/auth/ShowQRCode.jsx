import { Input, QRCode, Space } from 'antd';

const ShowQRCode = ({ link }) => {
    console.log("link ", link);
    return (
        <Space direction="vertical" align="center">
            <QRCode value={link} />
            <Input
                placeholder="-"
                maxLength={60}
                value={link}
                disabled
            />
            <p>Download Google Authenticator and Scan this code.</p>
            <p>Use this OTP on login.</p>
        </Space>
    );
};

export default ShowQRCode;
