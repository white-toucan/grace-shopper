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
		productTemplate(
			'Beck - MellowGold',
			"Soy, Soy un perdedor..... When whining in one langauge just isn't enough",
			1899,
			'/images/products/Beck_MellowGold.jpg'
		),
		productTemplate(
			'Bush - Sixteen Stone',
			"Don't let the daaaays go by....Buy this album today!",
			1499,
			'/images/products/Bush_Sixteen Stone.jpg'
		),
		productTemplate(
			'Foo Fighters - Foo Fighters',
			'They thought long and hard about their album name',
			1999,
			'/images/products/FooFighters.jpg'
		),
		productTemplate(
			'Green Day - American Idiot',
			"Precient ideas... way before Donald's time",
			999,
			'/images/products/Green Day_American_Idiot.jpg'
		),
		productTemplate(
			'Green Day - Dookie',
			"If youv'e got the time to listen to me whine... add to cart",
			1199,
			'/images/products/Green Day_Dookie.jpg'
		),
		productTemplate(
			'Johnny Cash - I walk the Line',
			'Optimism, Effervesence, White, Green, Magenta... All nowwhere to be found on this album',
			1599,
			'/images/products/Johnny Cash_I_walk_the_Line.jpg'
		),
		productTemplate(
			'Nirvana - In Utero',
			'Buy this album...No Apologies',
			1499,
			'/images/products/Nirvana_In_Utero.jpg'
		),
		productTemplate(
			'Nirvana - Nevermind',
			'Buy today or tomorrow, well, whatever, nevermind',
			1599,
			'/images/products/Nirvana_nevermind.jpg'
		),
		productTemplate(
			'Pearl_Jam - Ten',
			"La da di indi itsat surrrrr... Eddie's spoken",
			1599,
			'/images/products/Pearl_Jam _Ten.jpg'
		),
		productTemplate(
			'Pixies - doolittle',
			'One of three essential Hipster Food Groups',
			1999,
			'/images/products/pixies_doolittle.jpg'
		),
		productTemplate(
			'Radiohead - PabloHoney',
			"Don't be a creep. Buy Now",
			1599,
			'/images/products/Radiohead_PabloHoney.jpg'
		),
		productTemplate(
			'Smashing Pumpkins - Siamesse Dream',
			'Today is the greatest...day to buy this album',
			1599,
			'/images/products/Smashing Pumpkins_Siamesse_Dream.jpg'
		),
		productTemplate(
			'SmashingPumpkins - Mellon Collie and the Infinite Sadness',
			'Tonight. Believe in me. Buy this album',
			1599,
			'/images/products/SmashingPumpkins_Mellon_Collie.jpg'
		),
		productTemplate(
			'Soundgarden - Black_Hole_Sun',
			"why don't you come...down off your high horse and buy this album!",
			1699,
			'/images/products/Sound_Garden_Black_Hole_Sun.jpg'
		),
		productTemplate(
			'Soundgarden - Loud Love',
			'A veritable forest of musical fruits and vegetables',
			1499,
			'/images/products/soundgarden_loud_love.jpg'
		),
		productTemplate(
			'Stone Temple Pilots - Core',
			'Classic STP',
			1599,
			'/images/products/Stone_Temple_Pilots_Core.jpg'
		),
		productTemplate(
			'Stone Temple Pilots - Purple',
			'Classic STP',
			1599,
			'/images/products/STP_purple.jpg'
		),
		productTemplate(
			'The Offspring - Smash.jpg',
			'Optimism, Effervesence, White, Green, Magenta, Puce... All nowwhere to be found on this album',
			1599,
			'/images/products/The Offspring - Smash.jpg'
		),
		productTemplate(
			'Weezer.jpg',
			'Optimism, Effervesence, White, Green, Magenta, Puce... All nowwhere to be found on this album',
			1599,
			'/images/products/Weezer.jpg'
		),
		productTemplate(
			'SmashingPumpkins - Mellon Collie and the Infinite Sadness',
			'Optimism, Effervesence, White, Green, Magenta, Puce... All nowwhere to be found on this album',
			1599,
			'/images/products/SmashingPumpkins_Mellon_Collie.jpg'
		),
		productTemplate(
			'SmashingPumpkins - Mellon Collie and the Infinite Sadness',
			'Optimism, Effervesence, White, Green, Magenta, Puce... All nowwhere to be found on this album',
			1599,
			'/images/products/SmashingPumpkins_Mellon_Collie.jpg'
		),
		productTemplate(
			'SmashingPumpkins - Mellon Collie and the Infinite Sadness',
			'Optimism, Effervesence, White, Green, Magenta, Puce... All nowwhere to be found on this album',
			1599,
			'/images/products/SmashingPumpkins_Mellon_Collie.jpg'
		)
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
