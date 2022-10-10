import React from "react";
import Users from "./Component/Users";
import { Success } from "./Component/Success";
import "./styles/css/index.min.css";
//users list: https://reqres.in/api/users

function App() {

  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [invites, setInvites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [success, setSuccess] = React.useState(false);


  React.useEffect(() =>{
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then((json) => {
    setUsers(json.data)
    console.log(json.data)
    })
    .catch(err => {console.warn(err);
      alert('Ошибка при получении')
    }).finally(() =>setLoading(false));
  }, []);
  
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }
  
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter( _id  => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? (
        <Success count={invites.length} />
        ) : (<Users 
          onChangeSearchValue={onChangeSearchValue} 
          searchValue={searchValue}
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
          />)
      }  
    </div>
  );
}

export default App;
