import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


const UploadBox = ({ actionURL="http://127.0.0.1:8000/uploadfile/" }) => {
    const [files, setFiles] = useState(null);
    const props = {
        name: "files",
        multiple: true,
        action: actionURL,
        onChange(info) {
            const { status } = info.file;
            const fileCheck = []
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
                // for (const file of info.fileList) {
                //     const extension = file.name.split(".")[1]
                //     fileCheck.push(file.name.split(".")[0])
                //     if(extension != "csv" && extension != "xlxs" && extension != "xls") {
                //         message.error(`${file.name} file extension must be [xlxs, csv, xls]`);
                //     }
                // }
                // if(fileCheck.length > 3) {
                //     message.error(`Upload Only 3 files.`);
                // }
                // if(fileCheck.indexOf("project") < 0 && fileCheck.indexOf("developer") < 0 && fileCheck.indexOf("task") < 0) {
                //     message.error(`File name should match project, developer, task`);
                // }
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    );
}

export default UploadBox;
