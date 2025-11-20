import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    // ========== 상태 관리 ==========
    // 현재 선택된 카테고리 (기본값: '음식')
    const [selectedCategory, setSelectedCategory] = useState('음식');
    // 검색어
    const [searchText, setSearchText] = useState('');
    // 현재 페이지 번호
    const [currentPage, setCurrentPage] = useState(1);
    // 하단 네비게이션에서 선택된 탭 (기본값: 'board')
    const [selectedTab, setSelectedTab] = useState('home');

    // 카테고리 목록
    const categories = ['음식', '빨래', '청소', '금융'];
    
    // 전체 게시글 데이터 (실제로는 API에서 가져옴)
    const allPosts = [
        { id: 1, category: "음식", title: "넘들 넘들 그거 앎?", author: "나 남은 개쩜", date: "2025.11.14" },
        { id: 2, category: "음식", title: "오늘 저녁 뭐 먹을까요?", author: "배고픈사람", date: "2025.11.14" },
        { id: 3, category: "음식", title: "김치찌개 맛있게 끓이는 법", author: "요리고수", date: "2025.11.13" },
        { id: 4, category: "빨래", title: "흰옷 누렇게 변했어요", author: "빨래초보", date: "2025.11.14" },
        { id: 5, category: "빨래", title: "드럼세탁기 추천해주세요", author: "새집이사", date: "2025.11.13" },
        { id: 6, category: "청소", title: "곰팡이 제거 어떻게 하나요", author: "깔끔쟁이", date: "2025.11.14" },
        { id: 7, category: "청소", title: "청소기 vs 로봇청소기", author: "청소러버", date: "2025.11.13" },
        { id: 8, category: "금융", title: "적금 상품 추천 부탁드려요", author: "재테크왕", date: "2025.11.14" },
        { id: 9, category: "금융", title: "주식 처음 시작하는데 조언 구합니다", author: "주린이", date: "2025.11.13" },
        { id: 10, category: "음식", title: "집에서 파스타 만들기", author: "이탈리안요리사", date: "2025.11.12" },
        { id: 11, category: "음식", title: "밥솥으로 빵 만들 수 있나요?", author: "베이킹초보", date: "2025.11.12" },
        { id: 12, category: "빨래", title: "울코트 세탁 방법", author: "겨울준비", date: "2025.11.12" },
    ];

    // ========== 필터링 로직 ==========
    // 1. 카테고리로 필터링
    const categoryFiltered = allPosts.filter(post => post.category === selectedCategory);
    
    // 2. 검색어로 필터링
    const searchFiltered = searchText 
        ? categoryFiltered.filter(post => 
            post.title.toLowerCase().includes(searchText.toLowerCase()) ||
            post.author.toLowerCase().includes(searchText.toLowerCase())
          )
        : categoryFiltered;

    // 3. 페이지네이션 설정
    const postsPerPage = 9; // 페이지당 게시글 수
    const totalPages = Math.ceil(searchFiltered.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = searchFiltered.slice(startIndex, endIndex);

    // ========== 이벤트 핸들러 ==========
    // 카테고리 변경 핸들러
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // 카테고리 변경 시 1페이지로 초기화
    };

    // 검색어 변경 핸들러
    const handleSearchChange = (text) => {
        setSearchText(text);
        setCurrentPage(1); // 검색 시 1페이지로 초기화
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 게시글 클릭 핸들러
    const handlePostPress = (post) => {
        alert(`게시글 선택: ${post.title}`);
        // 실제로는 게시글 상세 페이지로 이동
    };

    // 네비게이션 탭 변경 핸들러
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        alert(`${tab} 탭으로 이동`);
        // 실제로는 해당 페이지로 네비게이션
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* ========== 헤더 ========== */}
            <View style={styles.header}>
                <Text style={styles.logo}>홈</Text>
                <View style={styles.searchBar}>
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="검색어를 입력하세요"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={handleSearchChange}
                    />
                    <Text style={styles.searchIcon}>🔍</Text>
                </View>
            </View>

            {/* ========== 카테고리 탭 ========== */}
            <View style={styles.categoryContainer}>
                {categories.map((category) => (
                    <TouchableOpacity 
                        key={category}
                        style={[
                            styles.categoryTab, 
                            selectedCategory === category && styles.activeTab
                        ]}
                        onPress={() => handleCategoryChange(category)}
                    >
                        <Text style={
                            selectedCategory === category 
                                ? styles.activeTabText 
                                : styles.tabText
                        }>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ========== 게시글 리스트 ========== */}
            <ScrollView style={styles.postList}>
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <TouchableOpacity 
                            key={post.id} 
                            style={styles.postItem}
                            onPress={() => handlePostPress(post)}
                        >
                            <View style={styles.postHeader}>
                                <View style={styles.categoryBadge}>
                                    <Text style={styles.categoryBadgeText}>{post.category}</Text>
                                </View>
                                <Text style={styles.postTitle}>{post.title}</Text>
                            </View>
                            <View style={styles.postFooter}>
                                <Text style={styles.postAuthor}>{post.author}</Text>
                                <Text style={styles.postDate}>{post.date}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
                    </View>
                )}
            </ScrollView>

            {/* ========== 페이지네이션 ========== */}
            {totalPages > 0 && (
                <View style={styles.pagination}>
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <TouchableOpacity 
                                key={pageNumber}
                                onPress={() => handlePageChange(pageNumber)}
                            >
                                <Text style={
                                    currentPage === pageNumber 
                                        ? styles.activePage 
                                        : styles.page
                                }>
                                    {pageNumber}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            {/* 하단 네비게이션 */}
            <View style={styles.bottomNav}>
                {/* 홈 버튼 */}
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => handleTabChange('home')}
                >
                    <View style={[
                        styles.navIconHome,
                        selectedTab === 'home' && styles.activeNavIcon
                    ]}>
                        <Text style={styles.navIconText}>🏠</Text> {/* 홈 아이콘 */}
                    </View>
                </TouchableOpacity>

                {/* 게시글 작성 버튼 */}
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => handleTabChange('write')}
                >
                    <View style={[
                        styles.navIconWrite,
                        selectedTab === 'write' && styles.activeNavIcon
                    ]}>
                        <Text style={styles.navIconText}>✍️</Text> {/* 게시글 작성 아이콘 */}
                    </View>
                </TouchableOpacity>

                {/* 마이페이지 버튼 */}
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => handleTabChange('profile')}
                >
                    <View style={[
                        styles.navIconProfile,
                        selectedTab === 'profile' && styles.activeNavIcon
                    ]}>
                        <Text style={styles.navIconText}>👤</Text> {/* 마이페이지 아이콘 */}
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // ========== 메인 컨테이너 ==========
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    // ========== 헤더 영역 ==========
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
    },
    searchIcon: {
        fontSize: 16,
        opacity: 0.5,
    },

    // ========== 카테고리 탭 영역 ==========
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        gap: 10,
    },
    categoryTab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    activeTab: {
        backgroundColor: '#E3F2FD',
        borderColor: '#2196F3',
    },
    tabText: {
        color: '#666',
        fontSize: 14,
    },
    activeTabText: {
        color: '#2196F3',
        fontSize: 14,
        fontWeight: '600',
    },

    // ========== 게시글 리스트 영역 ==========
    postList: {
        flex: 1,
        backgroundColor: '#fff',
    },
    postItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 10,
    },
    categoryBadgeText: {
        color: '#2196F3',
        fontSize: 12,
        fontWeight: '600',
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postAuthor: {
        fontSize: 13,
        color: '#999',
    },
    postDate: {
        fontSize: 13,
        color: '#999',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },

    // ========== 페이지네이션 영역 ==========
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#fff',
        gap: 15,
    },
    page: {
        fontSize: 16,
        color: '#999',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    activePage: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    // ========== 하단 네비게이션 ==========
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIconHome: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        backgroundColor: '#fff',
    },
    navIconWrite: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        backgroundColor: '#fff',
    },
    navIconProfile: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        backgroundColor: '#fff',
    },
    navIconText: {
        fontSize: 25,
        textAlign: 'center',
    },
    activeNavIcon: {
        backgroundColor: '#E3F2FD',
    },
});