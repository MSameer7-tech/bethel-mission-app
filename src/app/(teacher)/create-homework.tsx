import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Paperclip, CheckCircle } from 'lucide-react-native';

export default function CreateHomeworkScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handlePublish = () => {
    alert('Mock homework published successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Class</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectText}>VII-C</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectText}>Mathematics</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., Ex 4.1 Quadratic Equations"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Enter homework instructions..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={desc}
            onChangeText={setDesc}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity style={styles.datePicker}>
            <Calendar color="#64748B" size={20} />
            <Text style={styles.dateText}>12 Oct 2026</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.attachBtn}>
          <Paperclip color="#0284C7" size={20} />
          <Text style={styles.attachText}>Add Attachment</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <CheckCircle color="#FFFFFF" size={20} />
          <Text style={styles.publishBtnText}>Publish Homework</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8 },
  selectBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  selectText: { fontSize: 16, color: '#0F172A', fontWeight: '500' },
  input: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', fontSize: 16, color: '#0F172A' },
  textArea: { height: 120 },
  datePicker: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 12 },
  dateText: { fontSize: 16, color: '#0F172A' },
  attachBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F9FF', padding: 16, borderRadius: 12, gap: 8, borderWidth: 1, borderColor: '#BAE6FD', borderStyle: 'dashed', marginBottom: 40 },
  attachText: { color: '#0284C7', fontWeight: '600', fontSize: 16 },
  footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  publishBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B3B60', paddingVertical: 16, borderRadius: 12, gap: 8 },
  publishBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
