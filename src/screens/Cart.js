import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { numberFormat } from "../services/numberFormat";
import { styles } from "./../styles/styles";

export const Cart = ({ items, onUpdateQuantity, onRemoveItem }) => {
	// Calcular total do carrinho
	const calculateTotal = () => {
		return items.reduce((total, item) => {
			const price = item.product._j ? item.product._j.price : item.product.price;
			return total + price * item.qty;
		}, 0);
	};

	// Calcular subtotal
	const calculateSubtotal = () => {
		return calculateTotal();
	};

	// Calcular taxa de entrega (simulada)
	const deliveryFee = items.length > 0 ? 9.99 : 0;

	const handleQuantityChange = (item, change) => {
		const newQty = item.qty + change;
		if (newQty <= 0) {
			if (onRemoveItem) {
				onRemoveItem(item);
			}
		} else {
			if (onUpdateQuantity) {
				onUpdateQuantity(item, newQty);
			}
		}
	};

	const renderProduct = ({ item }) => {
		const p = item.product._j || item.product;
		const qty = item.qty;

		return (
			<View style={styles.cartItemContainer}>
				<Image style={styles.cartItemImage} source={p.image} resizeMode="cover" />

				<View style={styles.cartItemDetails}>
					<Text style={styles.cartItemName} numberOfLines={2}>
						{p.name}
					</Text>
					<Text style={styles.cartItemPrice}>{numberFormat(p.price)}</Text>
					<Text style={styles.summaryLabel}>Subtotal: {numberFormat(p.price * qty)}</Text>
				</View>

				<View style={styles.quantityContainer}>
					<TouchableOpacity
						style={[styles.quantityButton, qty <= 1 && styles.quantityButtonDisabled]}
						onPress={() => handleQuantityChange(item, -1)}
						activeOpacity={0.7}>
						<Text style={styles.quantityButtonText}>-</Text>
					</TouchableOpacity>

					<Text style={styles.quantityText}>{qty}</Text>

					<TouchableOpacity
						style={styles.quantityButton}
						onPress={() => handleQuantityChange(item, 1)}
						activeOpacity={0.7}>
						<Text style={styles.quantityButtonText}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderEmptyCart = () => (
		<View style={styles.emptyCartContainer}>
			<Text style={styles.emptyCartIcon}>🛒</Text>
			<Text style={styles.emptyCartText}>
				Seu carrinho está vazio{"\n"}
				Adicione alguns produtos para começar!
			</Text>
		</View>
	);

	const renderCartSummary = () => (
		<View style={styles.cartSummary}>
			<View style={styles.summaryRow}>
				<Text style={styles.summaryLabel}>Subtotal</Text>
				<Text style={styles.summaryValue}>{numberFormat(calculateSubtotal())}</Text>
			</View>
			<View style={styles.summaryRow}>
				<Text style={styles.summaryLabel}>Taxa de entrega</Text>
				<Text style={styles.summaryValue}>
					{deliveryFee > 0 ? numberFormat(deliveryFee) : "Grátis"}
				</Text>
			</View>
			<View style={styles.totalRow}>
				<Text style={styles.totalLabel}>Total</Text>
				<Text style={styles.totalValue}>{numberFormat(calculateTotal() + deliveryFee)}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.cartContainer}>
			<View style={styles.cartHeader}>
				<Text style={styles.cartTitle}>
					🛒 Meu Carrinho ({items.length} {items.length === 1 ? "item" : "itens"})
				</Text>
			</View>

			{items.length === 0 ? (
				renderEmptyCart()
			) : (
				<>
					<FlatList
						data={items}
						renderItem={renderProduct}
						keyExtractor={(item, index) => `cart-item-${index}`}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
					/>

					{renderCartSummary()}

					<TouchableOpacity
						style={styles.checkoutButton}
						activeOpacity={0.8}
						onPress={() => {
							// Implementar checkout
							console.log("Finalizar compra");
						}}>
						<Text style={styles.checkoutButtonText}>
							💳 Finalizar Compra
						</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
};
