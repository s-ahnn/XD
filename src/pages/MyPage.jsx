import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../components/Nav";

export default function MyPage({navigation}) {
    const [selectedTab, setSelectedTab] = useState("posts"); // "comments" 또는 "posts" 탭 선택 상태
    const comments = [
        { id: 1, postId: 4, author: "나 님은 개찐", text: "정말 유익한 글이에요! 많은 도움이 됐습니다.", date: "2025.11.15" },
        { id: 2, postId: 5, author: "나 님은 개찐", text: "좋은 정보 감사합니다. 참고할게요!", date: "2025.11.14" },
        { id: 3, postId: 6, author: "나 님은 개찐", text: "곰팡이 제거에 대한 팁 정말 유용했어요!", date: "2025.11.13" },
        { id: 4, postId: 7, author: "나 님은 개찐", text: "로봇청소기 사용 후기 정말 궁금했는데 감사합니다!", date: "2025.11.12" },
        { id: 5, postId: 8, author: "나 님은 개찐", text: "적금 상품 비교 정말 유익했어요. 고맙습니다!", date: "2025.11.11" },
    ]; // 댓글 데이터
    const posts = [
        { id: 4, category: "빨래", title: "흰옷 누렇게 변했어요", author: "빨래초보", date: "2025.11.14", content: "흰옷이 누렇게 변했는데 어떻게 복구할 수 있을까요? 도움 부탁드립니다." },
        { id: 5, category: "빨래", title: "드럼세탁기 추천해주세요", author: "새집이사", date: "2025.11.13", content: "드럼세탁기를 구매하려고 하는데 추천 부탁드립니다. 사용 후기 공유해주세요!" },
        { id: 6, category: "청소", title: "곰팡이 제거 어떻게 하나요", author: "깔끔쟁이", date: "2025.11.14", content: "집안 곰팡이를 제거하는 방법을 알고 싶습니다. 효과적인 방법을 알려주세요." },
        { id: 7, category: "청소", title: "청소기 vs 로봇청소기", author: "청소러버", date: "2025.11.13", content: "청소기와 로봇청소기 중 어떤 것이 더 효율적인지 고민입니다. 의견 부탁드립니다." },
        { id: 8, category: "금융", title: "적금 상품 추천 부탁드려요", author: "재테크왕", date: "2025.11.14", content: "적금 상품을 알아보고 있는데 추천 부탁드립니다. 이율과 조건을 고려해주세요." },
    ]; // 작성글 데이터

    const renderComment = ({ item }) => {
        if (!item) return null;
        
        const post = posts.find((p) => p.id === item.postId);
        const postTitle = post?.title || "제목 없음";
    
        return (
            <TouchableOpacity style={styles.card} onPress={() => handleCommentPress(item)}>
                <Text style={styles.cardTitleBlue}>{`← ${postTitle}`}</Text>
                <Text style={styles.cardAuthor}>{item.author || ""}</Text>
                <Text style={styles.cardText}>{item.text || ""}</Text>
                <Text style={styles.cardDate}>{item.date || ""}</Text>
            </TouchableOpacity>
        );
    };
    
    const renderPost = ({ item }) => {
        if (!item) return null;
        
        return (
            <TouchableOpacity style={styles.card} onPress={() => handlePostPress(item)}>
                <View style={styles.cardHeader}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{item.category || ""}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{item.title || ""}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <Text style={styles.cardAuthor}>{item.author || ""}</Text>
                    <Text style={styles.cardDate}>{item.date || ""}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handlePostPress = (post) => {
        if (post) {
            navigation.navigate('Detail', {post});
        }
    };

    const handleCommentPress = (comment) => {
        if (!comment) return;
        
        const post = posts.find((p) => p.id === comment.postId);
        if (post) {
            navigation.navigate('Detail', { post });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>마이 페이지</Text>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>로그아웃</Text>
                </TouchableOpacity>
            </View>

            {/* 프로필 정보 */}
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={{ uri: "https://via.placeholder.com/50" }} />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>나 님은 개찐</Text>
                    <View style={styles.profileStats}>
                        <Text style={styles.profileStat}>댓글 20</Text>
                        <Text style={styles.profileStat}>작성글 20</Text>
                    </View>
                </View>
            </View>

            {/* 탭 선택 */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "posts" && styles.activeTab]}
                    onPress={() => setSelectedTab("posts")}
                >
                    <Text style={[styles.tabText, selectedTab === "posts" && styles.activeTabText]}>작성글</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "comments" && styles.activeTab]}
                    onPress={() => setSelectedTab("comments")}
                >
                    <Text style={[styles.tabText, selectedTab === "comments" && styles.activeTabText]}>댓글</Text>
                </TouchableOpacity>
            </View>

            {/* 리스트 */}
            <FlatList
                data={selectedTab === "comments" ? comments : posts}
                renderItem={selectedTab === "comments" ? renderComment : renderPost}
                keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
                style={styles.list}
                ListEmptyComponent={
                    <View style={{padding: 20, alignItems: 'center'}}>
                        <Text>데이터가 없습니다</Text>
                    </View>
                }
            />

            <Nav />
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
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    logoutButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#E0E0E0",
    },
    profileInfo: {
        marginLeft: 15,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    profileStats: {
        flexDirection: "row",
        marginTop: 5,
    },
    profileStat: {
        marginRight: 15,
        fontSize: 14,
        color: "#666",
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#2196F3",
    },
    tabText: {
        fontSize: 16,
        color: "#666",
    },
    activeTabText: {
        color: "#2196F3",
        fontWeight: "bold",
    },
    list: {
        flex: 1,
        backgroundColor: "#fff",
    },
    card: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    categoryBadge: {
        backgroundColor: "#E3F2FD",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 10,
    },
    categoryBadgeText: {
        color: "#2196F3",
        fontSize: 12,
        fontWeight: "600",
    },
    cardTitle: {
        fontSize: 16,
        color: "#000",
        flex: 1,
    },
    cardTitleBlue: {
        fontSize: 16,
        color: "#2196F3",
        marginBottom: 5,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardAuthor: {
        fontSize: 14,
        color: "#666",
    },
    cardDate: {
        fontSize: 12,
        color: "#999",
    },
    cardText: {
        fontSize: 14,
        color: "#333",
        marginVertical: 5,
    },
});