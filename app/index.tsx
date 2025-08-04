import PostsList from "@/components/PostsList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Products } from "@/types/types";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppContent: React.FC = () => {
  const { setProducts } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(false); 

  const fetchProducts = async () => {
    setLoading(true); 
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data: { products: Products[] } = await response.json();
      setProducts(data.products.slice(0, 4)); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const handleReload = () => {
    fetchProducts(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Reloading data...</Text>
        </View>
      ) : (
        <>
          <PostsList />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.customButton} onPress={handleReload}>
              <Text style={styles.buttonText}>Reload Data</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider> 
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
