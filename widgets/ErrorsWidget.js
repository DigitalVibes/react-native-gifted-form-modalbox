import React from 'react';
import {
  View,
  Text,
} from 'react-native';
var createReactClass = require('create-react-class');


const WidgetMixin = require('../mixins/WidgetMixin.js');

module.exports = createReactClass({
  mixins: [WidgetMixin],

  render() {
    var errors = this.props.form.state.errors;
    if (errors.length > 0) {
      return (
        <View
          style={this.getStyle('errorContainer')}
        >
          <Text
            style={this.getStyle('errorText')}
          >
            {errors.join('\n')}
          </Text>
        </View>
      );
    }
    return null;
  },

  defaultStyles: {
    errorContainer: {
      padding: 10,
    },
    errorText: {
      color: '#ff0000',
    },
  },

});
