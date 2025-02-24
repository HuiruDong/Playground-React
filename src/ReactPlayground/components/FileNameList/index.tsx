import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { FileNameItem } from './FileNameItem';
import styles from './index.module.scss';

const FileNameList: React.FC = () => {
    const { files, selectedFileName, setSelectedFileName, updateFileName } = useContext(PlaygroundContext);
    const [tabs, setTabs] = useState(['']);

    const handleEditComplete = (name: string, preName:string) => {
        updateFileName(preName,name)
        setSelectedFileName(name)
    }

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
                    onEditComplete={(name: string) => handleEditComplete(name, tab)}
                />
            ))}
        </div>
    );
};

export default FileNameList;
