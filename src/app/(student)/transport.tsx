import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Bus, MapPin, User, Phone, Clock } from 'lucide-react-native';
import { studentProfile } from '@/data/students';

export default function TransportScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { transport } = studentProfile;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.busCard}>
        <View style={styles.busHeader}>
          <View style={styles.iconContainer}>
            <Bus color={theme.colors.primary} size={32} />
          </View>
          <View>
            <Text style={styles.busTitle}>Bus {transport.busNumber}</Text>
            <Text style={styles.busSubtitle}>School Transport</Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routePoint}>
            <View style={styles.dot} />
            <Text style={styles.routeText}>{transport.pickupStop}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routePoint}>
            <View style={[styles.dot, styles.dotEnd]} />
            <Text style={styles.routeText}>Bethel Mission School</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Details</Text>
      
      <View style={styles.detailsCard}>
        <DetailRow styles={styles} icon={<MapPin size={20} color={theme.colors.textSecondary} />} label="Route" value={transport.route} />
        <DetailRow styles={styles} icon={<Clock size={20} color={theme.colors.textSecondary} />} label="Pickup Time" value={transport.pickupTime} />
        <DetailRow styles={styles} icon={<User size={20} color={theme.colors.textSecondary} />} label="Driver" value={transport.driverName} />
        <DetailRow styles={styles} icon={<Phone size={20} color={theme.colors.textSecondary} />} label="Contact" value={transport.driverContact} isLast />
      </View>

      <TouchableOpacity style={styles.callButton} onPress={() => alert('Mock Call Triggered')}>
        <Phone color={theme.colors.surface} size={20} />
        <Text style={styles.callButtonText}>Call Driver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const DetailRow = ( { icon, label, value, styles, isLast = false }: any ) => (
  <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
    <View style={styles.detailIcon}>{icon}</View>
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  busCard: {
    backgroundColor: theme.colors.surface,
    padding: 24,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 24,
    alignItems: 'center',
  },
  busHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.infoBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  busTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  busSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  routeContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  dotEnd: {
    backgroundColor: theme.colors.success,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginVertical: 4,
  },
  routeText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.card,
    gap: 8,
  },
  callButtonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
