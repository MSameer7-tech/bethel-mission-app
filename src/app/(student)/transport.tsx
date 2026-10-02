import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Bus, MapPin, User, Phone, Clock } from 'lucide-react-native';
import { studentProfile } from '@/data/students';

export default function TransportScreen() {
  const { transport } = studentProfile;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.busCard}>
        <View style={styles.busHeader}>
          <View style={styles.iconContainer}>
            <Bus color="#0284C7" size={32} />
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
        <DetailRow icon={<MapPin size={20} color="#64748B" />} label="Route" value={transport.route} />
        <DetailRow icon={<Clock size={20} color="#64748B" />} label="Pickup Time" value={transport.pickupTime} />
        <DetailRow icon={<User size={20} color="#64748B" />} label="Driver" value={transport.driverName} />
        <DetailRow icon={<Phone size={20} color="#64748B" />} label="Contact" value={transport.driverContact} isLast />
      </View>

      <TouchableOpacity style={styles.callButton} onPress={() => alert('Mock Call Triggered')}>
        <Phone color="#FFFFFF" size={20} />
        <Text style={styles.callButtonText}>Call Driver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const DetailRow = ( { icon, label, value, isLast = false }: any ) => (
  <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
    <View style={styles.detailIcon}>{icon}</View>
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  busCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  busTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  busSubtitle: {
    fontSize: 14,
    color: '#64748B',
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
    backgroundColor: '#0284C7',
    marginRight: 12,
  },
  dotEnd: {
    backgroundColor: '#16A34A',
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#E2E8F0',
    marginLeft: 5,
    marginVertical: 4,
  },
  routeText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
