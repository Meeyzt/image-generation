const Imagine = require('../models/imagine');
const fs = require('node:fs');

exports.predict = async(req, res) => {
  const userId = req.user.userId;

  const prompt = req.body.prompt;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
    {
      headers: { Authorization: "Bearer " + process.env.HUGGIN_TOKEN },
      method: "POST",
      body: JSON.stringify(prompt),
    }
  );
  
  const fileName = './images/'+ prompt.replaceAll(' ', '_').toLowerChugginTokenase() + Math.floor(Math.random()* 123123213) + '.jpg';
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(fileName, buffer, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Resim başarıyla kaydedildi.');
    }
  });
  
  const imagine = new Imagine({
    user: userId,
    prompt: prompt,
    image: fileName
  });

  res.json(imagine);
}

exports.getAll = (req, res) => {
  const userId = req.user.userId;

  Imagine.find({ user: userId })
    .then(feedbacks => {
      console.log('Kullanıcı geri bildirimleri alındı: ', feedbacks);
      res.json(feedbacks);
    })
    .catch(err => {
      console.error('Geri bildirimler alınırken hata oluştu: ', err);
      res.status(500).send(err);
    });
};