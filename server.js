import express from 'express'
import path from 'path'

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(path.dirname('.'), 'public', 'index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 👁`)
);