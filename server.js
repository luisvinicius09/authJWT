const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require('./models');
const Role = db.role;

db.mongoose.connect(`mongodb+srv://admin:doidera_223@users.h7o9q.mongodb.net/users?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log("Successfully connect to MongoDB"); initial()}).catch(err => {console.error("Connection error", err); process.exit()});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if(!err && count === 0) {
      new Role({
        name: 'user'
      }).save(err => {
        if (err) {
          console.log('error1', err);
        }

        console.log("Added 'user' to roles collection");
      });

      new Role({
        name: 'moderator'
      }).save(err => {
        if (err) {
          console.log("error2", err);
        }

        console.log("Added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error3", err);
        }

        console.log("Added 'admin' to roles collection");
      })
    }
  })
}

app.get('/', (req, res) => {
  res.json({message: 'Welcome to my auth APP'});
  console.log("working")
});


require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
