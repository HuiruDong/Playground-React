import { setupTypeAcquisition } from '@typescript/ata'; // 引入源码之后自动识别 ts 类型包，自动下载
import typescriprt from 'typescript';

export const createATA = (onDownloadFile: (code: string, path: string) => void) => {
    const ata = setupTypeAcquisition({
        projectName: 'my-ata',
        typescript: typescriprt,
        logger: console,
        delegate: {
            receivedFile: (code, path) => {
                console.log('自动下载的包', path);
                onDownloadFile(code, path);
            },
        },
    });

    return ata;
};
