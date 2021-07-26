const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const db = require('./config/connection');
//const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const apolloServerStart = async () => {
  await server.start()
  server.applyMiddleware({ app })
  return app;
}

const app = express();
const PORT = process.env.PORT || 3001;

apolloServerStart()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
