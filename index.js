var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');


const app = express();

// Import the data you created above
var data = require('./data.json');

// Define the User type with two string fields: `id` and `name`.
// The type of User is GraphQLObjectType, which has child fields
// with their own types (in this case, GraphQLString).
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    city: { type: graphql.GraphQLString },
    state: { type: graphql.GraphQLString },
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: graphql.GraphQLString }
          },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});


app.use("/GraphQL", graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Node/Express server for GraphQL server for weather searches.  listening on port");
});



console.log('GraphQL server running on http://localhost:3000/graphql');