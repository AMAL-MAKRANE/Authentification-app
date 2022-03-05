const User = require('../../models/User');
const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            /* Do input validation
            if (!(email && password && first_name && last_name)) {
                res.status(400).send("All input is required");
            }
            */
            //see if an old user exists with email attempting to register
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                throw new ApolloError('A user is already registered with the email: ' + email, 'USER_ALREADY_EXISTS');
            }
            //encrypt password

            var encryptedPassword = await bcrypt.hash(password, 10);
            // build out mongoose model (user)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });
            // create out jwt 

            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFESTRING",
                {
                    expiresIn: "2h",
                }
            );

            newUser.token = token;
            //save our user  in mongodb
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            };
        },

    },
    Query: {
        user: (_, { ID }) => User.findById(ID)
    }
}