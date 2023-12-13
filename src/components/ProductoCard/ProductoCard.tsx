import { SetStateAction, useState } from 'react';
import styles from './ProductoCard.module.scss';

interface PaymentDetails {
	id: number;
	cantidad: number;
}
interface Producto {
	id: number;
	url_img: string;
	name: string;
	descripcion: string;
	price: number;
	setLength: React.Dispatch<SetStateAction<boolean>>;
	productos: PaymentDetails[];
	setProductos: React.Dispatch<SetStateAction<PaymentDetails[]>>;
}

const ProductoCard = ({
	id,
	url_img,
	name,
	descripcion,
	price,
	setLength,
	productos,
	setProductos
}: Producto) => {
	const [btnShopCancel, setBtnSC] = useState(false);
	const [check, setCheck] = useState(false);
	const [cantidad, setCantidad] = useState(1);

	const handleProduct = (e) => {
		if (
			check &&
			e.target.localName !== 'input' &&
			e.target.localName !== 'button'
		) {
			setCheck(false);
			setBtnSC(false);

			const indexToRemove = productos.findIndex((value) => value.id === id);

			if (indexToRemove !== -1) {
				const newProductos = [...productos];
				newProductos.splice(indexToRemove, 1);
				setProductos(newProductos);
				setBtnSC(!btnShopCancel);
			}
		} else if (
			!check &&
			e.target.localName !== 'input' &&
			e.target.localName !== 'button'
		) {
			setCheck(true);
			setBtnSC(true);
		}

		setLength(productos.length !== 0);
	};

	const addShop = () => {
		const newProductos = [...productos, { id, cantidad }];
		setProductos(newProductos);
		setBtnSC(false);
	};

	const removeShop = () => {
		if (!btnShopCancel) {
			const indexToRemove = productos.findIndex((value) => value.id === id);

			if (indexToRemove !== -1) {
				const newProductos = [...productos];
				newProductos.splice(indexToRemove, 1);
				setProductos(newProductos);
				setBtnSC(!btnShopCancel);
			}
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleProduct();
		}
	};

	return (
		<div
			onClick={(e) => handleProduct(e)}
			onKeyDown={handleKeyPress}
			className={
				!check ? styles.card__container : styles.card__container__check
			}>
			<span className={styles.key}>ID: {id}</span>
			<img src={url_img} alt={name} />
			<div className={styles.data}>
				<p>
					<b>Producto:</b> {name}
				</p>
				<p>
					<b>Descripcion:</b> {descripcion}
				</p>
				{check ? (
					<>
						<p className={styles.cant__input}>
							<b>Cantidad:</b>
							<input
								onChange={(e) => setCantidad(parseInt(e.target.value))}
								type="number"
								defaultValue={1}
								min={1}
								max={20}
							/>
						</p>
						<p>
							{btnShopCancel ? (
								<button className={styles.btn__add} onClick={() => addShop()}>
									<i className="fas fa-cart-plus"></i>
								</button>
							) : (
								<button
									className={styles.btn__remove}
									onClick={() => removeShop()}>
									<i className="fas fa-ban"></i>
								</button>
							)}
						</p>
					</>
				) : (
					''
				)}
			</div>
			<p className={styles.price}>S/. {price}</p>
		</div>
	);
};

export default ProductoCard;
