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
      name: 'Beef Burger',
      description:
        'Onion, tomato, lettuce, cheese, dill pickle,tomato sauce, aioli, chips add grilled bacon OR fried',
      image: 'burgers.jpeg',
      category: categories[0]._id,
      price: 18.99,
    },

    {
      name: 'Classic Chicken Schnitzel',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'chicken-schnitzel.jpeg',
      category: categories[0]._id,
      price: 21.99,
    },

    {
      name: 'BBQ Pork Ribs',
      description:
        'Salad, wedges, sweet chilli, sour cream',
      image: 'pork-ribs.jpeg',
      category: categories[0]._id,
      price: 37.99,
    },

    {
      name: 'Grilled Salmon',
      description:
        'Cajun spice, mash, broccolini, grilled capsicum [gf]',
      image: 'Grilled-Salmon.jpeg',
      category: categories[0]._id,
      price: 27.99,
    },

    {
      name: 'Meat Lover Pizza',
      description:
        'Crispy rasher bacon, pepperoni pieces, seasoned ground beef, smoky leg ham & Italian sausage, all on a BBQ sauce base',
      image: 'meatlovers.jpeg',
      category: categories[1]._id,
      price: 20.99,
    },

    {
      name: 'Hawaiian Pizza',
      category: categories[1]._id,
      description:
        'A classic pairing of smoky leg ham & sweet pineapple pieces',
      image: 'hawaiian-pizza.jpeg',
      price: 16.99,
    },

    {
      name: 'Veggie Pizza',
      category: categories[1]._id,
      description:
        'Feta, pineapple, mushrooms, olives, fresh tomato, capsicum & red onion on a crème fraiche base topped with late fiery jalapenos & chilli flakes',
      image: 'Veggie-Pizza.jpeg',
      price: 13.99,
    },

    {
      name: 'French Chips',
      description:
        'Fresh potatos.',
      image: 'chips.jpeg',
      category: categories[2]._id,
      price: 7.99,
    },

    {
      name: 'Garden Salad',
      description:
        'Classic salad served with our homemade dressing',
      image: 'Garden-Salad.jpeg',
      category: categories[2]._id,
      price: 7.99,
    },

    {
      name: 'Creme Caramel',
      category: categories[3]._id,
      description: 'Fresh orange segments, vanilla crumb, orange crisps, mandarin gel, mandarin and cinnamon sorbet ✔️[GF, NF]',
      image: 'creme-caramel.jpeg',
      price: 16.99,
    },

    {
      name: 'Dark Chocolate Brownie',
      category: categories[3]._id,
      description:
        'Fudge sauce, peanuts, choice of fruits, chocolate crumb, peanut butter ice cream ✔️ [GF, NFO]',
      image: 'chocolate-brownie.jpeg',
      price: 16.99,
    },

    {
      name: 'Mango Pudding',
      category: categories[3]._id,
      description:
        'Fresh mango, mango coulis, lychee foam, condensed milk sauce, vanilla crumb, tuile, mango sorbet',
      image: 'Mango-Pudding.jpeg',
      price: 15.99,
    },

    {
      name: 'Matcha Tiramisu',
      category: categories[3]._id,
      description:
        'Matcha sponge, mascarpone cream, fresh raspberries, matcha sauce, white chocolate ✔️[NF]',
      image: 'matcha-tiramisu.jpeg',
      price: 15.99,
    },

    {
      name: 'Coke',
      category: categories[4]._id,
      description:
        'Canned drinks',
      image: 'coke.jpeg',
      price: 2.99,
    },

    {
      name: 'Water',
      category: categories[4]._id,
      description:
        'Bottled Water',
      image: 'water.jpeg',
      price: 3.99,
    },

    {
      name: 'Orienge Juice',
      category: categories[4]._id,
      description:
        'Bottled Juice',
      image: 'orange-juice.jpeg',
      price: 3.99,
    },

    {
      name: 'Sola',
      category: categories[4]._id,
      description:
        'Canned drinks',
      image: 'solo.jpeg',
      price: 2.99,
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
