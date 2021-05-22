import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import {mobileEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        surname: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        midName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name, 
    activeCompany: 0, //0 - velcom, 1 - MTC
    clients: [this.props.clients.slice(), this.props.clients.slice()],//[клиенты velcom, клиенты мтс]
    showClientsState: 1, //1 - all, 2 - active, 3 - blocked
    newClientState: false,//поле с новым клентом
    lastId: this.props.clients[this.props.clients.length-1].id 
  };

  componentDidMount = () => {
    mobileEvents.addListener('EDelClient',this.deliteClient); 
    mobileEvents.addListener('ESaveEditedClient',this.saveEditedClient);
  };

  componentWillUnmount = () => {
    mobileEvents.removeListener('EDelClient',this.deliteClient);
    mobileEvents.removeListener('ESaveEditedClient',this.saveEditedClient);
  };

  setName1 = () => {
    this.setState({name:'МТС', activeCompany: 1});
  };

  setName2 = () => {
    this.setState({name:'Velcom', activeCompany: 0});
  };

  showClients(num)  {
    this.setState({showClientsState: num})
  }

  deliteClient = (id) => {
    if ( this.state.clients[this.state.activeCompany].findIndex(v=>v.id==id)==-1) { //для нового клиента "отменить"
      this.setState({newClientState: false, lastId: this.state.lastId-1});
      return
    }
    let currentClients = [...this.state.clients]; //для удаления клиента из списка
    currentClients[this.state.activeCompany] = currentClients[this.state.activeCompany].filter((v)=>v.id!=id);
    this.setState({clients: currentClients})
  }

  saveEditedClient = (editedClient) => {
    
    if (this.state.clients[this.state.activeCompany].findIndex(v=>v.id==editedClient.id)==-1) { //для нового клиента
      this.state.clients[this.state.activeCompany].push(editedClient);
      this.setState({newClientState: false});
      return
    }
    let currentClients = [...this.state.clients]; //редактирование клиентов из спписка
    for (let i=0; i< currentClients[this.state.activeCompany].length; i++) {
      if ( currentClients[this.state.activeCompany][i].id==editedClient.id) {
        currentClients[this.state.activeCompany][i]=editedClient;
        this.setState({clients: currentClients})
        break;
      }
    }
  }

  addNewClient = () => {
    this.setState({newClientState: true, lastId: this.state.lastId+1})
  }
  
  render() {

    console.log("MobileCompany render");

    let tableHeader = ['Фамилия', 'Имя', 'Отчество', 'Баланс', 'Статус', 'Редактировать', 'Удалить'];

    let currClients = this.state.clients[this.state.activeCompany];

    if (this.state.showClientsState==2) {
      currClients = currClients.filter((v)=>v.balance>0)
    }

    if (this.state.showClientsState==3) {
      currClients = currClients.filter((v)=>v.balance<=0)
    }

    var clientsCode=currClients.map( v =>
      <MobileClient key={v.id} client={v} />
    );

    return (
      <div className='MobileCompany'>
        <input type="button" value="МТС" onClick={this.setName1} />
        <input type="button" value="Velcom" onClick={this.setName2} />
        <div className='MobileCompanyName'>Компания: &laquo;{this.state.name}&raquo;</div>
        <div className='MobileControls'>
          <input type="button" className={this.state.showClientsState==1 ? "activeBtn" : null} value="Все" onClick={this.showClients.bind(this,1)} />
          <input type="button" className={this.state.showClientsState==2 ? "activeBtn" : null} value="Активные" onClick={this.showClients.bind(this,2)} />
          <input type="button" className={this.state.showClientsState==3 ? "activeBtn" : null} value="Заблокированные" onClick={this.showClients.bind(this,3)} />
        </div>
        <table>
          <thead>
            <tr>
              {tableHeader.map((v,i)=><th key={i}>{v}</th>)}
            </tr>
          </thead>
          <tbody>
            {clientsCode}
            {this.state.newClientState && //если добавить нового пользователя
            <MobileClient key={this.state.lastId} client={{id: this.state.lastId}}/> //поле для ввода
            }
          </tbody>
        </table>
        <input type="button" value="Добавить клиента" onClick={this.addNewClient} disabled={this.state.newClientState}/>
      </div>
    )
    ;
  }

}

export default MobileCompany;
