import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fossils from './fossils.json';


function Item(props) {
  return (
    <div className="card">
      {props.itemName}
    </div>
  );
}

function SearchBox(props) {
  return (
    <input onChange={props.onChange}/>
  );
}


class Game extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: fossils,
      searchString: ''
    };
  }

  searchBoxHandler = (event) => {
    this.setState(
      {
        searchString: event.target.value,
      }
    )
  }


  render() {
    const filteredItems = this.state.items.filter(item => (item.en + ' ' + item.zh).includes(this.state.searchString))
    const items = filteredItems.map((item) => 
        <li key={item.id}>
          <Item itemName={item.en + ' ' + item.zh}/>
        </li>
    );

    return (
      <div>
        <div><SearchBox onChange={this.searchBoxHandler}/></div>
        <div>{'Currently searching: ' + this.state.searchString}</div>
        <ol>{items}</ol>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);