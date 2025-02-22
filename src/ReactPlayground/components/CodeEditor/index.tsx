import FileNameList from '../FileNameList';
import Editor from '../Editor';
import type { EditorProps } from '../Editor';

const CodeEditor: React.FC = () => {

    const file: EditorProps['file'] = {
        name: 'yi.tsx',
        value: `import lodash from "lodash";\n\nconst a = <div>guang</div>`,
        language: 'typescript'
    }


    function onEditorChange() {
        console.log(...arguments);
    }

    return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <FileNameList />
        <Editor file={file} onChnage={onEditorChange} />
    </div>
}

export default CodeEditor