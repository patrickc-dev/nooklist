import './itemList.css';
import React from 'react';

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
  
function ItemList(props) {
    const startItem = (props.pageNumber - 1) * 20
    const displayItems = props.filteredItems.slice(startItem, startItem+20).map((item) => 
        <div key={item.name}>
          <Item item={item}/>
        </div>
    );
  
    return(
      <div>
        <div>{props.filteredItems.length + '個東西 顯示第' + (startItem+1) + ' - ' + (startItem+20) + '個'}</div>
        <div className="cards">{displayItems}</div>
      </div>
    );
  }

export default ItemList