const { User, Book } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { _id }) => {
            return User.findOne({_id});
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                return { message: "Can't find this user" };
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                return { message: 'Wrong password!' };
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create(body);

            if (!user) {
                return { message: 'Something is wrong!' }
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { user, input }) => {
            console.log(user);
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                return err;
            }
        }

    }
};

module.exports = resolvers;