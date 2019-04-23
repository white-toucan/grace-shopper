import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Item } from 'semantic-ui-react';
import { defaultImageUrl } from './util/constants';

const padZeros = (num, length) => {
	let numLength = num.toString().length;
	return Array(length - numLength).fill(0).join('').concat(num);
};

const OrderHistoryItem = props => {
	const { index, isActive, orderDetails, handleClick } = props;
	const orderTotal = orderDetails.products.reduce((total, item) => {
		return total + (item.quantity * item.price);
	}, 0);

	return(
		<Fragment>
			<Accordion.Title active={isActive} index={index} onClick={() => handleClick(index)}>
				<Icon name='dropdown' />
				<span>
					<div style={{fontSize: '125%'}}>Ordered {orderDetails.date}</div>
					<div style={{fontSize: '90%'}}>
						Order# {padZeros(orderDetails.id, 10)}
					</div>
				</span>
			</Accordion.Title>

			<Accordion.Content active={isActive}>
				<Item.Group divided>
					{
					orderDetails.products.map(product =>
						<Item key={product.id}>
							<Item.Image
								size='tiny'
								src={product.imageUrl || defaultImageUrl} />

							<Item.Content>
								<Item.Header><Link to={`/product/${product.id}`}>
									{product.name}
								</Link></Item.Header>
								<Item.Description>
									<span className="price">
										{product.quantity} x ${product.price/100}
									</span>
								</Item.Description>
							</Item.Content>
						</Item>
					)
					}
					<Item>
						<strong className="price">
							Order Total: ${orderTotal / 100}
						</strong>
					</Item>
				</Item.Group>
			</Accordion.Content>
		</Fragment>
	);
};

export default OrderHistoryItem;
