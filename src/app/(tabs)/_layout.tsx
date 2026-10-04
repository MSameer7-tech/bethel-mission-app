import React, { useCallback } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Home, BookOpen, MessageSquare, Bell, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

const TAB_CONFIG = [
  { name: 'index', label: 'Home', icon: Home },
  { name: 'academics', label: 'Academics', icon: BookOpen },
  { name: 'messages', label: 'Messages', icon: MessageSquare },
  { name: 'notifications', label: 'Notices', icon: Bell },
  { name: 'profile', label: 'Profile', icon: User },
];

const SPRING_CONFIG = { damping: 20, stiffness: 300, mass: 0.5 };

function AnimatedTabItem({ tab, focused, onPress, theme }: any) {
  const scale = useSharedValue(1);
  const IconComponent = tab.icon;
  const styles = getStyles(theme);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedPillStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focused ? 1 : 0, { duration: 150 }),
    transform: [{ scaleX: withSpring(focused ? 1 : 0.6, SPRING_CONFIG) }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, SPRING_CONFIG);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING_CONFIG);
  }, []);

  return (
    <Pressable
      style={styles.tabItem}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
        <Animated.View style={[styles.iconPill, animatedPillStyle]} />
        <IconComponent
          color={focused ? theme.colors.navActive : theme.colors.navInactive}
          size={22}
          strokeWidth={focused ? 2.5 : 2}
        />
      </Animated.View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {tab.label}
      </Text>
    </Pressable>
  );
}

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, 4) }]}>
      <View style={styles.tabBarInner}>
        {TAB_CONFIG.map((tab, index) => {
          const focused = state.index === index;
          return (
            <AnimatedTabItem
              key={tab.name}
              tab={tab}
              focused={focused}
              theme={theme}
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
            />
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
        lazy: true,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="academics" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  tabBarOuter: {
    backgroundColor: theme.colors.navBackground, 
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 4,
  },
  tabBarInner: {
    flexDirection: 'row',
    height: 56, 
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconWrapper: {
    width: 48,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconPill: {
    position: 'absolute',
    width: 48,
    height: 30,
    backgroundColor: theme.colors.navActiveBg, 
    borderRadius: 15,
  },
  tabLabel: {
    fontSize: 10,
    color: theme.colors.navInactive,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: theme.colors.navActive,
    fontWeight: '600',
  },
});
