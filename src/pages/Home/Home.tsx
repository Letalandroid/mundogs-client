import styles from './Home.module.scss';
import logo from '../../assets/logo.jpg';
import user from '../../assets/user_icon.jpg';
import { useState } from 'react';
import ProductoCard from '../../components/ProductoCard/ProductoCard';

const Home = () => {
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(0);

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
									onChange={(e) => setMinValue(parseInt(e.target.value))}
								/>
							</p>
							<p>Rango de Precios</p>
							<p className={styles.precios__container}>
								<span>S/. {maxValue}</span>
								<input
									type="range"
									onChange={(e) => setMaxValue(parseInt(e.target.value))}
								/>
							</p>
						</div>
						<div className={styles.stock__container}>
							<input className={styles.input__checkbox} type="checkbox" />
							<span>Stock disponible</span>
						</div>
					</div>
					<div className={styles.productos__container}>
						<ProductoCard
							url_img={logo}
                            name='Laptop'
							descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit ..."
                            price={150.55}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
