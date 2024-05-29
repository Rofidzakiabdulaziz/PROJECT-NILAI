const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const AuthRoute = require('./routes/authRoute');
const gradeRoutes = require('./routes/gradeRoute');
const subjectsRoute = require('./routes/subjectRoute');


app.use('/api/subjects', subjectsRoute);
app.use('/api/grades', gradeRoutes);
app.use("/api/nilai", AuthRoute);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});