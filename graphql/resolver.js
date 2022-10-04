const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env.json')
const { UserInputError, AuthenticationError } = require('apollo-server')

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll()

                return users
            } catch (err) {
                console.log(err);
            }
        },
        login: async (_, args) => {
            const { username, password } = args
            let errors = {}

            try {
                if (username.trim() === '') errors.username = 'username must not be empty'
                if (password === '') errors.password = 'password must not be empty'

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError('bad input', { errors })
                }

                const user = await User.findOne({
                    where: { username }
                })

                if (!user) {
                    errors.username = 'user not found'
                    throw new UserInputError('user not found', { errors })
                }

                const correctPassword = await bcrypt.compare(password, user.password)

                if (!correctPassword) {
                    errors.password = 'password is incorect'
                    throw new AuthenticationError('password is incorrect', { errors })
                }
                // 60min 60sec
                const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 })

                // user.token = token

                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token
                }
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args
            let errors = {}
            try {
                // validate input data
                if (email.trim() === '') errors.email = 'email must be not empty'
                if (username.trim() === '') errors.username = 'username must be not empty'
                if (password.trim() === '') errors.password = 'password must be not empty'
                if (confirmPassword.trim() === '') errors.confirmPassword = 'repeat password must be not empty'

                if (password !== confirmPassword) errors.confirmPassword = 'passwords must match'

                if (Object.keys(errors).length > 0) {
                    throw errors
                }

                // Hash password
                password = await bcrypt.hash(password, 6)

                // Create user
                const user = await User.create({
                    username,
                    email,
                    password
                })

                // return user
                return user
            } catch (err) {
                console.log(err);
                //  Check if username / email exists, Check is email is valide
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach(e => (errors[e.path] = `${e.path} is already taken`))
                } else if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach(e => errors[e.path] = e.message)
                }
                throw new UserInputError('Bad input', { errors })
            }
        }
    }
}