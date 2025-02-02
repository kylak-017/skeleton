/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database
| - Sets up server middleware (i.e. addons that enable things like json parsing, user login)
| - Hooks up all the backend routes specified in api.js
| - Fowards frontend routes that should be handled by the React router
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator");
validator.checkSetup();

//import libraries needed for the webserver to work!
const http = require("http");
const bodyParser = require("body-parser"); // allow node to automatically parse POST body requests as JSON
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths

const api = require("./api");
const auth = require("./auth");

// socket stuff
const socketManager = require("./server-socket");
mongoose.set('strictQuery', true); // or false, depending on your preference


// Server configuration below
// TODO change connection URL after setting up your own database
const mongoConnectionURL = 
"mongodb+srv://kyurikim0174:U9MHGGbc6RTj3nhO@cluster0.hxnjhiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// TODO change database name to the name you chose
const databaseName = "Cluster0";

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// set up bodyParser, which allows us to process POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up a session, which will persist login data across requests
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

let participants = [];

app.get('/add-participant', (req, res) => {
  const clientId = req.query.clientId;
  if (clientId) {
    participants.push(clientId);
    res.json({ success: true, participants });
  } else {
    res.status(400).json({ success: false, message: 'No clientId provided' });
  }
});

// this checks if the user is logged in, and populates "req.user"
app.use(auth.populateCurrentUser);

// connect user-defined routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});


const imgSchema = require('./models/story.js');
const fs = require('fs');

app.set("view engine", "ejs");
require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL)
// .then(() => console.log("DB Connected"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now());
	}
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
	imgSchema.find({})
	.then((data) => {
		res.render('imagepage', {items: data});
	})
	.catch((err) => {
		console.log(err);
	});
});


app.post('/', upload.single('image'), (req, res) => {
	const obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	};
	imgSchema.create(obj)
	.then(() => {
		res.redirect('/');
	})
	.catch((err) => {
		console.log(err);
	});
});

// app.listen(port, err => {
// 	if (err)
// 		throw err;
// 	console.log('Server listening on port', port);
// });





app.get('/add-participant', (req, res) => {
  let participants = [];

  const clientId = req.query.clientId;
  if (clientId) {
    participants.push(clientId);
    res.json({ success: true, participants });
    res.send(participants)
  } else {
    res.status(400).json({ success: false, message: 'No clientId provided' });
  }
});


app.get('/api/leaderboard', (req, res) => {
  User.find({})
    .sort({ xp: -1 }) // Sort users by XP in descending order
    .limit(10) // For example, if you want only the top 10
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: 'Error retrieving users' });
        return;
      }
      res.status(200).json(users);
    });
});


// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// hardcode port to 3000 for now
const port = process.env.PORT || '3000';
const server = http.Server(app);
socketManager.init(server);




server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});