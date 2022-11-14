import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const HOME = `home`
const CLOCK = `clock`
const ADDITION = `addition`
const BALANCE = `balance`
const GREY_COLOR = `grey`
const ORANGE_COLOR = `#FF9172`
const USER_ICON = <Icon style={{ top: 5}} name='user' size={20} />

const data = [{
  routes: HOME,
  icon: <MaterialIcons color={GREY_COLOR} name="edit" size={20} />
},
{
  routes: CLOCK,
  icon: <Icon color={GREY_COLOR} name="clockcircleo" size={20} />
}, {
  routes: ADDITION,
  icon: <Icon color={GREY_COLOR} name="pluscircle" size={20} />
}, {
  routes: BALANCE,
  icon: <FontAwesome color={GREY_COLOR} name="balance-scale" size={20} />
}]

export {
  HOME,
  CLOCK,
  ADDITION,
  BALANCE,
  GREY_COLOR,
  ORANGE_COLOR,
  data,
  HEIGHT,
  WIDTH,
  USER_ICON
}
