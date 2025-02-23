import { transform } from '@babel/standalone'; // babel 的浏览器版本，可以实时将 tsx 编译成 js
import type { File, Files } from '../../PlaygroundContext';
import { ENTRY_FILE_NAME } from '../../files';
import type { PluginObj } from '@babel/core';

/**
 * 找到文件
 * 逻辑就是如果没有带完整后缀，就把支持的文件后缀都组合起来，查找一下有没有对应的文件
 * @param files
 * @param modulePath
 * @returns
 */
const getModuleFile = (files: Files, modulePath: string) => {
    // 文件名称
    let moduleName = modulePath.split('./').pop() || '';
    // 如果文件没有后缀的时候，例如 ./App
    if (!moduleName.includes('.')) {
        const realModuleName = Object.keys(files)
            .filter((key) => {
                return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('.js') || key.endsWith('.jsx');
            })
            .find((key) => key.split('.').includes(moduleName));

        if (realModuleName) {
            moduleName = realModuleName;
        }
    }

    return files[moduleName];
};

const json2Js = (file: File) => {
    const js = `export default ${file.value}`;
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
};

/**
 * 把内容放在 head 的 style 标签内
 * @param file
 */
const css2Js = (file: File) => {
    const randomId = new Date().getTime();
    const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
})()
    `;
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
};

// 在 babel 的 transform 阶段替换 AST
const customeResolve = (files: Files): PluginObj => ({
    visitor: {
        ImportDeclaration(path) {
            const modulePath = path.node.source.value;
            // 处理文件路径
            if (modulePath.startsWith('.')) {
                // 找到引入的文件
                const file = getModuleFile(files, modulePath);
                if (!file) return;

                if (file.name.endsWith('.css')) {
                    // 如果是 css 文件
                    path.node.source.value = css2Js(file);
                } else if (file.name.endsWith('.json')) {
                    path.node.source.value = json2Js(file);
                } else {
                    /**
                     * 对于 import 来说，直接在浏览器中运行是你不可能的，我们需要动态引入这些依赖
                     * 要不就是学 vite 的 dev server 那样根据 moduleId 返回编译过后的内容，但是作为一个页面，性价比太低
                     * 还可以把一段 JS 代码，用 URL.createObjectURL 和 new Blob 的方式变为一个 url
                     * URL.createObjectURL(new Blob([code], { type: 'application/javascript' }))
                     */
                    path.node.source.value = URL.createObjectURL(
                        new Blob([babelTransform(file.name, file.value, files)], {
                            type: 'application/javascript',
                        })
                    );
                }
            }
        },
    },
});

/**
 * 处理 react 引入问题
 * @param filename
 * @param code
 * @returns
 */
export const beforeTransformCode = (filename: string, code: string) => {
    let _code = code;
    const regexReact = /import\s+React/g;
    if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
        _code = `import React from 'react';\n${code}`;
    }
    return _code;
};

export const babelTransform = (filename: string, code: string, files: Files) => {
    let result = '';
    const _code = beforeTransformCode(filename, code);
    try {
        result = transform(_code, {
            presets: ['react', 'typescript'], // 对 jsx 和 ts 语法做处理
            filename,
            plugins: [customeResolve(files)],
            retainLines: true, // 保持编译后行号与原行号一致
        }).code!;
    } catch (e) {
        console.error('编译出错', e);
    }
    return result;
};

export const compile = (files: Files) => {
    const main = files[ENTRY_FILE_NAME];
    return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
