import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  TextBtn
} from '../Atoms';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image
} = ReactNative;
import update from 'react-addons-update';

/**
 * ItemList component
 */
export default class DetailMultiSelectList extends Component {

  /**
    * ItemList Component Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state = {
      value3Index: []
    }
  }  

  /**
   * Handles the event when a item is pressed
   * @param {str} value
   * @param {int} index
   * @return {void}
   */
  onPress(value, index) {
    
    if (this.state.value3Index.indexOf(index) === -1) {
      this.setState(
        update(this.state, {
          value3Index: {
            [this.state.value3Index.length]: {$set: index}
          }
        }), this.setPropsItem
      )
    } else {
      this.setState(
        update(this.state, {
          value3Index: {
            $splice: [[this.state.value3Index.indexOf(index), 1]]
          }
        }), this.setPropsItem
      )
    }    
  }

  setPropsItem(){
    /*
    let selectedStr = "";
    this.state.value3Index.map((i,index)=>{
      selectedStr += this.props.items[i].label +", ";
    })    
    this.props.handleChangeItem( selectedStr.slice(0, -2) );
    */
  }

  /**
   * Render Lists
   * @return {jsxresult} result in jsx format
   */
  render() {
    let {items, goDetail} = this.props;    

    return (
      <View style={styles.itemList}>
        
          {items.map((obj, i) => {            
            
            let radioStyle = null;
            let selectedIndex = this.state.value3Index.indexOf(i);
            let radioLabelStyle = [styles.radioLabel];
            let chkBtn = null;
            

            if( selectedIndex !== -1 ) {
              if( i==0 )
                radioStyle =[styles.radio, styles.bg, styles.radioFirst];
              else
                radioStyle = [styles.radio, styles.bg];
              
              radioLabelStyle = [styles.radioLabel, styles.bold];
              chkBtn = <Image source={require('../../assets/imgs/blueCheckMarkSmall.png')} style={{height: 30, width: 45, resizeMode: 'stretch'}} />;
            }else{
              if( i==0 )
                radioStyle =[styles.radio, styles.radioFirst];
              else
                radioStyle = [styles.radio];
              chkBtn = <Image source={require('../../assets/imgs/greyButtonSmall.png')} style={{height: 30, width: 45, resizeMode: 'stretch'}} />;
            }
            
            return (
              <View key={i} style={radioStyle}>
                <TouchableWithoutFeedback onPress={this.onPress.bind(this, obj, i)}>
                  <View key={i} style={styles.list}>
                    <View style={{flex:0.1, justifyContent:'center'}}>
                      {chkBtn}
                    </View>
                    <View style={{flex:0.65}}>
                      <Text style={radioLabelStyle}>{obj.label}</Text>
                    </View>
                    {
                      (goDetail && selectedIndex!==-1) &&
                        
                          <View style={{flex:0.25, alignItems: 'flex-end'}}>
                            <TextBtn
                              imgSrc={require('../../assets/imgs/BTN_Blue_130x30.png')}
                              style={{marginRight: 10}}
                              onPress={()=>this.props.handleGoDetail()}
                            >
                              Details
                            </TextBtn>
                          </View>
                        
                    }
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  itemList: {
    marginTop:20
  },
  list:{
    flexDirection: 'row',
    margin:0
  },
  radio: {    
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#EFEFEF',
    marginBottom: 5
  },
  radioFirst: {
  },
  bg:{
    backgroundColor:'#dededf'
  },
  radioLabel: {
    fontSize: 17, 
    color: 'black', 
    lineHeight: 25
  },
  bold: {
  }
});