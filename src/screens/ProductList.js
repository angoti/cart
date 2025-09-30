import { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import { Product } from "../components/Product.js";
import { getProducts } from "../services/productsService.js";
import { styles } from "../styles/styles.js";

export const ProductsList = ({ navigation }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const productsData = await getProducts();
				setProducts(productsData);
			} catch (error) {
				console.error("Erro ao carregar produtos:", error);
				setError("Erro ao carregar produtos. Tente novamente.");
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, []);

	const renderProduct = ({ item: product }) => {
		return (
			<Product
				{...product}
				onPress={() => {
					navigation.navigate("ProductDetails", {
						productId: product.id,
					});
				}}
			/>
		);
	};

	const renderHeader = () => (
		<View style={styles.productListHeader}>
			<Text style={styles.productListTitle}>🛍️ Nossa Loja</Text>
			<Text style={styles.productListSubtitle}>
				Descubra produtos incríveis com os melhores preços
			</Text>
		</View>
	);

	const renderEmptyList = () => (
		<View style={styles.emptyCartContainer}>
			<Text style={styles.emptyCartIcon}>📦</Text>
			<Text style={styles.emptyCartText}>
				Nenhum produto encontrado{"\n"}
				Tente novamente mais tarde
			</Text>
		</View>
	);

	if (loading) {
		return (
			<SafeAreaView style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#3498db" />
				<Text style={styles.loadingText}>Carregando produtos...</Text>
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={styles.productListContainer}>
				{renderHeader()}
				<View style={styles.emptyCartContainer}>
					<Text style={styles.emptyCartIcon}>⚠️</Text>
					<Text style={styles.emptyCartText}>{error}</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.productListContainer}>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" />

			{renderHeader()}
			<FlatList
				data={products}
				renderItem={renderProduct}
				keyExtractor={item => item.id.toString()}
				ListEmptyComponent={renderEmptyList}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 8,
					paddingBottom: 20,
					flexGrow: 1,
				}}
				initialNumToRender={6}
				maxToRenderPerBatch={8}
				windowSize={10}
			/>
		</SafeAreaView>
	);
};
