"use strict";

var _require = require("graphql-yoga"),
    GraphQLServer = _require.GraphQLServer;

var _messages = [];
var typeDefs = "\ntype Message {\n  id: ID!\n  user: String!\n  content: String!\n}\ntype Query {\n  messages: [Message!]\n}\n\ntype Mutation {\n  postMessage(user: String!, content: String!): ID!\n}\n";
var resolvers = {
  Query: {
    messages: function messages() {
      return _messages;
    }
  },
  Mutation: {
    postMessage: function postMessage(parent, _ref) {
      var user = _ref.user,
          content = _ref.content;
      var id = _messages.length;

      _messages.push({
        id: id,
        user: user,
        content: content
      });

      return id;
    }
  }
};
var server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.start(function (_ref2) {
  var port = _ref2.port;
  console.log("Server on http://localhost:".concat(port, "/"));
});