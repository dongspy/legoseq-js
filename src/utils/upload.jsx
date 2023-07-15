import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from "react";
import pako from "pako"; //

const UploadFile = ({ prompt, setFileData }) => {
    // const [fileList1, setFileList1] = useState([]);
    const [uploadText, setUploadText] = useState(prompt);
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                let content = event.target.result;
                if (file.name.endsWith('.gz')) {
                    // Decompress .gz file
                    const decompressed = pako.inflate(content, { to: 'string' });
                    content = decompressed;
                }
                setUploadText(file.name);
                setFileData(content);
               
            };

            if (file.name.endsWith('.gz')) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
            return false;
        },
        onChange(info) {
            console.log(info.file.originFileObj);
            // setFileList1(info);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                // setFileList1(info.fileList);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (<>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">{uploadText}</p>
            <p className="ant-upload-hint">
                {/* Support for a single or bulk upload. */}
            </p>
        </Dragger>
    </>)
};
export default UploadFile;