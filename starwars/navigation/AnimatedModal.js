import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from './styles';

export default function AnimatedModal({ visible, onClose, text }) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  // Starts off-screen (below the screen)

  useEffect(() => {
    if (visible) {
      // Slide in when visible becomes true
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out when visible becomes false
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.backdrop}>
        <Animated.View
          style={[
            styles.modalBox,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.modalText}>{text}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
