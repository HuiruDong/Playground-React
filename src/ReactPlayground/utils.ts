/**
 * 根据文件后缀名返回对应的 language
 * @param name
 * @returns
 */
export const fileName2Language = (name: string) => {
    const suffix = name.split('.').pop() || '';
    if (['js', 'jsx'].includes(suffix)) return 'javascript';
    if (['ts', 'tsx'].includes(suffix)) return 'typescript';
    if (['json'].includes(suffix)) return 'json';
    if (['css'].includes(suffix)) return 'css';
    return 'javascript';
};
