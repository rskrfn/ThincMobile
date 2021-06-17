import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Button, Input, Icon, Item, Picker} from 'native-base';
import classes from './Styles';
import MyClassFacilitator from './MyClassFacilitator';
import MemberIcon from '../../../assets/icons/icon_student.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Facilitator = props => {
  const myClassDummy = [
    {
      classname: 'Class one',
      student: 24,
    },
    {
      classname: 'Class two',
      student: 32,
    },
    {
      classname: 'Class three',
      student: 28,
    },
    {
      classname: 'Class one',
      student: 24,
    },
    {
      classname: 'Class two',
      student: 32,
    },
    {
      classname: 'Class three',
      student: 28,
    },
  ];
  return (
    <ScrollView>
      <View style={classes.container}>
        <Text style={classes.textpage}>My class</Text>
        <View style={classes.header}>
          <Text style={classes.headmyclass}>Class Name</Text>
          <Text style={classes.headstudent}>Students</Text>
        </View>
      </View>
      <View style={classes.myclasscontainer}>
        {myClassDummy
          ? myClassDummy.slice(0, 3).map((item, index) => {
              console.log(item);
              return (
                <TouchableOpacity style={classes.myclass} key={index}>
                  <Text style={classes.tableclassname}>{item.classname}</Text>
                  <View style={classes.tablestudent}>
                    <Text style={classes.studenttext}>{item.student}</Text>
                    <Image style={classes.studenticon} source={MemberIcon} />
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    color="black"
                    size={32}
                    style={classes.arrowicon}
                  />
                </TouchableOpacity>
              );
            })
          : null}
      </View>
      <View style={classes.allmyclass}>
        <Text
          style={classes.textallmyclass}
          onPress={() => props.navigation.navigate('MyClass')}>
          view all
        </Text>
        <MaterialIcons
          name="chevron-right"
          size={20}
          style={{marginTop: 1}}
          onPress={() => props.navigation.navigate('MyClass')}
        />
      </View>
      <View style={classes.createnewclass}>
        <Text style={classes.newclassheader}>Create new class</Text>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Class Name</Text>
            <Text>:</Text>
            <TextInput
              style={classes.inputbox}
              placeholder="Enter class name"
            />
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Categories</Text>
            <Text>:</Text>
            <Item picker style={classes.categorypicker}>
              <Picker mode="dialog" style={{marginLeft: -15}}>
                <Picker.Item
                  label="Category"
                  value=""
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Software"
                  value="software"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="History"
                  value="History"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Psychology"
                  value="Psychology"
                  style={classes.pickeritem}
                />
                <Picker.Item
                  label="Finance"
                  value="Finance"
                  style={classes.pickeritem}
                />
              </Picker>
            </Item>
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Pricing</Text>
            <Text>:</Text>
            <Text style={{position: 'absolute', left: '32%'}}>$</Text>
            <TextInput
              style={{...classes.inputbox, paddingLeft: '5%'}}
              placeholder="Enter course price"
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={{...classes.input, marginVertical: 10}}>
            <Text style={classes.inputdesc}>Schedule</Text>
            <Text>:</Text>
          </View>
        </View>
        <View style={classes.inputgroup}>
          <View style={classes.input}>
            <Text style={classes.inputdesc}>Description</Text>
            <Text>:</Text>
          </View>
        </View>
        <TextInput
          style={classes.inputboxarea}
          multiline={true}
          numberOfLines={5}
          placeholder="Course description"
        />
        <TouchableOpacity style={classes.createbtn}>
          <Text style={classes.createbtntext}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Facilitator;
