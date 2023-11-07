import { SetStateAction, useState } from 'react';
import styles from './ProductoCard.module.scss';
interface Producto {
	id: number;
	url_img: string;
	name: string;
	descripcion: string;
	price: number;
	setLength: React.Dispatch<SetStateAction<boolean>>;
	productos: number[];
}

const ProductoCard = ({
	id,
	url_img,
	name,
	descripcion,
	price,
	setLength,
	productos,
}: Producto) => {
	const [check, setCheck] = useState(false);

	const handleProduct = () => {
		if (check) {
			setCheck(false);
			productos.pop();
		} else if (!check) {
			setCheck(true);
			productos.push(id);
		}

		setLength(productos.length !== 0);
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleProduct();
		}
	};

	return (
		<div
			onClick={() => handleProduct()}
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
			</div>
			<p className={styles.price}>S/. {price}</p>
		</div>
	);
};

export default ProductoCard;
