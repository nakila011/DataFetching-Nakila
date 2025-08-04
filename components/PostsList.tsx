import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { DataContext } from "../context/DataContext";
import { Products } from "../types/types";

export default function PostsList() {
  const { products } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>(products);

  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]); 

  if (!products) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

 
  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  const renderProducts = ({ item, index }: { item: Products; index: number }) => (
    <View style={styles.card}>
    
      {item.thumbnail && (
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
          resizeMode="contain"
        />
      )}

      <Text style={styles.title}>
        {index + 1}. {item.title}
      </Text>

      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.price}>Price: ${item.price}</Text>

      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.discount}>Discount: {item.discountPercentage}%</Text>
      <Text style={styles.rating}>Rating: {item.rating}⭐</Text>
      <Text style={styles.tags}>Tags: {item.tags}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products (Fetch API)</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

  
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginTop: 20, color: "red" },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    color: "#333",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
  },
  category: {
    marginTop: 5,
    fontSize: 12,
    color: "#444",
  },
  discount: {
    marginTop: 5,
    fontSize: 12,
    color: "green",
  },
  rating: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  tags: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
