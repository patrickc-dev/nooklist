import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import itemsData from './data/items.json';
import itemTypesData from './data/itemtypes.json';
import Bmc from './component/monetize/bmc';
import ItemList from './component/display/itemList';


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
  filteredItem = filteredItem.filter(item => (item.name + item.name_zh).includes(searchString))

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
        filteredItems: setItems(this.state.itemType, searchString),
        pageNumber: 1,
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
    


    return (
      <div>
        <Bmc/>
        <SearchBox onChange={this.searchBoxHandler}/>
        <ItemType onChange={this.itemTypeHandler} value={this.state.itemType}/>
        <PageSelector onClick={this.pageHandler} pageNumber={this.state.pageNumber}/>
        <ItemList filteredItems={this.state.filteredItems} pageNumber={this.state.pageNumber}/>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);