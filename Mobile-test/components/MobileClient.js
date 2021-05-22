import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

import {mobileEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      surname: PropTypes.string,
      name: PropTypes.string,
      midName: PropTypes.string,
      balance: PropTypes.number,
    })
  };

  state = {
    balance: this.props.balance,
    editMode: false,
  };

  nameFieldRef=null;
  surnameFieldRef = null;
  midNameFieldRef = null;
  balanceFieldRef = null;

  setNameRef = (ref) => {this.nameFieldRef=ref};
  setSurnameRef = (ref) => {this.surnameFieldRef=ref};
  setMidNameRef = (ref) => {this.midNameFieldRef=ref};
  setBalanceRef = (ref) => {this.balanceFieldRef=ref};

  componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.client.id+" componentWillReceiveProps");
  };

  deliteClient = (EO) => {
    mobileEvents.emit('EDelClient', this.props.client.id)
  }

  editClient = (EO) => {
    this.setState({editMode: true})
  }

  saveClient = (EO) => {
    mobileEvents.emit('ESaveEditedClient', {id: this.props.client.id,
      surname: this.nameFieldRef.value,
      name: this.surnameFieldRef.value,
      midName: this.midNameFieldRef.value,
      balance: +this.balanceFieldRef.value});
    this.setState({editMode: false});
  }

  render() {

    console.log("MobileClient id="+this.props.client.id+" render");
    if (this.props.client.surname && this.props.client.name) { //отображение или редактирование существующего клиента
      return (
        <tr className='MobileClient'>
          <td style={{width: '170px'}}>{this.state.editMode? <input type="text" defaultValue={this.props.client.surname} ref={this.setNameRef}/> : this.props.client.surname}</td>
          <td style={{width: '170px'}}>{this.state.editMode? <input type="text" defaultValue={this.props.client.name} ref={this.setSurnameRef}/> : this.props.client.name}</td>
          <td style={{width: '170px'}}>{this.state.editMode? <input type="text" defaultValue={this.props.client.midName} ref={this.setMidNameRef}/> : this.props.client.midName}</td>
          <td style={{width: '100px'}}>{this.state.editMode? <input type="number" defaultValue={this.props.client.balance} ref={this.setBalanceRef}/> : this.props.client.balance}</td>
          <td className={this.props.client.balance>0?"active":"blocked"}>{this.props.client.balance>0?"active":"block"}</td>
          <td><input type="button" value={this.state.editMode?"Сохранить":"Редактировать"} onClick={this.state.editMode?this.saveClient:this.editClient} /></td>
          <td><input type="button" value="Удалить" onClick={this.deliteClient} /></td>
        </tr>
      );
    }
    else { //для поля нового клиента
      return (
        <tr className='MobileClient'>
          <td style={{width: '170px'}}><input type="text" ref={this.setNameRef}/></td>
          <td style={{width: '170px'}}><input type="text" ref={this.setSurnameRef}/></td>
          <td style={{width: '170px'}}><input type="text" ref={this.setMidNameRef}/> </td>
          <td style={{width: '100px'}}><input type="number" ref={this.setBalanceRef}/> </td>
          <td/>
          <td><input type="button" value="Сохранить" onClick={this.saveClient} /></td>
          <td><input type="button" value="Отменить" onClick={this.deliteClient} /></td>
        </tr>
      )
    }

  }

}

export default MobileClient;
