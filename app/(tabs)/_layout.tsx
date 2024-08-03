import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        tabBarStyle: {
          backgroundColor: '#121212', // Dark mode background color for the tab bar
        },
        tabBarInactiveTintColor: '#888', // Lighter color for inactive tabs
        headerShown: false, // Ensure the header is hidden for all tabs
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Songs',
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
          // Explicitly hide the header for this screen
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Candy Quiz', // Different title
          tabBarIcon: ({ color }) => <TabBarIcon name="birthday-cake" color={color} />, // Different icon
          // Explicitly hide the header for this screen
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Posters',
          tabBarIcon: ({ color }) => <TabBarIcon name="image" color={color} />,
          // Explicitly hide the header for this screen
          headerShown: false,
        }}
        
      />

    


      
    </Tabs>
    
  );
}
