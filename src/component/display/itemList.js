import './itemList.css';
import React, { Component } from 'react';

function Variant(props) {
  return (
    <div className='variant'>
      <img 
        src={props.variant.image} 
        alt='' 
        onClick={() => props.onClick(props.index)}
        value='1'
      ></img>
    </div>
  );
}

const VariantList = (props) => {

  const variants = props.variants.map((variant, index) => 
    <div key={variant.uniqueEntryId} className='variant'>
      <div className={props.variantSelected === index ? 'selected' : ''}>
        <Variant variant={variant} onClick={props.onClick} index={index}/>
      </div> 
    </div>
  );
  return ( 
    <div>
      {props.variants.length>1 ? <div className='variants'>{variants}</div> : null}
    </div>
  );
}

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      variantSelected: 0
    }
  }

  variantClickHandler = (index) => {
    // console.log(index)
    this.setState({ variantSelected: index});
  }

  render() { 
    const primaryImageUrl = this.props.item.variants[this.state.variantSelected].image

    return (
      <div className="card">
        <div><img src={primaryImageUrl} alt=''></img></div>
        <div>{this.props.item.name}</div>
        <div>{this.props.item.name_zh}</div>
        <VariantList 
          variants={this.props.item.variants} 
          onClick={this.variantClickHandler}
          variantSelected={this.state.variantSelected}
        />
      </div>
    );
  }
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