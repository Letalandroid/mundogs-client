import styles from './Home.module.scss';
import logo from '../../assets/logo.jpg';
import user from '../../assets/user_icon.jpg';

const Home = () => {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.logo__container}>
						<img src={logo} />
						<span>Mundo GS</span>
					</div>
					<div className={styles.account__container}>
						<button>
							<img src={user} />
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Home;
