import { Text, Image, View, TouchableOpacity } from "react-native";
import { numberFormat } from "../services/numberFormat";
import { styles } from "../styles/styles";

export const Product = ({ name, price, image, onPress, isNew, discount }) => {
	return (
		<TouchableOpacity style={styles.productCard} onPress={onPress} activeOpacity={0.8}>
			{/* Badge para produtos novos ou com desconto */}
			{(isNew || discount) && (
				<View style={styles.productBadge}>
					<Text style={styles.productBadgeText}>{isNew ? "NOVO" : `${discount}% OFF`}</Text>
				</View>
			)}

			<Image style={styles.productImage} source={image} resizeMode="cover" />

			<View style={styles.productInfoContainer}>
				<Text style={styles.productName} numberOfLines={2}>
					{name}
				</Text>
				<Text style={styles.productPrice}>{numberFormat(price)}</Text>
				<TouchableOpacity style={styles.productButton} onPress={onPress} activeOpacity={0.8}>
					<Text style={styles.productButtonText}>👀 Ver Detalhes</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};
