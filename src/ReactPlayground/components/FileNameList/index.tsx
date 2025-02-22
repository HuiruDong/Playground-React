import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { FileNameItem } from './FileNameItem';
import styles from './index.module.scss';

const FileNameList: React.FC = () => {
    const { files, selectedFileName, setSelectedFileName } = useContext(PlaygroundContext);
    const [tabs, setTabs] = useState(['']);

    useEffect(() => {
        setTabs(Object.keys(files));
    }, [files]);

    return (
        <div className={styles.tabs}>
            {tabs.map((tab, index) => (
                <FileNameItem
                    key={`${tab}_${index}`}
                    value={tab}
                    actived={selectedFileName === tab}
                    onClick={() => setSelectedFileName(tab)}
                />
            ))}
        </div>
    );
};

export default FileNameList;
