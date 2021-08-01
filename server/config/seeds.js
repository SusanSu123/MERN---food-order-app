const db = require('./connection');
const { User, Food, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Mains' },
    { name: 'Pizzas' },
    { name: 'Sides' },
    { name: 'Desserts' },
    { name: 'Drinks' },

  ]);

  console.log('categories seeded');

  await Food.deleteMany();

  const foods = await Food.insertMany([
    {
      name: 'Auggie BURGER',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'burgers.jpeg',
      category: categories[0]._id,
      price: 15.99,
      quantity: 100
    },
    {
      name: 'Meat Lover Pizza',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'meat-lovers-pizza.jpeg',
      category: categories[1]._id,
      price: 15.99,
      quantity: 100
    },
    {
      name: 'Hawaiian Pizza',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'hawaiian-pizza.jpeg',
      price: 16.99,
      quantity: 100
    },
    {
      name: 'Veggie Pizza',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'Veggie-Pizza.jpeg',
      price: 13.99,
      quantity: 100
    },
    {
      name: 'French Chips',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'chips.jpeg',
      category: categories[2]._id,
      price: 7.99,
      quantity: 100
    },

    {
      name: 'Creme Caramel',
      category: categories[3]._id,
      description: 'fresh orange segments, vanilla crumb, orange crisps, mandarin gel, mandarin and cinnamon sorbet ✔️[GF, NF]',
      image: 'creme-caramel.jpeg',
      price: 16.99,
      quantity: 50
    },
    {
      name: 'Dark Chocolate Brownie',
      category: categories[3]._id,
      description:
        'fudge sauce, peanuts, choice of fruits, chocolate crumb, peanut butter ice cream ✔️ [GF, NFO]',
      image: 'chocolate-brownie.jpeg',
      price: 16.99,
      quantity: 50
    },
    {
      name: 'Mango Pudding',
      category: categories[3]._id,
      description:
        'Fresh mango, mango coulis, lychee foam, condensed milk sauce, vanilla crumb, tuile, mango sorbet',
      image: 'Mango-Pudding.jpeg',
      price: 15.99,
      quantity: 50
    },
    {
      name: 'Matcha Tiramisu',
      category: categories[3]._id,
      description:
        'matcha sponge, mascarpone cream, fresh raspberries, matcha sauce, white chocolate ✔️[NF]',
      image: 'matcha-tiramisu.jpeg',
      price: 15.99,
      quantity: 30
    },

    {
      name: 'Coke',
      category: categories[4]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'coke.jpeg',
      price: 2.99,
      quantity: 999
    },
    {
      name: 'Water',
      category: categories[4]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'water.jpeg',
      price: 3.99,
      quantity: 999
    },
    {
      name: 'Sola',
      category: categories[4]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'solo.jpeg',
      price: 2.99,
      quantity: 999
    }

  ]);

  console.log('foods seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Sue',
    lastName: 'Su',
    email: 'sue@gmail.com',
    password: 'password1234',
    orders: [
      {
        foods: [foods[0]._id, foods[0]._id, foods[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
