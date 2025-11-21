import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker"; // Picker를 올바른 패키지에서 가져오기

export default function Detail({ navigation, route }) {
    const [comment, setComment] = useState(""); // 댓글 입력 상태
    const [visibility, setVisibility] = useState("public"); // 댓글 공개 여부 상태
    const [comments, setComments] = useState([
        { id: 1, author: "나 님은 개찐", text: "정말 유익한 글이에요!!", date: "2025.11.15", visibility: "public" },
        { id: 2, author: "나 님은 개찐", text: "비공개 댓글입니다.", date: "2025.11.15", visibility: "private" },
        { id: 3, author: "나 님은 개찐", text: "정말 유익한 글이에요!!", date: "2025.11.15", visibility: "public" },
    ]); // 댓글 리스트 상태

    const handlePostComment = () => {
        if (comment.trim()) {
            const newComment = {
                id: comments.length + 1,
                author: "나 님은 개찐",
                text: comment,
                date: new Date().toISOString().split("T")[0], // 현재 날짜
                visibility: visibility, // 공개 여부
            };
            setComments([newComment, ...comments]); // 새로운 댓글 추가
            setComment(""); // 입력 필드 초기화
        }
    };

    const renderComment = ({ item }) => {
        if (item.visibility === "private" && item.author !== "나 님은 개찐") {
            // 비공개 댓글은 작성자만 볼 수 있음
            return null;
        }
        return (
            <View style={styles.commentItem}>
                <Text style={styles.commentAuthor}>
                    {item.author} {item.visibility === "private" && <Text style={styles.lockIcon}>🔒</Text>}
                </Text>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
            </View>
        );
    };

    const { post } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>글</Text>
            </View>

            {/* 글 상세보기 */}
            <View style={styles.postContainer}>
                <Text style={styles.category}>[ {post.category} ]</Text>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.content}>{post.content}</Text>
                <Text style={styles.date}>{post.date}</Text>
            </View>

            {/* 댓글 입력 */}
            <View style={styles.commentInputContainer}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={visibility}
                        style={styles.visibilityPicker}
                        onValueChange={(itemValue) => setVisibility(itemValue)}
                    >
                        <Picker.Item label="공개" value="public" />
                        <Picker.Item label="비공개" value="private" />
                    </Picker>
                </View>
                <TextInput
                    style={styles.commentInput}
                    placeholder="댓글을 써주세요!"
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity style={styles.postButton} onPress={handlePostComment}>
                    <Text style={styles.postButtonText}>게시</Text>
                </TouchableOpacity>
            </View>

            {/* 댓글 리스트 */}
            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}
                style={styles.commentList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    backButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    backButtonText: {
        fontSize: 18,
        color: "#2196F3",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    postContainer: {
        padding: 20,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    category: {
        color: "#2196F3",
        fontWeight: "bold",
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    author: {
        color: "#999",
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    date: {
        color: "#999",
        fontSize: 12,
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 10,
    },
    visibilityPicker: {
        width: 120,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40,
    },
    postButton: {
        marginLeft: 10,
        backgroundColor: "#2196F3",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    postButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    commentList: {
        flex: 1,
        backgroundColor: "#fff",
    },
    commentItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    commentAuthor: {
        fontWeight: "bold",
        color: "#333",
    },
    lockIcon: {
        fontSize: 12,
        color: "#999",
    },
    commentText: {
        marginVertical: 5,
        color: "#666",
    },
    commentDate: {
        fontSize: 12,
        color: "#999",
    },
});