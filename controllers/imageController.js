const fs = require('node:fs');

exports.get = async(req, res) => {
  const id = req.params.id;
  const filepath = `./images/${id}`;

  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Bir hata oluştu');
    } else {
      res.sendFile(filepath, { root: '.' });
    }
  });
};