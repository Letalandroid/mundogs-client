import styles from './Home.module.scss';
import logo from '../../assets/logo.jpg';
import user from '../../assets/user_icon.jpg';
import { useEffect, useState } from 'react';
import ProductoCard from '../../components/ProductoCard/ProductoCard';

interface Producto {
	ProductoID: number;
	NombreProducto: string;
	Descripcion: string;
	PrecioUnitario: number;
}

const Home = () => {
	const [id, setId] = useState(0);
	const [name, setName] = useState('');
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(500);
	const [porId, setPorId] = useState(false);
	const [data, setData] = useState<Producto[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:3000/getProducts', {
				method: 'GET',
			});
			const r = await response.json();

			setData(r.recordset);
		};

		fetchData();
	}, []);

	const buscar = async () => {
		const response = await fetch('http://localhost:3000/searchProducts', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify({
				id,
				name,
				minValue,
				maxValue,
			}),
		});
		const r = await response.json();

		setData(r.recordset);
	}

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
							disabled={porId}
							onChange={(e) => setName(e.target.value)}
						/>
						<div className={styles.busqueda__id}>
							<input
								className={styles.input__checkbox}
								type="checkbox"
								defaultChecked={false}
								onChange={(e) => {
									setPorId(e.target.checked);
								}}
							/>
							<span>Buscar por ID</span>
							<input
								type="number"
								disabled={!porId}
								onChange={(e) => setId(parseInt(e.target.value))}
							/>
						</div>
						<div className={styles.rango__container}>
							<p className={styles.precios__container}>
								<span>S/. {minValue}</span>
								<input
									type="range"
									value={minValue}
									min={0}
									max={500}
									onChange={(e) => setMinValue(parseInt(e.target.value))}
								/>
							</p>
							<p>Rango de Precios</p>
							<p className={styles.precios__container}>
								<span>S/. {maxValue}</span>
								<input
									type="range"
									value={maxValue}
									min={0}
									max={500}
									onChange={(e) => setMaxValue(parseInt(e.target.value))}
								/>
							</p>
						</div>
						<div className={styles.stock__container}>
							<input
								className={styles.input__checkbox}
								type="checkbox"
								checked
							/>
							<span>Stock disponible</span>
						</div>
						<button onClick={buscar}>Buscar</button>
					</div>
					<div className={styles.productos__container}>
						{data.length > 0 ? (
							data.map((p) => {
								return (
									<ProductoCard
										key={p.ProductoID}
										name={p.NombreProducto}
										descripcion={p.Descripcion}
										price={p.PrecioUnitario}
										url_img={logo}
									/>
								);
							})
						) : (
							<h2>Cargando datos...</h2>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
