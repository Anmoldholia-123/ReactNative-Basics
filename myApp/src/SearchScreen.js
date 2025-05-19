import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(""); //login ke bhad user ka token save hota hai

  useEffect(() => { // first time screen open then this run
    const loadTokenAndHistory = async () => { //function hai token and history load krega
      try {
        const savedToken = await AsyncStorage.getItem("token");//asyncstorage se token nikal rhe hain
        if (savedToken) setToken(savedToken); // mil gya to state me save
        await fetchHistory(savedToken);// us token se search history save
      } catch (err) {
        console.error("Error loading token", err);
      }
    };

    loadTokenAndHistory();
  }, []);

  const fetchHistory = async (authToken) => {// backend se search history laega
    try {
      const res = await fetch("http://192.168.18.56:3000/search-history", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load search history");
    }
  };

  const handleSearch = async (term = keyword) => {
    if (!term.trim()) {
      Alert.alert("Error", "Please enter a search term");
      return;
    }
    Keyboard.dismiss();
    try {
      const response = await fetch(
        `http://192.168.18.56:3000/search-products?q=${encodeURIComponent(term)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProducts(data);
      setKeyword(term);//o search kr rhe hain wo save hota hai
      fetchHistory(token);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Search failed");
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
      await fetch(`http://192.168.18.56:3000/search-history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete history item");
    }
  };

  const renderHistoryItem = ({ item }) => ( // history ko item me dikhata hai
    <View style={styles.historyItemRow}>//line ek row container banata hai jisme keyword aur delete button honge.
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleSearch(item.keyword)}
      >
        <Text style={styles.historyText}>{item.keyword}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Delete",
            `Are you sure you want to delete "${item.keyword}" from history?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteHistoryItem(item.id),
              },
            ]
          )
        }
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search products..."
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => handleSearch()} // search press to search hojae
          returnKeyType="search"
          style={styles.input}
          clearButtonMode="while-editing"//typing ke dauraan clear ka icon aayega
        />
        <TouchableOpacity onPress={() => handleSearch()} style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={styles.resultsSection}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        {products.length === 0 ? (
          <Text style={styles.emptyText}>No products found</Text>
        ) : (
          <FlatList
            data={products}// us data ko pass krta hai jo dikhana hai name,price etc
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}// render item ka layout kese dikhega renderproduct item se decide hota hai
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>

      {/* Search History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>SEARCH HISTORY</Text>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No search history</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderHistoryItem}
            style={{ marginTop: 10 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchBox: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchBtn: {
    backgroundColor: "#ff5c5c",
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    shadowColor: "#007BFF",
    shadowOpacity: 0.7,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  searchBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultsSection: {
    flex: 1,
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  productName: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 6,
    color: "#222",
  },
  productDesc: {
    color: "#666",
    fontSize: 14,
    marginBottom: 10,
  },
  productPrice: {
    fontWeight: "600",
    fontSize: 16,
    color: "#007BFF",
  },
  historySection: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 90,
    marginBottom: 90,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  emptyText: {
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  historyItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  historyText: {
    fontSize: 16,
    color: "#007BFF",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  deleteBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SearchScreen;
