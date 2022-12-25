import React, {useEffect, useState} from 'react';
import CallLogs from 'react-native-call-log';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
} from 'react-native';

const App = () => {
  const [listData, setListData] = useState();

  const fetchData = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(CallLogs);
        CallLogs.load(5).then(c => console.log(c));
        CallLogs.loadAll().then(c => setListData(c));
      } else {
        console.log('Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ItemView = ({item}) => {
    return (
      <View>
        <Text style={styles.textStyle}>
          Name : {item.name}
          {'\n'}
          Datetime : {item.dateTime}
          {'\n'}
          Duration : {item.duration}
          {'\n'}
          PhoneNumber : {item.phoneNumber}
          {'\n'}
          Rawtype : {item.rawType}
          {'\n'}
          Timestamp : {item.timestamp}
          {'\n'}
          Type : {item.type}
        </Text>
      </View>
    );
  };

  const ItemSeperatoView = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Arama Kayıtları</Text>
        <FlatList
          data={listData}
          renderItem={ItemView}
          ItemSeparatorComponent={ItemSeperatoView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  textStyle: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
  },
});
