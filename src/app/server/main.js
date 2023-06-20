const express = require('express');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const diretorioDestino_imagens = './imagens/';
const diretorioDestino_videos = './videos/';
const diretorioDestino_videos_2 = './renderer/public/video/';

const caminhoBancoDados = './database';

const db = new sqlite3.Database(caminhoBancoDados, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados SQLite:', err.message);
  } else {
    console.log('Conexão com o banco de dados SQLite estabelecida com sucesso');
  }
});

db.run(
  `
  CREATE TABLE IF NOT EXISTS SensorGas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataHora DATETIME,
    valorGas FLOAT
  );
`,
  (err) => {
    if (err) {
      console.error('Erro ao criar a tabela SensorGas:', err.message);
    } else {
      console.log('Tabela SensorGas criada com sucesso');
    }
  }
);

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

app.get('/videos', (req, res) => {
  try {
    console.log('Lendo a pasta de videos:', diretorioDestino_videos_2);
    const videoFiles = fs.readdirSync(diretorioDestino_videos_2);
    const videos = videoFiles
      .filter((file) => {
        const fileExtension = path.extname(file).toLowerCase();
        return ['.mp4', '.mov', '.avi'].includes(fileExtension);
      })
      .map((videoFile) => {
        // return `${req.protocol}://${req.get('host')}/videos/${videoFile}`;
        return `./video/${videoFile}`;
      });

    console.log('Videos carregados com sucesso');
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Erro ao ler a pasta de vídeos:', error);
    res.status(500).json({ error: 'Erro ao ler a pasta de vídeos' });
  }
});

app.post('/upload-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    const filePath = path.join(diretorioDestino_videos, req.file.originalname);

    fs.writeFile(filePath, req.file.path, (err) => {
      if (err) {
        console.log('Erro ao salvar o vídeo:', err);
        res.status(500).json({ error: 'Erro ao salvar o vídeo' });
      } else {
        console.log('Vídeo salvo com sucesso:', req.file.filename);
        res.status(200).json({ message: 'Vídeo salvo com sucesso' });
      }
    });
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
    res
      .status(200)
      .json({ message: 'Imagem salva com sucesso', file: nomeArquivo });
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

app.post('/input-dados', async (req, res) => {
  console.log(req.body);
  try {
    console.log(req);
    res.status(200).json({ path: 'Tudo certo' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
});

app.post('/sensor-gas', async (req, res) => {
  try {
    const { sensorGas } = req.body;
    const valorGas = parseFloat(sensorGas.replace(',', '.'));

    if (isNaN(valorGas)) {
      throw new Error('Valor inválido do sensor de gás');
    }

    const dataHora = new Date().toISOString();

    db.run(
      `INSERT INTO SensorGas (dataHora, valorGas) VALUES (?, ?)`,
      [dataHora, valorGas],
      function (err) {
        if (err) {
          console.error(
            'Erro ao inserir os dados do sensor de gás:',
            err.message
          );
          res
            .status(500)
            .json({ error: 'Erro ao inserir os dados do sensor de gás' });
        } else {
          console.log('Dados do sensor de gás inseridos com sucesso');
          res
            .status(200)
            .json({ message: 'Dados do sensor de gás inseridos com sucesso' });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Valor inválido do sensor de gás' });
  }
});

app.get('/test/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  let dataToSend;
  const current_path = path.resolve('');
  const pathToFile = path.join(
    current_path,
    '..',
    'algorithm',
    'map_generator.py'
  );

  console.log(pathToFile);
  // spawn new child process to call the python script
  const python = spawn('python', [`${pathToFile}`, nomeArquivo]);

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });

  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
    // send data to browser
    res.status(200).json({ filename: dataToSend });
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
