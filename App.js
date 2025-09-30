import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductsList } from "./src/screens/ProductList";
import { ProductDetails } from "./src/screens/ProductDetails";
import { Cart } from "./src/screens/Cart";
import { useState } from "react";
import { getProduct } from "./src/services/productsService";
import { Text } from "react-native";

const App = () => {
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();
	const [itensCarrinho, setItensCarrinho] = useState([]);

	const addItemToCart = id => {
		const product = getProduct(id);
		setItensCarrinho(prevItems => {
			const item = prevItems.find(item => item.id == id);
			if (!item) {
				return [
					...prevItems,
					{
						id,
						qty: 1,
						product,
					},
				];
			} else {
				return prevItems.map(item => {
					if (item.id == id) {
						item.qty++;
					}
					return item;
				});
			}
		});
	};

	const updateQuantity = (item, newQty) => {
		setItensCarrinho(prevItems =>
			prevItems.map(prevItem => (prevItem.id === item.id ? { ...prevItem, qty: newQty } : prevItem))
		);
	};

	const removeItem = item => {
		setItensCarrinho(prevItems => prevItems.filter(prevItem => prevItem.id !== item.id));
	};

	const getItemsCount = () => {
		return itensCarrinho.reduce((sum, item) => sum + item.qty, 0);
	};

	const getTotalPrice = () => {
		return itensCarrinho.reduce((sum, item) => {
			const price = item.product._j ? item.product._j.price : item.product.price;
			return sum + price * item.qty;
		}, 0);
	};

	// Stack Navigator para Produtos e Detalhes
	const ProductsStack = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="ProductsList"
					options={{
						headerShown: false,
					}}>
					{props => <ProductsList {...props} getItemsCount={getItemsCount} />}
				</Stack.Screen>
				<Stack.Screen
					name="ProductDetails"
					options={{
						headerShown: false,
					}}>
					{props => <ProductDetails {...props} addItemToCart={addItemToCart} />}
				</Stack.Screen>
			</Stack.Navigator>
		);
	};

	// Componente do carrinho para a aba
	const CartTab = () => {
		return (
			<Cart
				items={itensCarrinho}
				getTotalPrice={getTotalPrice}
				onUpdateQuantity={updateQuantity}
				onRemoveItem={removeItem}
			/>
		);
	};

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						height: 70,
						paddingBottom: 10,
						paddingTop: 10,
						backgroundColor: "white",
						borderTopWidth: 1,
						borderTopColor: "#e9ecef",
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: -2,
						},
						shadowOpacity: 0.1,
						shadowRadius: 4,
						elevation: 5,
					},
					tabBarActiveTintColor: "#3498db",
					tabBarInactiveTintColor: "#7f8c8d",
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "600",
					},
				}}>
				<Tab.Screen
					name="Products"
					component={ProductsStack}
					options={{
						tabBarLabel: "Produtos",
						tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🛍️</Text>,
					}}
				/>
				<Tab.Screen
					name="Cart"
					component={CartTab}
					options={{
						tabBarLabel: "Carrinho",
						tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🛒</Text>,
						tabBarBadge: getItemsCount() > 0 ? getItemsCount() : null,
						tabBarBadgeStyle: {
							backgroundColor: "#e74c3c",
							color: "white",
							fontSize: 12,
							fontWeight: "bold",
							minWidth: 20,
							height: 20,
							borderRadius: 10,
						},
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	headerTitle: {
		fontSize: 20,
	},
});

export default App;
