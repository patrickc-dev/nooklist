import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fossils from './data/fossils.json';
import villagers from './data/villagers.json';



function Bmc(props) {
  return (
    <div>
      <a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/nooklist">
        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/>
        <span>Buy me a coffee</span>
      </a>
    </div>
  );
}


function Item(props) {
  return (
    <div className="card">
      <div><img src={'https://acnhcdn.com/latest/' + props.item.imgurl + '.png'} alt="Avatar"></img></div>
      <div>{props.item.en}</div>
      <div>{props.item.zh}</div>
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

function LangaugeSwitch(props) {
  return (
    <div>
        <input type="checkbox" onChange={props.onChange}/>
        中文 (現在沒用的按鈕)
    </div>
  );
}

function ItemType(props) {
  return (
    <div>
      Choose item type: 
      <select onChange={props.onChange} value={props.value}>
        <option value="fossils">fossils</option>
        <option value="villagers">villagers</option>
      </select>
    </div>
  );
}


class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: fossils,
      itemType: 'fossils',
      searchString: '',
      language: 'en',
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

  languageHandler = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.setState({language: 'zh'})
    }
    else {
      this.setState({language: 'en'})
    }
  }

  itemTypeHandler = (event) => {
    console.log(event.target.value);
    const newItemType = event.target.value
    if (newItemType == 'fossils') {
      this.setState({items: fossils})
    }
    else {
      this.setState({items: villagers})
    }

    this.setState({itemType: newItemType})

  }

  render() {
    const filteredItems = this.state.items.filter(
      item => (item.en + item.zh).includes(this.state.searchString)
    )
    const items = filteredItems.map((item) => 
        <li key={item.id}>
          <Item item={item}/>
        </li>
    );

    return (
      <div>
        <Bmc/>
        <LangaugeSwitch onChange={this.languageHandler}/>
        <SearchBox onChange={this.searchBoxHandler}/>
        <ItemType onChange={this.itemTypeHandler} value={this.state.itemType}/>
        <ul class="cards">{items}</ul>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);