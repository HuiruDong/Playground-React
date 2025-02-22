import LogoSvg from '../../../assets/icon.svg';
import styles from './index.module.scss';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img alt='logo' src={LogoSvg} />
                <span>React Playground</span>
            </div>
        </div>
    );
};

export default Header;
