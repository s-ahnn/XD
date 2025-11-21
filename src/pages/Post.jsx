import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../components/Nav";

export default function Post({ navigation }) {
    const [category, setCategory] = useState(""); // 선택된 카테고리
    const [title, setTitle] = useState(""); // 입력된 제목
    const [content, setContent] = useState(""); // 입력된 본문

    const handlePost = () => {
        if (!category || !title || !content) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        console.log({ category, title, content });
        alert("게시글이 작성되었습니다.");
        navigation.goBack(); // 이전 화면으로 이동
    };

    const handleCancel = () => {
        navigation.goBack(); // 이전 화면으로 이동
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>글 작성</Text>
            </View>
            <View style={styles.form}>
                {/* 카테고리 선택 */}
                <View style={styles.inputGroup}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="카테고리를 선택해주세요" value="" />
                            <Picker.Item label="음식" value="음식" />
                            <Picker.Item label="빨래" value="빨래" />
                            <Picker.Item label="청소" value="청소" />
                            <Picker.Item label="금융" value="금융" />
                        </Picker>
                    </View>
                </View>

                {/* 제목 입력 */}
                <TextInput
                    style={styles.input}
                    placeholder="제목을 입력해주세요"
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* 본문 입력 */}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="본문을 입력해주세요"
                    placeholderTextColor="#999"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                {/* 버튼 */}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                        <Text style={styles.postButtonText}>게시</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Nav style={styles.nav} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    form: {
        flex: 1,
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 5,
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    picker: {
        height: 60,
        backgroundColor: "#fff",
    },
    input: {
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    textArea: {
        height: 380,
        textAlignVertical: "top",
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    postButton: {
        flex: 1,
        backgroundColor: "#2196F3",
        paddingVertical: 15,
        borderRadius: 5,
        marginRight: 10,
        alignItems: "center",
    },
    postButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#E0E0E0",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#666",
        fontWeight: "bold",
    },
    nav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});