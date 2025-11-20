import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Nav() {
    const navigation = useNavigation();
    const route = useRoute();
    const currentRoute = route.name;

    const handleTabChange = (tab) => {
        navigation.navigate(tab);
    };

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity 
                style={styles.navItem}
                onPress={() => handleTabChange('Home')}
            >
                <View style={[
                    styles.navIconHome,
                    currentRoute === 'Home' && styles.activeNavIcon
                ]}>
                    <Text style={styles.navIconText}>🏠</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.navItem}
                onPress={() => handleTabChange('Post')}
            >
                <View style={[
                    styles.navIconWrite,
                    currentRoute === 'Post' && styles.activeNavIcon
                ]}>
                    <Text style={styles.navIconText}>✍️</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.navItem}
                onPress={() => handleTabChange('MyPage')}
            >
                <View style={[
                    styles.navIconProfile,
                    currentRoute === 'MyPage' && styles.activeNavIcon
                ]}>
                    <Text style={styles.navIconText}>👤</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
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
