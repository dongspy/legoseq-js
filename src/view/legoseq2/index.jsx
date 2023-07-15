import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Col, Row, Input, Button, Card, List, Space, Spin } from 'antd';
import React, { useState, useRef } from "react";
import pako from "pako"; // You need to install this library for handling gzip files: npm install pako
import init, { add, read_align, FqRecord } from 'legoseq';
import "./default.css";
import UploadFile from "../../utils/upload"


const get_fastq_num = async (data) =>{
    await init();
    let fq = new FqRecord(data);
    console.log(fq.len());
    return fq.len()
}

function process_read_html(data) {
    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <h2>{item.read_name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: item.html }} />
                </div>
            ))}
        </div>
    );
}

const LegoSeq = () => {
    const [fileContent, setFileContent] = useState();
    const [blockInfo, setBlockInfo] = useState('');
    const [fastaSeq, setFastaSeq] = useState('');
    const [alignInfo, setAlignInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfig, setShowConfig] = useState(true);
    const fqInput = useRef();
    const blockInput = useRef();
    const faInput = useRef();

    const read_align_rs = async (seq_info, blockinfo_str, fasta_file) => {
        setIsLoading(true);
        await init();
        let value = read_align(seq_info, blockinfo_str, fasta_file);
        setAlignInfo(value);
        setIsLoading(false);
    }

    const handleClick = () => {
        console.log("fileContent", fileContent);
        console.log("blockInfo", blockInfo);
        console.log("fastaSeq", fastaSeq);
        setShowConfig(false);
        setIsLoading(true);
        read_align_rs(fileContent, blockInfo, fastaSeq);

        get_fastq_num(fileContent).then((value) => {
            console.log("fqnum", value);
        })
        // .then((value) => {
        //     console.log(value);
        //     // setAlignInfo(process_read_html(value));
        //     // setAlignInfo(value);
        //     // setIsLoading(false);
            
        // });
        

        // setAlignInfo("Loading");

        // read_align(seq_info: &str, blockinfo_str: &str, fasta_file: &str)
    };

    const fastq_props = {
        prompt: "Please upload your fastq file",
        setFileData: setFileContent
    };

    const blockinfo_props = {
        prompt: "Please upload your blockinfo file",
        setFileData: setBlockInfo
    };

    const fasta_props = {
        prompt: "Please upload your fasta file",
        setFileData: setFastaSeq
    };

    return (<>
        {showConfig && <Row >
            <Col span={8}>
                <UploadFile {...fastq_props} ></UploadFile>
            </Col>
            <Col span={8}>
                <UploadFile {...blockinfo_props} ></UploadFile>
            </Col>
            <Col span={8}>

                <UploadFile {...fasta_props} ></UploadFile>
            </Col>
        </Row>}

        {!showConfig &&
            <Button type="primary" onClick={() => setShowConfig(!showConfig)} block>
                show config
            </Button>
        }
        {showConfig &&
            <Row>
                <Button type="primary" onClick={handleClick} block>
                    Submit
                </Button>
            </Row>
        }
        {!showConfig &&
            (isLoading ? (
                <Row>
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                    </Row>
                ):
                (<Row>
                    <List
                        itemLayout="horizontal"
                        dataSource={alignInfo}
                        renderItem={(item) => (
                            <List.Item>
                                <h2>{item.read_name}</h2>
                                <div dangerouslySetInnerHTML={{ __html: item.html }} />
                            </List.Item>
                        )}
                    />

                </Row>)
            )
        }


        
    </>)
};
export default LegoSeq;