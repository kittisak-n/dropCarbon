import React, {useLayoutEffect} from 'react';
import {
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
    if (routeName !== 'Home' && routeName) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
    if (routeName !== 'Settings' && routeName) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#009387',
          ...styles.shadow,
        }}>
        <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
          }}>
          <Image
            source={require('./../../assets/icons/qr-code.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#009387',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootAppStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 5,
          left: 5,
          right: 5,
          height: 55,
          borderRadius: 8,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/home.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                Home
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/map.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                Map
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="ScanQr"
        component={SettingsStackScreen}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="Reward"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/history.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                History
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="Account"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/settings.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                Setting
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 55,
  },
  shadow: {
    shadowColor: '#00000050',
    shadowOffset: {
      width: 1,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.35,
    elevation: 5,
  },
  item: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootAppStack;
