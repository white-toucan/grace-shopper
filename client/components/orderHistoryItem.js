import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Item } from 'semantic-ui-react';
import { defaultImageUrl } from './util/constants';
import { padZeros, convertTime, centsToDollars } from './util/helperFuncs';

const OrderHistoryItem = props => {
	const { index, isActive, orderDetails, handleClick } = props;
	const orderTotal = orderDetails.products.reduce((total, item) => {
		return total + (item.quantity * item.purchasePrice);
	}, 0);

	return(
		<Fragment>
			<Accordion.Title active={isActive} index={index} onClick={() => handleClick(index)}>
				<Icon name='dropdown' />
				<span>
					<div style={{fontSize: '125%'}}>
						Ordered on {convertTime(orderDetails.updatedAt)}
					</div>
					<div style={{fontSize: '90%'}}>
						Order# {padZeros(orderDetails.id, 8)}
					</div>
				</span>
			</Accordion.Title>

			<Accordion.Content active={isActive}>
				<Item.Group divided>
					{
					orderDetails.products.map(product =>
						<Item key={product.productId}>
							<Item.Image
								size='tiny'
								src={product.imageUrl || defaultImageUrl} />

							<Item.Content>
								<Item.Header><Link to={`/products/${product.productId}`}>
									{product.productName}
								</Link></Item.Header>
								<Item.Description>
									<span className="price">
										{product.quantity} x ${centsToDollars(product.purchasePrice)}
									</span>
								</Item.Description>
							</Item.Content>
						</Item>
					)
					}
					<Item>
						<strong className="price">
							Order Total: ${centsToDollars(orderTotal)}
						</strong>
					</Item>
				</Item.Group>
			</Accordion.Content>
		</Fragment>
	);
};

export default OrderHistoryItem;
