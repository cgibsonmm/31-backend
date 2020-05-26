const { app, http } = require("./app");

const PORT = process.env.PORT || 3003;

http.listen(PORT, console.log(`connected to *:${PORT}`));
