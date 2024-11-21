import { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); 
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#202225"
        />
        <Ionicons name="search" size={20} color="#202225" style={styles.searchIcon} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="white" style={styles.loader} />
      ) : (
        <>
          {filteredProducts.length === 0 && searchQuery !== '' && (
            <Text style={styles.noResultsText}>No results found</Text>
          )}

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            contentContainerStyle={styles.productList}
            numColumns={2}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202225',
    padding: 10,
    marginTop: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#202225',
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#35383F',
    borderRadius: 5,
    padding: 10,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#f1f1f1',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 50,
  },
});