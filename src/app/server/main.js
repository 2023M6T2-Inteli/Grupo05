const express = require('express');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const multer = require('multer');
const cors = require('cors');
const {spawn} = require('child_process'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const diretorioDestino_imagens = './imagens/';
const diretorioDestino_videos = './videos/';

if (!fs.existsSync(diretorioDestino_imagens)) {
  fs.mkdirSync(diretorioDestino_imagens);
}

if (!fs.existsSync(diretorioDestino_videos)) {
  fs.mkdirSync(diretorioDestino_videos);
}

const storage = multer.diskStorage({
  destination: diretorioDestino_videos,
  filename: (req, file, cb) => {
    const nomeArquivo = `video_${Date.now()}.${getFileExtension(
      file.originalname
    )}`;
    cb(null, nomeArquivo);
  },
});

const upload = multer({ storage });

const getFileExtension = (filename) => {
  const ext = path.extname(filename);
  return ext.toLowerCase().replace('.', '');
};

app.post('/upload-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    console.log('Vídeo salvo com sucesso:', req.file.filename);
    res.status(200).json({ message: 'Vídeo salvo com sucesso' });
  } catch (err) {
    console.log('Erro ao salvar o vídeo:', err);
    res.status(500).json({ error: 'Erro ao salvar o vídeo' });
  }
});

app.get('/video-caminho/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const caminhoCompleto = path.join(diretorioDestino_videos, nomeArquivo);

  if (fs.existsSync(caminhoCompleto)) {
    res.status(200).json({ path: caminhoCompleto });
  } else {
    res.status(404).json({ error: 'Vídeo não encontrado' });
  }
});

app.get('/imagem-caminho/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const caminhoCompleto = path.join(diretorioDestino_imagens, nomeArquivo);

  if (fs.existsSync(caminhoCompleto)) {
    res.status(200).json({ path: caminhoCompleto });
  } else {
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
});

app.post('/salvar-imagem', async (req, res) => {
  try {
    const nomeArquivo = `imagem_${Date.now()}.jpeg`;
    const imagemBase64 = req.body.imagem;

    const imagemBuffer = Buffer.from(imagemBase64, 'base64');

    const image = await jimp.read(imagemBuffer);

    const caminhoCompleto = path.join(diretorioDestino_imagens, nomeArquivo);

    await image.writeAsync(caminhoCompleto);

    console.log('Imagem salva com sucesso');
    res.status(200).json({ message: 'Imagem salva com sucesso' });
  } catch (err) {
    console.log('Erro ao salvar a imagem: ', err);
    res.status(500).json({ error: 'Erro ao salvar a imagem' });
  }
});

app.get('/image-mostrar/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const caminhoCompleto = path.join(diretorioDestino_imagens, nomeArquivo);

  if (fs.existsSync(caminhoCompleto)) {
    res.setHeader('Content-Type', 'image/jpeg');

    const fileStream = fs.createReadStream(caminhoCompleto);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
});

app.post('/input-dados', async (req,res) => {
  console.log(req.body);
  try {
    console.log(req);
    res.status(200).json({ path: "Tudo certo" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
});

app.get('/test', (req, res) => {

  let dataToSend;
  const current_path = path.resolve('');
  const pathToFile = path.join(current_path, '..', 'algorithm', 'map_generator.py');

  console.log(pathToFile);
 // spawn new child process to call the python script
  const python = spawn('python', [`${pathToFile}`]);

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });

 // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
  // send data to browser
    res.status(200).json({filename: dataToSend});
  })
})

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
