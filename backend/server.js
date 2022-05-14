const express = require("express");
const cors = require("cors");
const env = require('./env-loader');
const apiRoutes = require('./routes');
const app = express();

const corsOptions = {
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: '*'

};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes)
app.get("/", (req, res) => {
    res.json({ message: "api is online" });
});

app.use((_, res) => {
    res.status(404).json({
        status: 404,
        info: 'Resource not found'
    })
})

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});