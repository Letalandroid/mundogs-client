import styles from './ProductoCard.module.scss';

interface Produto {
    url_img: string;
    name: string;
    descripcion: string;
    price: number;
}

const ProductoCard = ({ url_img, name, descripcion, price }: Produto) => {
	return (
		<div className={styles.card__container}>
			<img src={url_img} />
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