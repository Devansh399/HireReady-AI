const dotenv = require("dotenv");

dotenv.config();

const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js");

connectToDB();


// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});