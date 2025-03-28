import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ route, navigation }) => {
  // Get user type and name from login screen or default to buyer
  const { userType = 'buyer', userName = 'User', cartCleared = false } = route.params || {};
  const [language, setLanguage] = useState('en');
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'Vegetables',
    image: null
  });

  // Clear cart if coming back from checkout
  useEffect(() => {
    if (cartCleared) {
      setCartItems([]);
    }
  }, [cartCleared]);

  // Request permission for image picker
  useEffect(() => {
    (async () => {
      if (userType === 'farmer') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images!');
        }
      }
    })();
  }, [userType]);

  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProduct({...newProduct, image: result.assets[0].uri});
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProduct({...newProduct, image: result.assets[0].uri});
    }
  };

  // Mock data for market prices
  const marketPrices = [
    { id: '1', item: 'Tomatoes', price: 'KES 120/kg', trend: 'up' },
    { id: '2', item: 'Potatoes', price: 'KES 80/kg', trend: 'down' },
    { id: '3', item: 'Maize', price: 'KES 50/kg', trend: 'stable' },
  ];

  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: 'KES 120/kg',
      farmer: 'John Kamau',
      location: 'Kiambu',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      description: 'Fresh, locally grown tomatoes. Perfect for salads and cooking.',
      quantity: '50 kg available'
    },
    {
      id: '2',
      name: 'Green Maize',
      price: 'KES 50/kg',
      farmer: 'Mary Wanjiku',
      location: 'Nakuru',
      category: 'Cereals',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Freshly harvested green maize. Sweet and tender.',
      quantity: '100 kg available'
    },
    {
      id: '3',
      name: 'Potatoes',
      price: 'KES 80/kg',
      farmer: 'Peter Mwangi',
      location: 'Nyeri',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'High-quality potatoes from the highlands of Nyeri.',
      quantity: '200 kg available'
    },
    {
      id: '4',
      name: 'Fresh Milk',
      price: 'KES 70/liter',
      farmer: 'Sarah Kamau',
      location: 'Kiambu',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      description: 'Fresh cow milk, delivered daily.',
      quantity: '50 liters available'
    },
    {
      id: '5',
      name: 'Bananas',
      price: 'KES 200/bunch',
      farmer: 'James Omondi',
      location: 'Kisumu',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      description: 'Sweet bananas, perfect for snacking.',
      quantity: '30 bunches available'
    }
  ]);

  // Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: '1', name: 'Vegetables' },
    { id: '2', name: 'Fruits' },
    { id: '3', name: 'Cereals' },
    { id: '4', name: 'Dairy' }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Add to cart function
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  // Add new product function for farmers
  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      Alert.alert('Error', 'Please fill all the required fields');
      return;
    }

    if (!newProduct.image) {
      Alert.alert('Error', 'Please add an image of your product');
      return;
    }

    const newProductObj = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      price: `KES ${newProduct.price}`,
      farmer: userName, // Use the logged-in user's name
      location: 'Your Location',
      category: newProduct.category,
      image: newProduct.image,
      description: 'Newly listed product',
      quantity: `${newProduct.quantity} available`
    };

    setProducts([...products, newProductObj]);
    setNewProduct({
      name: '',
      price: '',
      quantity: '',
      category: 'Vegetables',
      image: null
    });
    setShowAddProductModal(false);
    Alert.alert('Success', 'Product added successfully!');
  };

  // Navigate to cart screen
  const goToCart = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some products first.');
      return;
    }
    navigation.navigate('Cart', { cartItems });
  };

  const renderMarketPrice = ({ item }) => (
    <View style={styles.priceRow}>
      <Text style={styles.priceItem}>{item.item}</Text>
      <Text style={styles.priceValue}>{item.price}</Text>
    </View>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productFarmer}>{item.farmer}</Text>
        <Text style={styles.productLocation}>{item.location}</Text>
        {userType === 'buyer' && (
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryPill,
        selectedCategory === item.name && styles.selectedCategoryPill
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text 
        style={[
          styles.categoryPillText,
          selectedCategory === item.name && styles.selectedCategoryPillText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userTypeContainer}>
            <Text style={styles.welcomeText}>
              Welcome, {userName}
            </Text>
            <Text style={styles.userTypeText}>
              ({userType === 'buyer' ? 'Buyer' : 'Farmer'})
            </Text>
          </View>
          
          <View style={styles.rightHeaderButtons}>
            {userType === 'buyer' && (
              <TouchableOpacity 
                style={styles.cartButton}
                onPress={goToCart}
              >
                <Text style={styles.cartCount}>{cartItems.length}</Text>
                <Text style={styles.cartText}>Cart</Text>
              </TouchableOpacity>
            )}
            
            {userType === 'farmer' && (
              <TouchableOpacity 
                style={styles.addProductButton}
                onPress={() => setShowAddProductModal(true)}
              >
                <Text style={styles.addProductButtonText}>+ Add Product</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.languageButton}
              onPress={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            >
              <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'SW'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search products, farmers..."
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Banner Image */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>
              {userType === 'buyer' 
                ? 'Fresh Farm Produce' 
                : 'Sell Your Produce'}
            </Text>
            <Text style={styles.bannerSubtitle}>
              {userType === 'buyer' 
                ? 'Direct from local farmers' 
                : 'Connect with buyers directly'}
            </Text>
          </View>
        </View>

        {/* Market Prices Section - Show to both */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Market Prices</Text>
          <View style={styles.priceCard}>
            <FlatList
              data={marketPrices}
              renderItem={renderMarketPrice}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          />
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {userType === 'buyer' ? 'Available Products' : 'Your Listed Products'}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productGrid}
          />
        </View>
      </ScrollView>

      {/* Add Product Modal for Farmers */}
      <Modal
        visible={showAddProductModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Add New Product</Text>
              
              {/* Image Selection Section */}
              <View style={styles.imageSelectionContainer}>
                {newProduct.image ? (
                  <View style={styles.selectedImageContainer}>
                    <Image 
                      source={{ uri: newProduct.image }} 
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity 
                      style={styles.changeImageButton}
                      onPress={() => setNewProduct({...newProduct, image: null})}
                    >
                      <Text style={styles.changeImageText}>Change Image</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.imageButtonsContainer}>
                    <Text style={styles.imageSelectionTitle}>Add Product Image</Text>
                    <View style={styles.imageButtonsRow}>
                      <TouchableOpacity 
                        style={styles.imageButton}
                        onPress={pickImage}
                      >
                        <Text style={styles.imageButtonText}>Choose from Gallery</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.imageButton}
                        onPress={takePhoto}
                      >
                        <Text style={styles.imageButtonText}>Take Photo</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              
              <Text style={styles.inputLabel}>Product Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={newProduct.name}
                onChangeText={(text) => setNewProduct({...newProduct, name: text})}
              />
              
              <Text style={styles.inputLabel}>Price (KES)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter price"
                value={newProduct.price}
                onChangeText={(text) => setNewProduct({...newProduct, price: text})}
                keyboardType="numeric"
              />
              
              <Text style={styles.inputLabel}>Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter quantity (e.g., 50 kg)"
                value={newProduct.quantity}
                onChangeText={(text) => setNewProduct({...newProduct, quantity: text})}
              />
              
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categorySelector}>
                {categories.slice(1).map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categorySelectorItem,
                      newProduct.category === category.name && styles.selectedCategorySelectorItem
                    ]}
                    onPress={() => setNewProduct({...newProduct, category: category.name})}
                  >
                    <Text style={[
                      styles.categorySelectorText,
                      newProduct.category === category.name && styles.selectedCategorySelectorText
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => {
                    setNewProduct({
                      name: '',
                      price: '',
                      quantity: '',
                      category: 'Vegetables',
                      image: null
                    });
                    setShowAddProductModal(false);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={addNewProduct}
                >
                  <Text style={styles.addButtonText}>Add Product</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  userTypeText: {
    fontSize: 14,
    color: '#666',
  },
  rightHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartCount: {
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    marginRight: 5,
  },
  cartText: {
    fontSize: 14,
    color: '#333',
  },
  addProductButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 16,
  },
  addProductButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  languageButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  languageText: {
    fontSize: 14,
    color: '#333',
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    height: 180,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  priceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceItem: {
    fontSize: 16,
    color: '#333',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  categoriesScroll: {
    marginBottom: 10,
  },
  categoryPill: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryPill: {
    backgroundColor: '#4CAF50',
  },
  categoryPillText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryPillText: {
    color: 'white',
    fontWeight: '500',
  },
  productGrid: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginTop: 4,
  },
  productFarmer: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  productLocation: {
    fontSize: 12,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  // Image selection styles
  imageSelectionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageSelectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  imageButtonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  imageButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedImageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  selectedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  changeImageText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categorySelectorItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategorySelectorItem: {
    backgroundColor: '#4CAF50',
  },
  categorySelectorText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategorySelectorText: {
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
