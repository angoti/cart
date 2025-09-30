import { useEffect, useState } from "react";
import {
	Text,
	Image,
	View,
	ScrollView,
	TouchableOpacity,
	SafeAreaView,
	Alert,
} from "react-native";
import { getProduct } from "../services/productsService";
import { numberFormat } from "../services/numberFormat";
import { styles } from "../styles/styles";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const ProductDetails = ({ route, addItemToCart, navigation }) => {
	const { productId } = route.params;
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const loadProduct = async () => {
			try {
				setLoading(true);
				const productData = await getProduct(productId);
				setProduct(productData || {});
			} catch (error) {
				console.error("Erro ao carregar produto:", error);
			} finally {
				setLoading(false);
			}
		};

		loadProduct();
	}, [productId]);

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addItemToCart(product.id);
		}
		// Feedback visual ou navegação após adicionar
		Alert.alert(`Adicionado ${quantity} item(s) ao carrinho`);
	};

	const handleQuantityChange = change => {
		const newQuantity = quantity + change;
		if (newQuantity >= 1 && newQuantity <= 10) {
			setQuantity(newQuantity);
		}
	};

	const handleGoBack = () => {
		if (navigation && navigation.goBack) {
			navigation.goBack();
		}
	};

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const renderStars = (rating = 4.5) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<Text key={i} style={{ color: i <= rating ? "#f39c12" : "#bdc3c7", fontSize: 16 }}>
					★
				</Text>
			);
		}
		return stars;
	};

	const features = ["Entrega Rápida", "Garantia 1 Ano", "Qualidade Premium", "Suporte 24h"];

	if (loading) {
		return (
			<SafeAreaView style={styles.loadingContainer}>
				<Text style={styles.loadingText}>Carregando produto...</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.productDetailContainer}>

			{/* Header com imagem do produto */}
			<View style={styles.productDetailHeader}>
				<Image style={styles.productDetailImage} source={product.image} resizeMode="cover" />

				{/* Botão de voltar */}
				<TouchableOpacity
					style={styles.productDetailBackButton}
					onPress={handleGoBack}
					activeOpacity={0.8}>
					<Text style={styles.productDetailBackButtonText}>←</Text>
				</TouchableOpacity>

				{/* Botão de favorito */}
				<TouchableOpacity
					style={styles.productDetailFavoriteButton}
					onPress={toggleFavorite}
					activeOpacity={0.8}>
					<Text style={{ fontSize: 18, color: isFavorite ? "#e74c3c" : "#bdc3c7" }}>
						{isFavorite ? "♥" : "♡"}
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.productDetailContent} showsVerticalScrollIndicator={false}>
				{/* Badge de disponibilidade */}
				<View style={styles.productDetailAvailabilityBadge}>
					<Text style={styles.productDetailAvailabilityText}>✓ Em Estoque</Text>
				</View>

				{/* Título e preço */}
				<Text style={styles.productDetailTitle}>{product.name}</Text>
				<Text style={styles.productDetailPrice}>{numberFormat(product.price)}</Text>

				{/* Avaliação */}
				<View style={styles.productDetailRating}>
					<View style={styles.productDetailStars}>{renderStars(4.5)}</View>
					<Text style={styles.productDetailRatingText}>4.5 (128 avaliações)</Text>
				</View>

				{/* Características */}
				<View style={styles.productDetailSection}>
					<Text style={styles.productDetailSectionTitle}>Características</Text>
					<View style={styles.productDetailFeatures}>
						{features.map((feature, index) => (
							<View key={index} style={styles.productDetailFeature}>
								<Text style={styles.productDetailFeatureText}>{feature}</Text>
							</View>
						))}
					</View>
				</View>

				{/* Descrição */}
				<View style={styles.productDetailSection}>
					<Text style={styles.productDetailSectionTitle}>Descrição</Text>
					<Text style={styles.productDetailDescription}>
						{product.description ||
							"Este é um produto de alta qualidade, cuidadosamente selecionado para oferecer a melhor experiência aos nossos clientes. Com design moderno e funcionalidade excepcional, é perfeito para o seu dia a dia."}
					</Text>
				</View>

				{/* Controle de quantidade */}
				<View style={styles.productDetailQuantitySection}>
					<Text style={styles.productDetailQuantityLabel}>Quantidade</Text>
					<View style={styles.productDetailQuantityControls}>
						<TouchableOpacity
							onPress={() => handleQuantityChange(-1)}
							activeOpacity={0.7}
							disabled={quantity <= 1}>
							<MaterialIcons
								name="remove-circle"
								size={44}
								color={quantity <= 1 ? "#bdc3c7" : "#3498db"}
							/>
						</TouchableOpacity>

						<Text style={styles.productDetailQuantityText}>{quantity}</Text>

						<TouchableOpacity
							onPress={() => handleQuantityChange(1)}
							activeOpacity={0.7}
							disabled={quantity >= 10}>
							<MaterialIcons
								name="add-circle"
								size={44}
								color={quantity >= 10 ? "#bdc3c7" : "#3498db"}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ height: 100 }} />
			</ScrollView>

			{/* Footer fixo com botões */}
			<View style={styles.productDetailFooter}>
				<TouchableOpacity
					style={styles.productDetailAddToCartButton}
					onPress={handleAddToCart}
					activeOpacity={0.8}>
					<View
						style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
						<Feather name="shopping-cart" size={28} color="white" />
						<Text style={styles.productDetailAddToCartButtonText}>
							Adicionar ao Carrinho ({quantity})
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
