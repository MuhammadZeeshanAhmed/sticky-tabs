import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
// import Icon from 'react-native-vector-icons/AntDesign';
import {data, GREY_COLOR, HOME, ORANGE_COLOR, USER_ICON} from '../contant';
import {style} from '../style';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TabBarHeight = 48;
const HeaderHeight = 70;
const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

const TabScene = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Animated.FlatList
      scrollToOverflowEnabled={true}
      numColumns={numCols}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      ListHeaderComponent={() => <View style={{height: 10}} />}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        paddingHorizontal: 10,
        minHeight: windowHeight - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const CollapsibleTabView = () => {
  const [tabIndex, setIndex] = useState(0);
  const [routeName, setRouteName] = useState('tab1');

  const [routes] = useState([
    {key: 'tab1', title: ''},
    {key: 'tab2', title: ''},
    {key: 'tab3', title: ''},
    {key: 'tab4', title: ''},
  ]);
  const [tab1Data] = useState(Array(40).fill(0));
  const [tab2Data] = useState(Array(30).fill(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      console.log('curRoute', curRoute);
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View style={[style.container, {transform: [{translateY: y}]}]}>
        <Text style={{...styles.mealText, alignSelf: 'flex-end'}}>
          Meal Creator
        </Text>
        <TouchableOpacity>{USER_ICON}</TouchableOpacity>
      </Animated.View>
    );
  };

  const rednerTab1Item = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: 16,
          marginLeft: index % 2 === 0 ? 0 : 10,
          width: tab1ItemSize,
          height: tab1ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{index}</Text>
      </View>
    );
  };

  const rednerTab3Item = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 10,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{index}</Text>
      </View>
    );
  };
  const rednerTab4Item = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 10,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{index}</Text>
      </View>
    );
  };
  const rednerTab2Item = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 10,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{index}</Text>
      </View>
    );
  };

  // const renderItem = ({item}) => {
  //   const {routes, icon} = item;
  //   return (
  //     <View style={style.iconContainer}>
  //       <Pressable
  //         onPress={() => {
  //           // navigation.navigate(routes)
  //           setRouteName(routes);
  //         }}
  //         style={
  //           routes === routeName
  //             ? [style.box, {backgroundColor: ORANGE_COLOR}]
  //             : style.box
  //         }
  //       >
  //         {icon}
  //       </Pressable>
  //     </View>
  //   );
  // };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        numCols = 2;
        data = tab1Data;
        renderItem = rednerTab1Item;
        break;
      case 'tab2':
        numCols = 3;
        data = tab2Data;
        renderItem = rednerTab2Item;
        break;
      case 'tab3':
        numCols = 3;
        data = tab1Data;
        renderItem = rednerTab3Item;
        break;
      case 'tab4':
        numCols = 3;
        data = tab2Data;
        renderItem = rednerTab4Item;
        break;
      default:
        return null;
    }
    return (
      <TabScene
        numCols={numCols}
        data={data}
        renderItem={renderItem}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              console.log('hell');

              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
      />
    );
  };

  const ico = ['user', 'edit', 'lock', 'clock'];

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={{
          zIndex: 1,
          transform: [{translateY: y}],
          width: '100%',
          height: 75,
        }}
      >
        <TabBar
        pressColor={null}
        pressOpacity={null}
        bounces={null}
          renderIcon={({route, focused, color}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: route.key ===routeName ? ORANGE_COLOR : 'white',
                  ...style.box,
                  ...style.iconContainer,
                }}
              >
                {route.key === 'tab1' && (
                  <MaterialIcons color={route.key ===routeName ? 'white' : GREY_COLOR} name="edit" size={20} />
                )}
                {route.key === 'tab2' && (
                  <Icon color={route.key ===routeName ? 'white' : GREY_COLOR} name="clockcircleo" size={20} />
                )}
                {route.key === 'tab3' && (
                  <Icon color={route.key ===routeName ? 'white' : GREY_COLOR} name="pluscircle" size={20} />
                )}
                {route.key === 'tab4' && (
                  <FontAwesome
                    color={route.key ===routeName ? 'white' : GREY_COLOR}
                    name="balance-scale"
                    size={20}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          indicatorStyle={{backgroundColor: 'transparent'}}
          style={{backgroundColor: 'white',  elevation:0, }}
          {...props}
          onTabPress={({route, preventDefault}) => {
                  setRouteName(route.key);
                  console.log(route ,' thisis')
            if (isListGliding.current) {
              preventDefault();
            }
          }}
        />

        {/* <View style={{ ...style.flatlistContainer, }}>
          <FlatList
            onTabPress={({ route, preventDefault }) => {
              if (isListGliding.current) {
                preventDefault();
              }
            }}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            scrollEnabled
            horizontal
          />
        </View> */}
      </Animated.View>
    );
  };
  const icos = ['user', 'edit', 'lock', 'clock'];

  const renderTabView = () => {
    return (
      <TabView
      swipeEnabled={false}
        onIndexChange={index => setIndex(index)}
        navigationState={{index: tabIndex, routes, icos}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {fontSize: 16, color: '#222'},
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: '#FFCC80'},
  indicator: {backgroundColor: '#222'},
});

export default CollapsibleTabView;
