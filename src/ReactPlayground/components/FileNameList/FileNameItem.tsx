import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  creating: boolean;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick, onEditComplete, creating } = props;
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
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tabs-item-input"]}
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          onBlur={handleBlur}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};
