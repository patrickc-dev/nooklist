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
      <label>搜尋：</label>
      <input onChange={props.onChange}/>
    </div>
  );
}

function ItemType(props) {
  const itemTypes = itemTypesData.map((itemType) =>
    <option 
      value={itemType.itemtype} 
      key={itemType.itemtype}
    >
      {itemType.itemtype_zh}
    </option>
  )

  return (
    <div>
      類別：
      <select onChange={props.onChange} value={props.value}>
        {itemTypes}
      </select>
    </div>
  );
}

function PageSelector(props) {
  return (
  <div className="pagination">頁數：
    <button onClick={() => props.onClick('-')}>&laquo;</button>
    <span>{props.pageNumber}</span>
    <button onClick={() => props.onClick('+')}>&raquo;</button>
  </div>
  );
} 

function setItems(itemType, searchString) {
  let filteredItem = itemsData
  filteredItem = filteredItem.filter(item => (item.sourceSheet) === itemType)
  filteredItem = filteredItem.filter(item => (item.name).includes(searchString))
  return filteredItem
}

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filteredItems: setItems('Housewares', ''),
      itemType: 'Housewares',
      pageNumber: 1,
      searchString: '',
    };
  }



  searchBoxHandler = (event) => {
    const searchString = event.target.value
    // console.log('Search String : ' + searchString)

    this.setState(
      {
        searchString: searchString,
        filteredItems: setItems(this.state.itemType, searchString)
      }
    )
  }

  itemTypeHandler = (event) => {
    const newItemType = event.target.value
    // console.log('Item Type: ' + newItemType)

    this.setState({
      itemType: newItemType,
      filteredItems: setItems(newItemType, this.state.searchString)
    })

  }

  pageHandler = (direction) => {

    let newPageNumber = this.state.pageNumber
    let maxPage = Math.ceil(this.state.filteredItems.length / 20)

    if (direction === '-' && this.state.pageNumber > 1) {
      newPageNumber = this.state.pageNumber - 1
    } else if (direction === '+' && this.state.pageNumber < maxPage){
      newPageNumber = this.state.pageNumber + 1
    }

    this.setState({pageNumber: newPageNumber})
  }

  render() {
    
    const startItem = (this.state.pageNumber - 1) * 20
    const displayItems = this.state.filteredItems.slice(startItem, startItem+20).map((item) => 
        <div key={item.name}>
          <Item item={item}/>
        </div>
    );

    return (
      <div>
        <Bmc/>
        <SearchBox onChange={this.searchBoxHandler}/>
        <ItemType onChange={this.itemTypeHandler} value={this.state.itemType}/>
        <PageSelector onClick={this.pageHandler} pageNumber={this.state.pageNumber}/>
        <div>{this.state.filteredItems.length + '個東西 顯示第' + (startItem+1) + ' - ' + (startItem+20) + '個'}</div>
        <div className="cards">{displayItems}</div>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);