import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Col, Row, Input, Button } from 'antd';
import React, { useState } from "react";
import pako from "pako"; // You need to install this library for handling gzip files: npm install pako
import init, {add, read_align} from 'legoseq';
// import init, {fib, align } from "rust-libs";


export const read_align_rs = async (seq_info, blockinfo_str, fasta_file) => {
    await init();
    return read_align(seq_info, blockinfo_str, fasta_file);
  }

// export const alignrs = async (x, y) => {
//     await init();
//     return align(x, y);
//   }

export const addrs = async (x, y) => {
    await init();
    return add(x, y);
  }
  

const LegoSeq = () => {
    const [fileContent, setFileContent] = useState('');
    const [blockInfo, setBlockInfo] = useState('');
    const [fastaSeq, setFastaSeq] = useState('');
    const [alignInfo, setAlignInfo] = useState('');
    const { TextArea } = Input;

    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        beforeUpload: file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                let content = event.target.result;
                if (file.name.endsWith('.gz')) {
                    // Decompress .gz file
                    const decompressed = pako.inflate(content, { to: 'string' });
                    content = decompressed;
                }

                // Split content into lines
                const lines = content.split('\n');
                setFileContent(content);
            };

            if (file.name.endsWith('.gz')) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
            // Prevent upload
            return false;
        },
        onChange(info) {
            console.log(info.file.originFileObj);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            // handleFileUpload(info.file.originFileObj);
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    // async function run() {
    //     await init();  // 确保模块已经被初始化
    //     const result = add(1, 2);
    //     console.log(result);
    //   };
    // run();

    const handleClickJs = async() => {
        // alignrs("AAAAAAAAAA", "AAAAAAAAAA").then(value => {
        //     setAlignInfo(value)
        //   })
        addrs(1, 2).then((value) => {
            setAlignInfo(value)
        })
      }

    const handleClick = () => {
        // console.log('Input 1:', input1);
        // console.log('Input 2:', input2);
        // init();
//         setFileContent(`@HISEQ_HU01:89:H7YRLADXX:1:1101:1573:2113 1:N:0:ATCACG
// ATCGATCGTAAAAA
// +
// ATCGATCGTAAAAA`);
        setBlockInfo(`idx	seq_type	fasta_seq_id	max_mismatch	query_start	query_end	seq_len	method
aa	Anchor	aa1,aa2	2				ANT
bb	Anchor	bb1,bb2	2				ANT
cc	Anchor	cc1,cc2	2				ANT`);
        setFastaSeq(`>aa1
CCCAGCCTCACGTATTCC
>aa2
GACTTGTGTTGG
>bb1
ATCGATCGTAAAAA
>bb2
ATCGATCGTAAAAA
>cc1
ATCGATCGTAAAAA
>cc2
ATCGATCGTAAAAA`);
        console.log("fileContent", fileContent);
        console.log("blockInfo", blockInfo);
        console.log("fastaSeq", fastaSeq);
        setAlignInfo("Loading");
        read_align_rs(fileContent, blockInfo, fastaSeq).then((value) => {
            setAlignInfo(value);
        });
       
        // read_align(seq_info: &str, blockinfo_str: &str, fasta_file: &str)
      };

    
    return (<>
        <Row>
        </Row>
        <Row>
            <Col span={8}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">upload fastq(.gz) file</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </Col>
            <Col span={8}>
                <TextArea id="bi" placeholder="block info" 
                style={{
                    height: 120,
                    marginBottom: 24,
                }} 
                // onChange={e => setBlockInfo(e.target.value)}
                />
            </Col>
            <Col span={8}>
                <TextArea id="fasta" placeholder="fasta"
                    style={{
                        height: 120,
                        marginBottom: 24,
                    }} 
                    // onChange={e => setFastaSeq(e.target.value)}
                    />

            </Col>
        </Row>

        <Row>
            <Button type="primary" onClick={handleClick} block>
                Submit
            </Button>
        </Row>
        <Row>
            <div>
            alignInfo {alignInfo}
            </div>
        </Row>
    </>)
};
export default LegoSeq;