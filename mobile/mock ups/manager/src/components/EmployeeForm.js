import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

class EmployeeForm extends Component {

  onNameChange(text) {
    this.props.employeeUpdate({ prop: 'name', value: text });
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane Doe"
            value={this.props.name}
            onChangeText={this.onNameChange.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="###-###-###"
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle} >
            Shift
          </Text>
          <Picker
            // removed for android.. alternative= flex=2 & set flexDirection=row
            // style={{ flex: 1 }}
            selectedValue={this.props.shift}
            onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
          >
            <Picker.item label="Monday" value="Monday" />
            <Picker.item label="Tuesday" value="Tuesday" />
            <Picker.item label="Wednesday" value="Wednesday" />
            <Picker.item label="Thursday" value="Thursday" />
            <Picker.item label="Friday" value="Friday" />
            <Picker.item label="Saturday" value="Saturday" />
            <Picker.item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
