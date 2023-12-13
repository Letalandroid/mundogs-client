import { useState } from 'react';
import styles from './ShopCard.module.scss';

interface Producto {
	ProductoID: number;
	NombreProducto: string;
	Descripcion: string;
	PrecioUnitario: number;
	url_image: string;
}

interface PaymentDetails {
	id: number;
	cantidad: number;
}

interface IShopCard {
	nCliente: string;
	pToPay: PaymentDetails[];
	allProducts: Producto[];
	email: string;
	setShop: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Result {
	message: string;
	error: string;
}

interface Shop {
	idCliente: string | null;
	direccion: string;
	total: number;
}

const shop = async ({ idCliente, direccion, total }: Shop) => {
	try {

		const getIdPC = await fetch('http://localhost:3000/getLastIdPC');
		const idPC = await getIdPC.json();

		const result = await fetch('http://localhost:3000/addPedido', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				idCliente,
				direccion,
				cantidad: total,
				idPC: idPC.recordset[0].idPedidoCompra,
			}),
		});

		// Verificar si la respuesta está en el rango de 200 a 299 (éxito)
		if (result.ok) {
			const responseBody = await result.json();
			console.log(responseBody.message);
		} else {
			console.error('Error en la solicitud:', result.statusText);
		}
	} catch (error) {
		console.error('Error en la solicitud:', error);
	}
};

const ShopCard = ({
	nCliente,
	pToPay,
	email,
	allProducts,
	setShop,
}: IShopCard) => {
	const [direccion, setDireccion] = useState('');
	const [listaProductos, setListaProductos] = useState<Producto[]>([]);

	let total = 0;
	const idCliente = localStorage.getItem('idCliente');

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
					{pToPay.map((p) => {
						for (const prod of allProducts) {
							if (prod.ProductoID === p.id) {
								total += prod.PrecioUnitario * p.cantidad;

								return (
									<div key={prod.ProductoID} className={styles.products}>
										<span>{prod.NombreProducto}</span>
										<span>{prod.PrecioUnitario}</span>
										<span>Cantidad: {p.cantidad}</span>
										<span>Total: {(prod.PrecioUnitario * p.cantidad).toFixed(2)}</span>
									</div>
								);
							}
						}
					})}
				</div>
				<p className={styles.total}>Total: {total.toFixed(2)}</p>
				<p className={styles.direccion}>
					<span>Direccion: </span>
					<input type="text" onChange={(e) => setDireccion(e.target.value)} />
				</p>
				<button
					className={styles.enviar}
					type="button"
					onClick={() => {
						shop({idCliente, direccion, total});
					}}>
					Comprar
				</button>
			</div>
		</div>
	);
};

export default ShopCard;

// idCLiente
// direccion
// cantidadRemitente
// idProducto
// idPedidoCompra
// Añadir Movimientos
