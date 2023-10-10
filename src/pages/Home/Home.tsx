import styles from './Home.module.scss';
import logo from '../../assets/logo.jpg';
import user from '../../assets/user_icon.jpg';
import { useState } from 'react';

const Home = () => {
	const [minValue, setMinValue] = useState('');
	const [maxValue, setMaxValue] = useState('');

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
			<main className={styles.main}>
				<p className={styles.message}>
					¡Todo lo que puedas imaginar, aquí en Mundo GadgetStore!
				</p>
				<div>
					<div className={styles.busqueda}>
						<input
							className={styles.input__buscar}
							type="text"
							placeholder="Buscar..."
						/>
						<div className={styles.busqueda__id}>
							<input className={styles.input__checkbox} type="checkbox" />
							<span>Buscar por ID</span>
							<input type="number" />
						</div>
						<div className={styles.rango__container}>
							<p className={styles.precios__container}>
								<span>S/. {minValue}</span>
								<input
									type="range"
									onChange={(e) => setMinValue(e.target.value)}
								/>
							</p>
							<p>Rango de Precios</p>
							<p className={styles.precios__container}>
								<span>S/. {maxValue}</span>
								<input
									type="range"
									onChange={(e) => setMaxValue(e.target.value)}
								/>
							</p>
						</div>
						<div className={styles.stock__container}>
							<input className={styles.input__checkbox} type="checkbox" />
							<span>Stock disponible</span>
						</div>
					</div>
					<div className={styles.productos__container}></div>
				</div>
			</main>
		</>
	);
};

export default Home;
