'use strict';

const db = require('../server/db');
const {User, Product} = require('../server/db/models');

async function seed() {
	await db.sync({force: true});
	console.log('db synced!');

	const users = await Promise.all([
		User.create({email: 'cody@email.com', password: '123'}),
		User.create({email: 'murphy@email.com', password: '123'})
	]);

	const productTemplate = (name, description, price, imageUrl) => ({
		name,
		description,
		price,
		imageUrl
	});

	const creatingProducts = [
		productTemplate('Garfield', 'The friendly cat', 9.99),
		productTemplate('Golden Girls', 'Season 1', 13.99),
		productTemplate(
			'Motorola Beeper',
			'Get all your messages on the go',
			21.99,
			'/images/products/motorola_beeper.jpg'
		),
		productTemplate(
			'Sony Walkman',
			'Take your music everywhere. Requires two AA batteries. Batteries not included.',
			24.99,
			'/images/products/sony_walkman.jpg'
		),
		productTemplate(
			'Golden Parachute Pants',
			'Comfort and style',
			8.88,
			'/images/products/golden_hammer_pants.jpg'
		),
		productTemplate(
			'Apple Newton',
			'Stay on top of your daily tasks with a pocket planner.',
			100,
			'/images/products/apple_newton.jpg'
		),
		productTemplate(
			'Spot the Dog Beanie Baby',
			'Pet without the mess',
			8.97,
			'/images/products/spot_the_dog_beanie.jpg'
		),
		productTemplate('Nintendo 64', '', 150, '/images/products/nintendo64.jpeg')
	].map(data => Product.create(data));

	const products = await Promise.all(creatingProducts);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded ${products.length} products`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
