import React from 'react';

class ProductItem extends React.Component 
{
	constructor(props) {
		super(props);
		this.state = {quantity: 1}
	}
		
	handleInputChange = event => 
		this.setState({[event.target.name]: event.target.value})

	addToCart = () => {
		let cart = localStorage.getItem('cart') 
					? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	render()
	{
		const { product } = this.props;
		return (
			<div className="card" style={{ marginBottom: "10px"}}>
				<div className="card-body">
					<div className="row">			
						<div className="col-sm-3">
							<img src={product.image} className='card-image'/>
						</div>
						<div className="col-sm-6">
							<h4 className="card-title">{product.name}</h4>
							<p className="card-text">{product.description}</p>
							{/* <h5 className="card-text"><small>price: </small>${product.price}</h5> */}
							<span className="card-text">
								<small className='available-quanity-span'>Available Quantity: </small>{product.available_quantity}
							</span>
						</div>
						<div className="col-sm-3 border-left">
							<div>
								<div className="price-wrap h4">
									<span className="price"> ${product.price} </span>	
									<del className="price-old"> ${product.old_price}</del>
								</div>
								<br/>
								{ 
									product.available_quantity > 0 ?
										<div className="form-group">
											<input type="number" value={this.state.quantity} name="quantity" 
											onChange={this.handleInputChange} 
											/>
											<button className="btn btn-sm btn-warning " 
											onClick={this.addToCart}>Add to cart</button>
										</div> : 
									<p className="text-danger"> Product is out of stock </p>
								}
							</div> 
						</div>
					</div>	
				</div>
			</div>
		)
	}
}

export default ProductItem;