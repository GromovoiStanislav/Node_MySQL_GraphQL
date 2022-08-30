var { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        name: String!
        age: Int!
        email: String!
    }

    input UserInput {
        name: String!
        email: String!
        age: Int!
    }

    type TestType {
        count: Int!
        users: [User!]!
    }

    type Todo {
        id: ID!
        title: String!
        done: Boolean!
        createdAt: String
        updatedAt: String
    }

    input TodoInput {
        title: String!
    }

    type Query {
        test: TestType!
        random(min: Int!,max: Int!,count: Int!): [Float!]!
        getTodos: [Todo]!
    }

    

    type Mutation{
        addTestUser(user: UserInput!): User!
        createTodo(todo: TodoInput!): Todo!
        compliteTodo(id: ID!, done: Boolean): Todo!
        deleteTodo(id: ID!): Boolean!
    }
`);
