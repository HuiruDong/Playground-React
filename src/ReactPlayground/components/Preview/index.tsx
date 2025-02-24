import { PlaygroundContext } from '../../PlaygroundContext';
import { useContext, useEffect, useState } from 'react';
import { compile } from './compiler';
import { IMPORT_MAP_FILE_NAME } from '../../files';
import iframeRaw from './iframe.html?raw';
import Message from '../Message';

type MessageData =  {
    data: {
      type: string
      message: string
    }
}

const Preview: React.FC = () => {
    const { files } = useContext(PlaygroundContext);
    const [compiledCode, setCompiledCode] = useState('');
    const [error, setError] = useState('')

    const getIframeUrl = () => {
        const res = iframeRaw
            .replace(
                '<script type="importmap"></script>',
                `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
            )
            .replace(
                '<script type="module" id="appSrc"></script>',
                `<script type="module" id="appSrc">${compiledCode}</script>`
            );
        return URL.createObjectURL(new Blob([res], { type: 'text/html' }));
    };

    const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

    const handleMessage = (msg: MessageData) => {
        const {type, message} = msg.data
        if (type === 'ERROR') {
            setError(message)
        }

    }

    useEffect(() => {
        setIframeUrl(getIframeUrl());
    }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

    useEffect(() => {
        setCompiledCode(compile(files));
    }, [files]);

    useEffect(() => {
        // 监听 iframe 传递过来的 error message
        window.addEventListener('message', handleMessage)
        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    return (
        <div style={{ height: '100%' }}>
            <iframe
                src={iframeUrl}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'none',
                }}
            />
            <Message type='error' content={error} />
        </div>
    );
};

export default Preview;
