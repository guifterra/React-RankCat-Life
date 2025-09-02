import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface MenuProps {
  setShowTeste: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  searchQuery: string;
  inputActive: boolean;
  setInputActive: (value: boolean) => void;
}

export default function Menu({ setShowTeste, setSearchQuery, searchQuery, inputActive, setInputActive }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [searchText, setSearchText] = useState(searchQuery); 

  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.8)).current;

  const overlayOpacity = slideAnim.interpolate({
    inputRange: [-SCREEN_WIDTH * 0.8, 0],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setOverlayVisible(true));
  };

  const closeMenu = () => {
    setOverlayVisible(false);
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuOpen(false));
  };

  const openSearch = () => {
    setInputActive(true);
    setSearchText(searchQuery);
  };

  const closeSearch = () => {
    setInputActive(false);
    setShowTeste(false);
    setSearchText('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (inputActive && searchText.trim() !== '') {
      setSearchQuery(searchText);
      setShowTeste(true);
    } else if (inputActive && searchText.trim() === '') {
      setShowTeste(false);
    }
  }, [searchText]);

  return (
    <>
      {menuOpen && overlayVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
        <Text style={styles.menuItem}>Menu Item 1</Text>
        <Text style={styles.menuItem}>Menu Item 2</Text>
      </Animated.View>

      <View style={styles.container}>
        {inputActive ? (
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              placeholderTextColor="gray"
              autoFocus
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={closeSearch} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
              <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>

            <Image
              source={require('../../assets/Logo_RankCatLife_Retangulo-removebg-preview.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <TouchableOpacity onPress={openSearch} style={styles.menuButton}>
              <MaterialIcons name="search" size={28} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(19, 18, 24)',
    position: 'absolute',
    top: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },
  logo: { width: 130, height: 70 },
  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: 'rgb(30, 30, 40)',
    paddingTop: 120,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  menuItem: { color: 'white', fontSize: 18, marginVertical: 15 },
  overlay: { position: 'absolute', top: 0, left: SCREEN_WIDTH * 0.8, right: 0, bottom: 0, backgroundColor: 'black', zIndex: 998 },
  menuButton: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  menuButtonText: { color: 'white', fontSize: 24 },
  searchWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1, height: 50, backgroundColor: '#2c2c36', borderRadius: 8, paddingHorizontal: 15, color: 'white', fontSize: 18 },
  closeBtn: { marginLeft: 10, paddingHorizontal: 8, paddingVertical: 2 },
  closeBtnText: { color: 'white', fontSize: 20 },
});
