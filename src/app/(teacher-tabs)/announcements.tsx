import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';

export default function TeacherAnnouncementsScreen() {
  return (
    <View style={styles.container}>
      <Bell color="#94A3B8" size={64} style={{ marginBottom: 16 }} />
      <Text style={styles.text}>School announcements will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 16, color: '#64748B' },
});
