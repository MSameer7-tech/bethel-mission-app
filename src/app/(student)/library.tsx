import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Library, BookOpen, Clock, Info, CheckCircle, Search } from 'lucide-react-native';

const issuedBooks = [
  { id: 1, title: 'Fundamentals of Physics', author: 'Halliday & Resnick', issuedOn: '01 Oct 2026', dueOn: '15 Oct 2026', status: 'Issued' },
  { id: 2, title: 'The Story of My Life', author: 'Helen Keller', issuedOn: '15 Sep 2026', dueOn: '29 Sep 2026', status: 'Returned' },
];

export default function LibraryScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.headerIcon}>
          <Library color={theme.colors.surface} size={32} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>School Library</Text>
          <Text style={styles.headerSubtitle}>Explore, Learn, Grow</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.searchBar} accessibilityRole="search">
        <Search color={theme.colors.textMuted} size={20} style={styles.searchIcon} />
        <Text style={styles.searchText}>Search books by title or author...</Text>
      </TouchableOpacity>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Clock color={theme.colors.primary} size={24} style={styles.infoIcon} />
          <Text style={styles.infoTitle}>Timings</Text>
          <Text style={styles.infoValue}>08:00 AM - 03:00 PM</Text>
        </View>
        <View style={styles.infoCard}>
          <Info color={theme.colors.primary} size={24} style={styles.infoIcon} />
          <Text style={styles.infoTitle}>Max Books</Text>
          <Text style={styles.infoValue}>2 books per student</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Issued Books</Text>
      
      {issuedBooks.map(book => (
        <View key={book.id} style={styles.bookCard}>
          <View style={styles.bookIconContainer}>
            <BookOpen color={theme.colors.textSecondary} size={24} />
          </View>
          <View style={styles.bookContent}>
            <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
            
            <View style={styles.bookDates}>
              <View>
                <Text style={styles.dateLabel}>Issued On</Text>
                <Text style={styles.dateValue}>{book.issuedOn}</Text>
              </View>
              <View>
                <Text style={styles.dateLabel}>Due Date</Text>
                <Text style={[styles.dateValue, book.status === 'Issued' && { color: theme.colors.error }]}>{book.dueOn}</Text>
              </View>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, book.status === 'Returned' && styles.statusBadgeReturned]}>
              <Text style={[styles.statusText, book.status === 'Returned' && styles.statusTextReturned]}>{book.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: theme.radius.card,
    marginBottom: 20,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.surface,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: theme.radius.card,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchText: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoIcon: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  bookIconContainer: {
    width: 56,
    height: 72,
    backgroundColor: theme.colors.borderLight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  bookContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  bookDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  dateLabel: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  statusContainer: {
    marginLeft: 12,
  },
  statusBadge: {
    backgroundColor: theme.colors.warningBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeReturned: {
    backgroundColor: theme.colors.successBg,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.warning,
  },
  statusTextReturned: {
    color: theme.colors.success,
  },
});
