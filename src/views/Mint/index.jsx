import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components'
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';
import { Button } from '../../components/Button'
import { Toast } from 'primereact/toast';

// import { Atomicals } from '../../atomicaljs';
// import { ElectrumApi } from '../../atomicaljs/api/electrum-api';
// import { IValidatedWalletInfo, IWalletRecord, validateWalletStorage } from '../../atomicaljs/utils/validate-wallet-storage';

const navList = [
    { label: 'Mint', id: 1 },
    { label: 'Realm', id: 2 },
    { label: 'NFT', id: 3 },
    { label: 'Dmint', id: 4 },
]

const Mint = () => {
    const [currentNav, setCurrentNav] = useState(1)
    const toast = useRef(null);
    // mint
    const [ticker, setTicker] = useState('');
    const [receiveAdr, setReceiveAdr] = useState('');
    // realm
    const [realm, setRealm] = useState('');
    const [bitwork, setBitwork] = useState('');
    // nft
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    // dmint
    const fileInputJsonRef = useRef(null)
    const [fileJson, setFileJson] = useState(null);
    const [previewJson, setPreviewJson] = useState(null);

    const handleTabChange = (id) => {
        setCurrentNav(id)
    }

    // ===================================
    // ===================================
    const findTickers = async (q, verbose = true, asc = true) => {
        // const atomicals = new Atomicals(ElectrumApi.createClient(process.env.ELECTRUMX_PROXY_BASE_URL || '', false));
        // const result = await atomicals.searchTickers(q, verbose, asc);
        // // const result = await atomicals.getGlobal();
        // console.log('find tickers result>>', result)

        // const walletInfo = await validateWalletStorage();
        // console.log('walletInfo>>', walletInfo)
        // const result = await atomicals.initFixedDftInteractive({

        // })
    }

    // nft
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
             // 检查文件大小，限制为 3KB
            if (selectedFile.size > 3 * 1024) {
                show()
                setPreview(null);
                setFile(null);
                return;
            }

            // 预览图片
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);

            // 检查图片大小
            const img = new Image();
            img.src = URL.createObjectURL(selectedFile);
            img.onload = () => {
                setFile(selectedFile);
            };
        }
    }

    // dimt
    const handleUploadJsonClick = () => {
        fileInputJsonRef.current.click();
    };

    const handleFileJsonChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
             // 检查文件大小，限制为 1KB
            if (selectedFile.size > 3 * 1024) {
                show()
                setPreviewJson(null);
                setFileJson(null);
                return;
            }

            setPreviewJson(selectedFile.name)
            setFileJson(selectedFile)
        }
    }

    const show = () => {
        toast.current.show({severity:'warn', summary: 'Warning', detail:'图片大小不能超过 1 kb', life: 3000});
    };

    return (
        <MintWrapper>
            <NavWrapper>
                {
                    navList.map((item, i) => {
                        return <NavItem onClick={() => handleTabChange(item.id)} key={i} current={currentNav === item.id ? 'true' : ''}>{item.label}</NavItem>
                    })
                }

            </NavWrapper>
            {
                currentNav == 1 && (
                    <Card className="w-60rem mx-auto mt-8">
                        <TickerWrapper htmlFor='ticker'>Ticker</TickerWrapper>
                        <InputTextWrapper id='ticker' value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="Enter Ticker to mint..." />
                        <TickerWrapper className='mt-8'>Receiving Address</TickerWrapper>
                        <InputTextWrapper value={receiveAdr} onChange={(e) => setReceiveAdr(e.target.value)} placeholder="Receiving Address..." />
                        <ButtonWrapper className='mt-8' onClick={() => findTickers('wizz')}>Next</ButtonWrapper>
                    </Card>
                )
            }
            {
                currentNav == 2 && (
                    <Card className="w-60rem mx-auto mt-8">
                        <TickerWrapper htmlFor='ticker'>Realm</TickerWrapper>
                        <InputTextWrapper id='ticker' value={realm} onChange={(e) => setRealm(e.target.value)} placeholder="Enter Realm to mint..." />
                        <TickerWrapper className='mt-8'>Bitwork Commit</TickerWrapper>
                        <InputTextWrapper value={bitwork} onChange={(e) => setBitwork(e.target.value)} placeholder="Bitwork Commit..." />
                        <TickerWrapper className='mt-8'>Receiving Address</TickerWrapper>
                        <InputTextWrapper value={receiveAdr} onChange={(e) => setReceiveAdr(e.target.value)} placeholder="Receiving Address..." />
                        <ButtonWrapper className='mt-8'>Next</ButtonWrapper>
                    </Card>
                )
            }
            {
                currentNav == 3 && (
                    <Card className="w-60rem mx-auto mt-8">
                        <UploadBox onClick={handleUploadClick}>
                            {
                                preview
                                    ? <img className='preview' src={preview} />
                                    : <span className='tips'>Please select .png, .jpg, .svg, .gif, .wepb file. (Max: 1kb)</span>
                            }
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                        </UploadBox>
                        <TickerWrapper className='mt-8'>Receiving Address</TickerWrapper>
                        <InputTextWrapper value={receiveAdr} onChange={(e) => setReceiveAdr(e.target.value)} placeholder="Receiving Address..." />
                        <ButtonWrapper className='mt-8'>Next</ButtonWrapper>
                    </Card>
                )
            }
            {
                currentNav == 4 && (
                    <Card className="w-60rem mx-auto mt-8">
                        <UploadBox onClick={handleUploadJsonClick}>
                            {
                                preview
                                    ? <img className='preview' src={preview} />
                                    : <span className='tips'>Please select .json file. (Max: 1kb)</span>
                            }
                            <input type="file" ref={fileInputJsonRef} style={{ display: 'none' }} onChange={handleFileJsonChange} accept=".json,application/json" />
                        </UploadBox>
                        <p>{previewJson}</p>
                        <TickerWrapper className='mt-8'>Receiving Address</TickerWrapper>
                        <InputTextWrapper value={receiveAdr} onChange={(e) => setReceiveAdr(e.target.value)} placeholder="Receiving Address..." />
                        <ButtonWrapper className='mt-8'>Next</ButtonWrapper>
                    </Card>
                )
            }

            <Toast ref={toast} />
        </MintWrapper>
    )
}
const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
const NavItem = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    padding: 0.3rem;
    min-width: 8rem;
    border-radius: 0.4rem;
    text-align: center;
    background-color: var(--gray-800);
    border: 1px solid var(--gray-200);
    cursor: pointer;

    &:first-child {
        margin-left: auto;
    }
    &:last-child {
        margin-right: auto;
    }

    ${props =>
        props.current &&
        css`
            color: ${({ theme }) => theme.main};
            border: 1px solid ${({ theme }) => theme.main};
            box-shadow: 0 2px 1rem rgba(235,185,76,.28);
        `
    }

`
const MintWrapper = styled.div`
    padding: 5rem 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
const TickerWrapper = styled.label`
    font-size: 1rem;
    font-weight: 600;
    display: block;
    padding: 6px 0;
`
const InputTextWrapper = styled(InputText)`
    width: 100%;
`

const ButtonWrapper = styled(Button)`
    font-size: 1.2rem;
    border: 1px solid ${({ theme }) => theme.main};
`
const UploadBox = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid var(--gray-700);
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    margin: 0 auto;
    overflow: hidden;
    .tips {
        font-size: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 280px;
    }
    .preview {
        object-bit: contain;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export default Mint

