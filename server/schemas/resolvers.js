const { AuthenticationError } = require('apollo-server-express');
const { User, Food, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        foods: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = catogory;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Food.find(params).populate('category');
        },
        food: async (parent, { _id }) => {
            return await Food.findById(_id).populate('category');

        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.foods',
                    populate: 'category'
                });
                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;

            }
            throw new AuthenticaitionError('Notlogged in');
        },

        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.foods',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },

        checkout: async (parent, args, context) => {
            console.log('i am calling')
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ foods: args.foods });
            const line_items = [];

            const { foods } = await order.populate('foods').execPopulate();

            console.log('stripe', stripe.products);

            for (let i = 0; i < foods.length; i++) {
                const food = await stripe.products.create({
                    name: foods[i].name,
                    description: foods[i].description,
                    images: [`${url}/images/${foods[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: food.id,
                    unit_amount: foods[i].price * 100,
                    currency: 'aud',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        addOrder: async (parent, { foods }, context) => {
            console.log(context);
            if (context.user) {
                const order = neworder({ foods });

                await User.findByIdAndUpdate(context.user._id, { push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });

            }

            throw new AuthenticationError('Not logged in');
        },

        updateFood: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Food.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;


