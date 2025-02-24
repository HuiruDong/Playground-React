import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { FileNameItem } from './FileNameItem';
import styles from './index.module.scss';
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from '../../files';

const READONLY_FILES = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];

const FileNameList: React.FC = () => {
    const { files, selectedFileName, setSelectedFileName, updateFileName, addFile, removeFile } =
        useContext(PlaygroundContext);
    const [tabs, setTabs] = useState(['']);
    const [creating, setCreating] = useState(false);

    const handleEditComplete = (name: string, preName: string) => {
        updateFileName(preName, name);
        setSelectedFileName(name);
    };

    const addTab = () => {
        const newFileName = `Comp${Math.random().toString().slice(2, 8)}.tsx`;
        addFile(newFileName);
        setSelectedFileName(newFileName);
        setCreating(true);
    };

    const handleRemove = (filename: string) => {
        removeFile(filename);
        setSelectedFileName(ENTRY_FILE_NAME);
    };

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
                    creating={creating && index === tabs.length - 1}
                    onRemove={() => handleRemove(tab)}
                    readonly={READONLY_FILES.includes(tab)}
                />
            ))}
            <div className={styles.add} onClick={addTab}>
                +
            </div>
        </div>
    );
};

export default FileNameList;
