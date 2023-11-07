import { useState } from 'react';
import styles from './ShopCard.module.scss';

interface Producto {
	ProductoID: number;
	NombreProducto: string;
	Descripcion: string;
	PrecioUnitario: number;
	url_image: string;
}

interface IShopCard {
	nCliente: string;
	pToPay: number[];
	allProducts: Producto[];
	email: string;
	setShop: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShopCard = ({
	nCliente,
	pToPay,
	email,
	allProducts,
	setShop,
}: IShopCard) => {
	let total_prod = 0;
	let cantidad = 0;

	const sumTotal = (n: number) => {
		total_prod += n;
	};

	const sumCantidad = (n: number) => {
		sumTotal(n * cantidad);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__child}>
				<button onClick={() => setShop(false)} className={styles.cerrar}>
					X
				</button>
				<h3>BOLSA DE COMPRA</h3>
				<div>
					<p>Sr(a) {nCliente} sus productos a comprar son los siguientes:</p>
				</div>
				<div className={styles.container__products}>
					<h4>Productos:</h4>
					{pToPay.map((id) => {
						for (const prod of allProducts) {
							if (prod.ProductoID === id) {
								sumTotal(prod.PrecioUnitario);
								return (
									<div key={prod.ProductoID} className={styles.products}>
										<span>{prod.NombreProducto}</span>
										<span>{prod.PrecioUnitario}</span>
										<p>
											<span>Cantidad: </span>
											<input
												onChange={(e) => sumCantidad(parseInt(e.target.value))}
												type="number"
												name="cantidad"
												min={1}
												max={20}
											/>
										</p>
									</div>
								);
							}
						}
					})}
				</div>
				<p className={styles.total}>Total: {total_prod}</p>
				<p className={styles.direccion}>
					<span>Direccion: </span>
					<input type="text" />
				</p>
				<button
					className={styles.enviar}
					type="button"
					onClick={() => console.log('datos enviador')}>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default ShopCard;
