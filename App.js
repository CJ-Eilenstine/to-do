import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingText(name);
  };

  const saveEdit = (id) => {
    setList(list.map((g) => (g.id === id ? { ...g, name: editingText } : g)));
    setEditingId(null);
    setEditingText("");
  };

  const addItem = () => {
    if (item.trim().length === 0) return;
    setList([...list, { id: Date.now().toString(), name: item }]);
    setItem("");
    // console.log(list);
  };

  const removeItem = (id) => {
    setList(list.filter((g) => g.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add Task"
          style={styles.input}
          value={item}
          onChangeText={setItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      <FlatList
        data={list}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemRow}>
              {editingId === item.id ? (
                <TextInput
                  style={styles.input}
                  value={editingText}
                  onChangeText={setEditingText}
                  onSubmitEditing={() => saveEdit(item.id)}
                  autoFocus
                />
              ) : (
                <Text style={styles.item}>{item.name}</Text>
              )}
              <View style={{ flexDirection: "row" }}>
                {editingId === item.id ? (
                  <Pressable onPress={() => saveEdit(item.id)}>
                    <Feather
                      name="save"
                      size={22}
                      color="blue"
                      style={styles.save}
                    />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => startEditing(item.id, item.name)}>
                    <Feather
                      name="edit"
                      size={22}
                      color={"green"}
                      style={styles.edit}
                    />
                  </Pressable>
                )}
                <Pressable onPress={() => removeItem(item.id)}>
                  <Feather
                    name="delete"
                    size={22}
                    color={"red"}
                    style={styles.deleteButton}
                  />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",

    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "Bold",
    marginBottom: 15,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 20,
  },
  itemText: {
    fontSize: 15,
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
  edit: {
    marginRight: 20,
    fontSize: 18,
    color: "blue",
  },
  save: {
    marginRight: 20,
    fontSize: 18,
    color: "green",
  },
});
