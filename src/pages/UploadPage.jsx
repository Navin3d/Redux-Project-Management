import React, { useState, useEffect } from 'react';
import UploadBox from '../components/parser/UploadBox';
import SideNavLayout from "../layouts/SideNavLayout";
import { Button, message, Steps, theme, Popover } from 'antd';
import { PreviewBox, RemarksBox } from '../components/parser/TextBox';

const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                step {index} status: {status}
            </span>
        }
    >
        {dot}
    </Popover>
);

const UploadCompoent = _ => {
    const { token } = theme.useToken();    
    const [processStatus, setProcessState] = useState("process");    
    const [nextDisabled, toggleNext] = useState(false);    
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = [
        {
            title: 'Upload',
            content: <UploadBox />,
            description: "Kindly Select 3 files"
        },
        {
            title: 'Validations',
            content: <RemarksBox />,
            description: "Error Handling"
        },
        {
            title: 'Preview',
            description: "Feel free to change at this point",
            content: <PreviewBox />,
        },
        {
            title: 'Finish',
            description: "Completed!",
            content: 'The Datas are saved to Database Successfully.',
        },
    ]

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    useEffect(() => {
        progressEachStep();
    }, [current]);

    const progressEachStep = () => {

    }

    return (
        <div>
            <Steps
                current={current}
                items={items}
                status={processStatus}
                progressDot={customDot}
            />
            <div style={contentStyle}>{items[current].content}</div>
            <div>
                {current < items.length - 1 && (
                    <Button
                        disabled={nextDisabled}
                        type="primary"
                        onClick={() => next()}
                    >
                        Next
                    </Button>
                )}
                {current === items.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success('Processing complete!')}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '5% 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}

const UploadPage = _ => {
    return (
        <div>
            <SideNavLayout element={<UploadCompoent />} breadcrumb={[{ title: "Upload" }, { title: "File" }]} />
        </div>
    );
};

export default UploadPage;
