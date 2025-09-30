import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList } from "./src/screens/ProductList";
import { ProductDetails } from "./src/screens/ProductDetails";
import { Cart } from "./src/screens/Cart";
import { CartIcon } from "./src/components/CartIcon";
import { useState } from "react";
import { getProduct } from "./src/services/productsService";

const App = () => {
	const Stack = createNativeStackNavigator();
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

	const getItemsCount = () => {
		return itensCarrinho.reduce((sum, item) => sum + item.qty, 0);
	};

	const getTotalPrice = () => {
		return itensCarrinho.reduce((sum, item) => sum + item.product.price * item.qty, 0);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Products"
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
				<Stack.Screen
					name="Cart"
					options={{
						headerShown: false,
					}}>
					{props => <Cart {...props} items={itensCarrinho} getTotalPrice={getTotalPrice} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	headerTitle: {
		fontSize: 20,
	},
});

export default App;
