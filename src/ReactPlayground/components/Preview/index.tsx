import { PlaygroundContext } from '../../PlaygroundContext';
import { useContext, useEffect, useState } from 'react';
import { compile } from './compiler';
import { IMPORT_MAP_FILE_NAME } from '../../files';
import iframeRaw from './iframe.html?raw';

const Preview: React.FC = () => {
    const { files } = useContext(PlaygroundContext);
    const [compiledCode, setCompiledCode] = useState('');

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

    useEffect(() => {
        setIframeUrl(getIframeUrl());
    }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

    useEffect(() => {
        setCompiledCode(compile(files));
    }, [files]);

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
        </div>
    );
};

export default Preview;
