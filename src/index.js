import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import fossils from './data/fossils.json';
// import villagers from './data/villagers.json';
import itemsData from './data/items.json';
import itemTypesData from './data/itemtypes.json';



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

function Variant(props) {
  return (
    <div className='variant'>
      <img src={props.variant.image} alt=''></img>
    </div>
  );
}

function Item(props) {

  const primaryImageUrl = props.item.variants[0].image
  const variants = props.item.variants.map((variant) => 
  <div key={variant.uniqueEntryId} className='variant'>
    <Variant variant={variant}/>
  </div>
);

  return (
    <div className="card">
      <div><img src={primaryImageUrl} alt=''></img></div>
      <div>{props.item.name}</div>
      <div>{props.item.name_zh}</div>
      {variants.length>1 ? <div className='variants'>{variants}</div> : null}
    </div>
  );
}

function SearchBox(props) {
  return (
    <div>
      <label>搜尋: </label>
      <input onChange={props.onChange}/>
    </div>
  );
}

function ItemType(props) {
  const itemTypes = itemTypesData.map((itemType) =>
    <option value={itemType.itemtype}>{itemType.itemtype_zh}</option>
  )

  return (
    <div>
      類別: 
      <select onChange={props.onChange} value={props.value}>
        {itemTypes}
      </select>
    </div>
  );
}


class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: itemsData.filter(item => (item.sourceSheet) === 'Housewares'),
      itemType: 'Housewares',
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
    const newItems = itemsData.filter(item => (item.sourceSheet) === newItemType)

    this.setState({
      items: newItems,
      itemType: newItemType
    })

  }

  render() {

    const filteredItems = this.state.items.filter(
      item => (item.name).includes(this.state.searchString)
    )

    const items = filteredItems.slice(0, 10).map((item) => 
        <div key={item.name}>
          <Item item={item}/>
        </div>
    );

    return (
      <div>
        <Bmc/>
        <SearchBox onChange={this.searchBoxHandler}/>
        <ItemType onChange={this.itemTypeHandler} value={this.state.itemType}/>
        <div>{filteredItems.length + '個東西 只顯示10個'}</div>
        <div className="cards">{items}</div>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);