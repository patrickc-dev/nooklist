import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import fossils from './data/fossils.json';
// import villagers from './data/villagers.json';
import itemsData from './data/items.json';



function Bmc(props) {
  return (
    <div>
      <a className="bmc-button" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/nooklist">
        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/>
        <span>Buy me a coffee</span>
      </a>
    </div>
  );
}


function Item(props) {

  const primaryImageUrl = props.item.variants[0].image

  return (
    <div className="card">
      <div><img src={primaryImageUrl} alt=''></img></div>
      <div>{props.item.name}</div>
      <div>{props.item.name_zh}</div>
    </div>
  );
}

function SearchBox(props) {
  return (
    <div>
      <label>Search Box: </label>
      <input onChange={props.onChange}/>
    </div>
  );
}

function ItemType(props) {
  return (
    <div>
      Choose item type: 
      <select onChange={props.onChange} value={props.value}>
        <option value="Housewares">家具</option>
        <option value="Fossils">化石</option>
      </select>
    </div>
  );
}


class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: itemsData.filter(item => (item.sourceSheet) === 'Fossils'),
      itemType: 'Fossils',
      searchString: '',
    };
  }

  searchBoxHandler = (event) => {
    const searchString = event.target.value
    console.log('Search String : ' + searchString)

    this.setState(
      {
        searchString: searchString,
      }
    )
  }

  itemTypeHandler = (event) => {
    console.log(event.target.value);
    const newItemType = event.target.value
    const newItems = itemsData.filter(item => (item.sourceSheet) === event.target.value)

    this.setState({
      items: newItems,
      itemType: newItemType
    })

  }

  render() {

    const filteredItems = this.state.items.filter(
      item => (item.name).includes(this.state.searchString)
    )

    const items = filteredItems.map((item) => 
        <li key={item.name}>
          <Item item={item}/>
        </li>
    );

    return (
      <div>
        <Bmc/>
        <SearchBox onChange={this.searchBoxHandler}/>
        <ItemType onChange={this.itemTypeHandler} value={this.state.itemType}/>
        <ul className="cards">{items}</ul>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);