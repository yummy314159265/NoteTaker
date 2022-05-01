import express from 'express';
import path from 'path';
import { api } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(path.dirname('.'), 'public', 'index.html'), { root: path.join(path.dirname('.'))})
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(path.dirname('.'), 'public', 'notes.html'), { root: path.join(path.dirname('.'))})
);

app.get('*', (req, res) => 
  res.sendFile(path.join(path.dirname('.'), 'public', '404.html'), { root: path.join(path.dirname('.'))})
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 👁`)
);