'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var {
  AppRegistry,
  StyleSheet,
  StatusBarIOS,
  Text,
  View,
} = React;

function padZero(num) {
   return (num < 10 ? "0" + num : num);
}

function getHexTime() {
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return "#" + padZero(hours) + padZero(minutes) + padZero(seconds);
}

var HexClock = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      clock: getHexTime(),
    };
  },

  resetClock: function () {
    var time = getHexTime();
    this.setState({
      clock: time,
    }, () => {
      this.setTimeout(() => { this.resetClock() }, 1000)
    });
  },

  componentDidMount: function () {
    this.resetClock();
    StatusBarIOS.setStyle(StatusBarIOS.Style['lightContent']);
  },

  render: function () {
    var containerStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: this.state.clock,
    };
    console.log(this.state.clock);
    return (
      <View style={containerStyle}>
        <Text style={styles.text}>{this.state.clock}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: '#e5e5e5',
  }
});

AppRegistry.registerComponent('HexClock', () => HexClock);
