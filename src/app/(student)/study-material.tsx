import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Download, File, Image as ImageIcon, Video, ChevronRight, FileArchive } from 'lucide-react-native';

const materials = [
  { id: '1', subject: 'Science', title: 'Chapter 4: Heat - Revision Notes', type: 'pdf', size: '2.4 MB', date: '12 Oct 2026' },
  { id: 2, subject: 'Mathematics', title: 'Quadratic Equations Formula Sheet', type: 'doc', size: '1.1 MB', date: '10 Oct 2026' },
  { id: 3, subject: 'English', title: 'Grammar Rules - Tenses', type: 'image', size: '800 KB', date: '08 Oct 2026' },
  { id: 4, subject: 'Social Science', title: 'French Revolution Timeline', type: 'video', size: '15.6 MB', date: '05 Oct 2026' },
];

export default function StudyMaterialScreen() {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText color="#E11D48" size={24} />;
      case 'doc': return <File color="#2563EB" size={24} />;
      case 'image': return <ImageIcon color="#059669" size={24} />;
      case 'video': return <Video color="#7C3AED" size={24} />;
      default: return <FileArchive color="#64748B" size={24} />;
    }
  };

  const getBackgroundColorForType = (type: string) => {
    switch (type) {
      case 'pdf': return '#FFE4E6';
      case 'doc': return '#DBEAFE';
      case 'image': return '#D1FAE5';
      case 'video': return '#EDE9FE';
      default: return '#F1F5F9';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.filterScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Science', 'Mathematics', 'English', 'Social Science'].map((sub, index) => (
            <TouchableOpacity key={sub} style={[styles.filterChip, index === 0 && styles.filterActive]}>
              <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {materials.map(mat => (
        <TouchableOpacity key={mat.id} style={styles.materialCard} accessibilityRole="button" accessibilityLabel={`Download ${mat.title}`}>
          <View style={[styles.iconContainer, { backgroundColor: getBackgroundColorForType(mat.type) }]}>
            {getIconForType(mat.type)}
          </View>
          <View style={styles.materialContent}>
            <Text style={styles.materialSubject}>{mat.subject}</Text>
            <Text style={styles.materialTitle} numberOfLines={2}>{mat.title}</Text>
            <View style={styles.materialMeta}>
              <Text style={styles.metaText}>{mat.type.toUpperCase()}</Text>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>{mat.size}</Text>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>{mat.date}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.downloadButton} accessibilityRole="button" accessibilityLabel="Download">
            <Download color="#0B3B60" size={20} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
  },
  filterScroll: {
    marginBottom: 20,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: '#0B3B60',
    borderColor: '#0B3B60',
  },
  filterText: {
    color: '#64748B',
    fontWeight: '500',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  materialContent: {
    flex: 1,
    marginRight: 12,
  },
  materialSubject: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0284C7',
    marginBottom: 4,
  },
  materialTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 20,
  },
  materialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  downloadButton: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
});
