import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Home, BookOpen, MessageSquare, Bell, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_CONFIG = [
  { name: 'index', label: 'Home', icon: Home },
  { name: 'academics', label: 'Academics', icon: BookOpen },
  { name: 'messages', label: 'Messages', icon: MessageSquare },
  { name: 'notifications', label: 'Notices', icon: Bell },
  { name: 'profile', label: 'Profile', icon: User },
];

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.tabBarInner}>
        {TAB_CONFIG.map((tab, index) => {
          const focused = state.index === index;
          const IconComponent = tab.icon;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: state.routes[index].key,
                  canPreventDefault: true,
                });
                if (!event.defaultPrevented) {
                  navigation.navigate(state.routes[index].name);
                }
              }}
            >
              <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
                <IconComponent
                  color={focused ? '#0B3B60' : '#94A3B8'}
                  size={22}
                  strokeWidth={focused ? 2.5 : 1.8}
                />
              </View>
              <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="academics" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  tabBarInner: {
    flexDirection: 'row',
    height: 68,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 68,
  },
  iconWrapper: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 3,
  },
  iconWrapperFocused: {
    backgroundColor: '#E0F2FE',
  },
  tabLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  tabLabelFocused: {
    color: '#0B3B60',
    fontWeight: '800',
  },
});
