import app from './src/core/app.js';
import {port}  from'./src/config/env.js';

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
