var React = require('react');
var {
  View
} = require('react-native')
var createReactClass = require('create-react-class');

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],
  
  getDefaultProps() {
    return {
      type: 'SeparatorWidget',
    };
  },
  
  render() {
    return (
      <View
        style={this.getStyle('separator')}
        {...this.props}
      />
    );
  },
  
  defaultStyles: {
    separator: {
      height: 10,
    },
  },

});
