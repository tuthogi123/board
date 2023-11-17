const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/campx', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model
const partySchema = new mongoose.Schema({
  venue: String,
  date: String,
  time: String,
});

const Party = mongoose.model('Party', partySchema);

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/campx.html');
});

// Handle file upload and store data in the database
app.post('/upload', upload.fields([]), async (req, res) => {
  const { section, partyVenue, partyDate, partyTime, bootcampVenue, bootcampDate, bootcampTime, bootcampDescription } = req.body;

  try {
    // Save data to MongoDB based on the selected section
    if (section === 'partys') {
      await Party.create({ venue: partyVenue, date: partyDate, time: partyTime });
    } else if (section === 'bootcamp') {

    }

    res.status(200).send('File uploaded and data stored successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
