import MonacoEditor from '@monaco-editor/react';
import type { OnMount, EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import { createATA } from './ata';
import type { editor } from 'monaco-editor';

type EditorFile = {
    name: string;
    value: string;
    language: string;
};

export interface EditorProps {
    file: EditorFile;
    onChnage: MonacoEditorProps['onChange'];
    options?: editor.IStandaloneEditorConstructionOptions;
}

const Editor: React.FC<EditorProps> = ({ file, onChnage, options }) => {
    // editor 加载完成的回调
    const handleEditorMount: OnMount = (editor, monaco) => {
        // 借助 ata 解决第三方依赖的类型提示、识别问题
        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`);
        });

        editor.onDidChangeModelContent(() => {
            ata(editor.getValue());
        });

        ata(editor.getValue());

        // 添加快捷键
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run();
        });

        // 配置 tsconfig
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        });
    };

    return (
        <MonacoEditor
            height='100%'
            path={file.name}
            language={file.language}
            value={file.value}
            onChange={onChnage}
            onMount={handleEditorMount}
            options={{
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                },
                ...options,
            }}
        />
    );
};

export default Editor;
