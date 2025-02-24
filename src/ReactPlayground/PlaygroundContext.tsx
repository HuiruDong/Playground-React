import { createContext } from 'react';

export interface File {
    name: string;
    value: string;
    language: string;
}

export interface Files {
    [key: string]: File;
}

export type Theme = 'light' | 'dark';

export interface PlaygroundContext {
    // 文件相关
    files: Files;
    selectedFileName: string;
    setSelectedFileName: (fileName: string) => void;
    setFiles: (files: Files) => void;
    addFile: (fileName: string) => void;
    removeFile: (fileName: string) => void;
    updateFileName: (oldFieldName: string, newFieldName: string) => void;
    // 主题相关
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
    selectedFileName: 'App.tsx',
} as PlaygroundContext);
