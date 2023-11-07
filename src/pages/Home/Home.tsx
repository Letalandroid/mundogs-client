import styles from './Home.module.scss';
import logo from '../../assets/logo.jpg';
import user from '../../assets/user_icon.jpg';
import { useEffect, useState, useMemo, useCallback } from 'react';
import ProductoCard from '../../components/ProductoCard/ProductoCard';
import ShopCard from '../../components/ShopCard/ShopCard';

interface Producto {
	ProductoID: number;
	NombreProducto: string;
	Descripcion: string;
	PrecioUnitario: number;
	url_image: string;
}

interface Cliente {
	idCliente: number;
	nombres: string;
	apellidos: string;
	email: string;
	tlf: string;
}

const Home = () => {
	const [id, setId] = useState(0);
	const [name, setName] = useState('');
	const [message, setMessage] = useState('Cargando datos...');
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(500);
	const [porId, setPorId] = useState(false);
	const [disponible, setDisponible] = useState(true);
	const [data, setData] = useState<Producto[]>([]);
	const productos = useMemo(() => [], []);
	const [l, setLength] = useState(false);
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [shop, setShop] = useState(false);

	localStorage.setItem('idCliente', '1');

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

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:3000/getClients', {
				method: 'GET',
			});
			const r = await response.json();

			setClientes(r.recordset);
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
				porId,
				disponible,
			}),
		});
		const r = await response.json();

		if (!r.message) {
			setMessage('Cargando datos...');
			setData(r.recordset);
		} else {
			setMessage(r.message);
		}
	};

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
				{clientes.map((cliente) => {
					if (cliente.idCliente == localStorage.getItem('idCliente') && shop) {
						return (
							<ShopCard
								key={cliente.idCliente}
								nCliente={`${cliente.nombres} ${cliente.apellidos}`}
								pToPay={productos}
								email={cliente.email}
								allProducts={data}
								setShop={setShop}
							/>
						);
					}
				})}
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
							onChange={(e) => {
								setName(e.target.value);
							}}
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
								defaultChecked
								onChange={(e) => setDisponible(e.target.checked)}
							/>
							<span>Stock disponible</span>
						</div>
						<button className={styles.btn__buscar} onClick={buscar}>
							Buscar
						</button>
						{productos.length >= 1 ? (
							<button
								className={styles.btn__comprar}
								onClick={() => setShop(true)}>
								Comprar
							</button>
						) : (
							''
						)}
					</div>
					<div className={styles.productos__container}>
						{data.length > 0 && message === 'Cargando datos...' ? (
							data.map((p) => {
								return (
									<ProductoCard
										key={p.ProductoID}
										id={p.ProductoID}
										name={p.NombreProducto}
										descripcion={p.Descripcion}
										price={p.PrecioUnitario}
										url_img={p.url_image}
										setLength={setLength}
										productos={productos}
									/>
								);
							})
						) : (
							<h2>{message}</h2>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
