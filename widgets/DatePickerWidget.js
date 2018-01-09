var React = require('react');
var {
  View,
  Text,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
  PixelRatio
} = require('react-native')
var createReactClass = require('create-react-class');

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],
  
  getDefaultProps() {
    return {
      type: 'DatePickerWidget',
      value: new Date(),
      getDefaultDate: () => { return new Date(); }
    };
  },
  
  getInitialState() {
    return {
      value: new Date(),
    };
  },
  
  componentDidMount() {
    if (Platform.OS === 'android') {
      let date = this.props.form.props.value && this.props.form.props.value.split("/");
      let selectedDate = (date) ? new Date(`${date[1]}/${date[0]}/${date[2]}`) : new Date();
      DatePickerAndroid.open({
        date: selectedDate,
        maxDate: new Date(),
        mode: 'spinner',
      }).then((r)=>{
        if (r.action !== DatePickerAndroid.dismissedAction) {
            // Selected year, month (0-11), day
            this._onChange(new Date(`${r.month + 1}/${r.day}/${r.year}`));
            this.props.onClose(new Date(`${r.month + 1}/${r.day}/${r.year}`), this.props.navigator);
        } else {
          this.props.onClose(null, this.props.navigator);
        }
      }).catch((code,message)=>console.warn('Cannot open date picker', message)); 
    } else {
      this._onChange(this.props.getDefaultDate());
    }
  },
  
  render() {
    if(Platform.OS === 'ios') {
      return (
        <View style={this.getStyle('row')}>
          <DatePickerIOS
            style={this.getStyle('picker')}
  
            {...this.props}
            
            onDateChange={this._onChange}
            date={this.state.value}
          />
        </View>
      );
    } else {
      return (
        <View style={this.getStyle('row')}>
            <Text style={this.getStyle('picker')}> { 'Please Select the date from Date Picker' } </Text>
        </View>
      );
    }
  },
  
  defaultStyles: {
    row: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    picker: {
    },
  },
  
});
