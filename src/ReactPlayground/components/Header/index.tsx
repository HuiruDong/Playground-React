import LogoSvg from '../../../assets/icon.svg';
import styles from './index.module.scss';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';

const Header: React.FC = () => {
    const { theme, setTheme } = useContext(PlaygroundContext);

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img alt='logo' src={LogoSvg} />
                <span>React Playground</span>
            </div>
            <div className={styles.links}>
                {theme === 'light' && (
                    <MoonOutlined title='切换暗色主题' className={styles.theme} onClick={() => setTheme('dark')} />
                )}
                {theme === 'dark' && (
                    <SunOutlined title='切换亮色主题' className={styles.theme} onClick={() => setTheme('light')} />
                )}
            </div>
        </div>
    );
};

export default Header;
