const { gql } = require('apollo-server');

module.exports = gql`
type User {
    Username: String
    email : String 
    password : String 
    token : String
}
imput RegisterInput{
    username : String
    email: String 
    passeword : String 
}
imput LoginInput{
    email : String
    password : String 
}
type Query {
    user (id :ID!): User
    
}
type Mutation {
    registerUser(registerImput: RegisterInput : RegisterInput) : User

}
`