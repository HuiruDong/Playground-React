import FileNameList from '../FileNameList';
import Editor from '../Editor';
import { useContext } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { debounce } from 'lodash-es';

const CodeEditor: React.FC = () => {
    const { selectedFileName, files, setFiles, theme } = useContext(PlaygroundContext);

    const file = files[selectedFileName];

    const onEditorChange = (value?: string) => {
        files[file.name].value = value!;
        setFiles({ ...files });
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <FileNameList />
            <Editor file={file} onChnage={debounce(onEditorChange, 500)} options={{ theme: `vs-${theme}` }} />
        </div>
    );
};

export default CodeEditor;
