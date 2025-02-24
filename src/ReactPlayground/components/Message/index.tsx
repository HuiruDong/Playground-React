import { useEffect, useState } from 'react';
import cs from 'classnames';
import styles from './index.module.scss';

interface MessageProps {
    type: 'error' | 'warning';
    content: string;
}

const Message: React.FC<MessageProps> = ({ type, content }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!!content);
    }, [content]);

    return visible ? (
        <div className={cs(styles.msg, styles[type])}>
            <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
            <button onClick={() => setVisible(false)} className={styles.dismiss}>
                X
            </button>
        </div>
    ) : null;
};

export default Message;
