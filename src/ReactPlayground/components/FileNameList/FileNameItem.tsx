import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Popconfirm } from 'antd';

export interface FileNameItemProps {
    value: string;
    actived: boolean;
    onClick: () => void;
    onEditComplete: (name: string) => void;
    creating: boolean;
    onRemove: () => void;
    readonly: boolean;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
    const { value, actived = false, onClick, onEditComplete, creating, onRemove, readonly } = props;
    const [editing, setEditing] = useState(creating);
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(value);

    const handleDoubleClick = () => {
        setEditing(true);
        setTimeout(() => {
            inputRef?.current?.focus();
        }, 0);
    };

    const handleBlur = () => {
        setEditing(false);
        onEditComplete(name);
    };

    useEffect(() => {
        if (creating) {
            inputRef?.current?.focus();
        }
    }, [creating]);

    return (
        <div className={classnames(styles['tab-item'], actived ? styles.actived : null)} onClick={onClick}>
            {editing ? (
                <input
                    ref={inputRef}
                    className={styles['tabs-item-input']}
                    value={name}
                    onChange={(evt) => {
                        setName(evt.target.value);
                    }}
                    onBlur={handleBlur}
                />
            ) : (
                <>
                    <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>{name}</span>
                    {!readonly && (
                        <Popconfirm
                            title='确认删除该文件吗？'
                            okText='确定'
                            cancelText='取消'
                            onConfirm={(evt) => {
                                evt?.stopPropagation();
                                onRemove();
                            }}
                        >
                            <span style={{ marginLeft: 5, display: 'flex', cursor: 'pointer' }}>
                                <svg width='12' height='12' viewBox='0 0 24 24'>
                                    <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                                    <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
                                </svg>
                            </span>
                        </Popconfirm>
                    )}
                </>
            )}
        </div>
    );
};
