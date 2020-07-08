import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Linking,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon, Avatar} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
import {saveItem} from './redux/enqApp';

function openDialScreen(phoneno) {
  let number = '';
  if (Platform.OS === 'ios') {
    // number = 'telprompt:${' + phoneno + '}';
    number = 'telprompt:${1234567890}';
    Linking.canOpenURL(number)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'OOPS...!',
            'Sim card not in use. Insert sim and make a call to ' + phoneno,
          );
        } else {
          return Linking.openURL(number).catch(() => null);
        }
      })
      .catch(err => console.error('An error occurred', err));
  } else {
    number = 'tel:${' + phoneno + '}';
    Linking.openURL(number);
  }
}

function findAgo(posted) {
  var date = new Date();
  // console.log(posted);
  var arr = posted.split('/');
  if (date.getFullYear() - parseInt(arr[2]) > 0) {
    var y = date.getFullYear() - parseInt(arr[2]);
    return y + ' years ago';
  } else if (date.getMonth() - parseInt(arr[1]) > 0) {
    var m = date.getMonth() - parseInt(arr[1]);
    return m + ' months ago';
  } else if (date.getDate() - parseInt(arr[0]) > 0) {
    var y = date.getDate() - parseInt(arr[0]);
    return y + ' days ago';
  } else {
    var y = date.getHours();
    return y + ' hours ago';
  }
}

let colors = ['green', 'red', '#abcdef', 'blue'];

function HomeScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const saveitem = item => {
    var a = dispatch(saveItem(item));
    console.log(a);
  };

  useEffect(() => {
    fetch('http://www.mocky.io/v2/5c41920e0f0000543fe7b889')
      .then(response => response.json())
      .then(json => setData(json.dataList))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                marginTop: '5%',
                flexDirection: 'row',
                borderColor: '#eaeaea',
                //marginLeft: '2%',
              }}
              onPress={async () => {
                await saveitem(item);
                navigation.navigate('Details');
              }}>
              <View
                style={{
                  marginLeft: '5%',
                }}>
                <Avatar
                  overlayContainerStyle={{
                    backgroundColor:
                      colors[
                        item.name.toString().charCodeAt(0) % colors.length
                      ],
                  }}
                  titleStyle={{color: '#fff'}}
                  rounded
                  title={item.name.toString().slice(0, 1)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: '2%',
                    marginBottom: '5%',
                    width: '55%',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 13}}>{item.categoryName}</Text>
                  <Text style={{fontSize: 14}}>{item.location}</Text>
                  <Text style={{fontSize: 13}}>{item.classLocPref}</Text>
                </View>
                <View style={{flexDirection: 'column', marginLeft: '10%'}}>
                  <Text style={{fontSize: 10}}>
                    {findAgo(item.postedOn)}
                    {'\n'}
                  </Text>
                  <Icon
                    name="mobile"
                    type="entypo"
                    color={
                      colors[item.name.toString().charCodeAt(0) % colors.length]
                    }
                    onPress={() => openDialScreen(item.phoneNumber)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={ListEmpty()}
        />
      )}
    </View>
  );
}
function ListEmpty() {
  return (
    //View to show when list is empty
    <View style={{marginTop: '5%', flexDirection: 'row'}}>
      <Text style={{textAlign: 'center'}}>No Data Found</Text>
    </View>
  );
}
function DetailsScreen({navigation}) {
  const item = useSelector(state => state[0].item);
  console.log(item);
  console.log('0000000000');
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          marginTop: '5%',
          flexDirection: 'row',
          borderColor: '#eaeaea',
          marginLeft: '2%',
        }}>
        <Avatar
          overlayContainerStyle={{
            backgroundColor:
              colors[item.name.toString().charCodeAt(0) % colors.length],
          }}
          titleStyle={{color: '#fff'}}
          rounded
          title={item.name.toString().slice(0, 1)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // marginLeft: '1%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: '2%',
              marginBottom: '5%',
              width: '55%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
            <Text style={{fontSize: 13}}>{item.categoryName}</Text>
            <Text style={{fontSize: 14}}>{item.location}</Text>
            <Text style={{fontSize: 13}}>{item.classLocPref}</Text>
          </View>
          <View style={{flexDirection: 'column', marginLeft: '10%'}}>
            <Text style={{fontSize: 10}}>
              {findAgo(item.postedOn)}
              {'\n'}
            </Text>
            <Icon
              name="mobile"
              type="entypo"
              color={colors[item.name.toString().charCodeAt(0) % colors.length]}
              onPress={() => openDialScreen(item.phoneNumber)}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Enquiries">
        <Stack.Screen
          name="Enquiries"
          component={HomeScreen}
          options={{
            title: 'Enquiries',
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
