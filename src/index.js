import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fossils from './fossils.json';


function Item(props) {
  return (
    <div className="card">
      <img src="https://acnhcdn.com/latest/FtrIcon/FtrFossilDimetrodonA.png" alt="Avatar"></img>
      {props.itemName}
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
        中文
    </div>
  );
}


class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: fossils,
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

  render() {
    const filteredItems = this.state.items.filter(item => (item[this.state.language]).includes(this.state.searchString))
    const items = filteredItems.map((item) => 
        <li key={item.id}>
          <Item itemName={item[this.state.language]}/>
        </li>
    );

    return (
      <div>
        <LangaugeSwitch onChange={this.languageHandler}/>
        <SearchBox onChange={this.searchBoxHandler}/>
        <ul>{items}</ul>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);