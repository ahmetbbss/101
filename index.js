const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const fs = require('fs');

// Create a new HTML file named home.html
// Add an <h1> tag with the message "Welcome to ExpressJs Tutorial"
router.get('/home', (req, res) => {
  // Read the content of home.html and send it to the client
  fs.readFile('home.html', 'utf8', (err, data) => {
    if (err) {
      // Handle the error, e.g., send a 500 internal server error
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

// Return all details from user.json file to the client as JSON format
router.get('/profile', (req, res) => {
  // Read the user.json file and send its content as JSON
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      // Handle the error, e.g., send a 500 internal server error
      res.status(500).send('Internal Server Error');
    } else {
      const userData = JSON.parse(data);
      res.json(userData);
    }
  });
});

// Modify /login router to accept username and password as query string parameters
// Read data from user.json file and validate credentials
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Read the user.json file and validate credentials
  fs.readFile("user.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    const userData = JSON.parse(data);
    const user = userData.find((user) => user.username === username);

    if (!user) {
      res.status(400).json({
        status: false,
        message: "User not found",
      });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({
        status: false,
        message: "Incorrect password",
      });
      return;
    }

    res.json({
      status: true,
      message: "Login successful",
    });
  });
});

// Modify /logout route to accept username as a parameter and display a message
// in HTML format like <b>${username} successfully logout.<b>
router.post('/logout/:username', (req, res) => {
  const { username } = req.body;
  res.send(`<b>${username} successfully logout.</b>`);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
