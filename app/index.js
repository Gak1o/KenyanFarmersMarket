import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.userTypeButton}>
              <Text style={styles.userTypeText}>I'm a Buyer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>EN</Text>
            </TouchableOpacity>
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
          {/* Market Prices Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Market Prices</Text>
            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                <Text style={styles.priceItem}>Tomatoes</Text>
                <Text style={styles.priceValue}>KES 120/kg</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceItem}>Potatoes</Text>
                <Text style={styles.priceValue}>KES 80/kg</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceItem}>Maize</Text>
                <Text style={styles.priceValue}>KES 50/kg</Text>
              </View>
            </View>
          </View>

          {/* Featured Products */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
              <View style={styles.productCard}>
                <View style={styles.productImagePlaceholder}></View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>Fresh Tomatoes</Text>
                  <Text style={styles.productPrice}>KES 120/kg</Text>
                  <Text style={styles.productFarmer}>John Kamau</Text>
                </View>
              </View>
              <View style={styles.productCard}>
                <View style={styles.productImagePlaceholder}></View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>Green Maize</Text>
                  <Text style={styles.productPrice}>KES 50/kg</Text>
                  <Text style={styles.productFarmer}>Mary Wanjiku</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesGrid}>
              <TouchableOpacity style={styles.categoryCard}>
                <View style={styles.categoryIcon}></View>
                <Text style={styles.categoryName}>Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <View style={styles.categoryIcon}></View>
                <Text style={styles.categoryName}>Fruits</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <View style={styles.categoryIcon}></View>
                <Text style={styles.categoryName}>Cereals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <View style={styles.categoryIcon}></View>
                <Text style={styles.categoryName}>Dairy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userTypeButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
  },
  userTypeText: {
    fontSize: 14,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceCard: {
    backgroundColor: 'white',
    borderRadius: 8,
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
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productsScroll: {
    marginTop: 8,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 150,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImagePlaceholder: {
    height: 100,
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  productFarmer: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
});
