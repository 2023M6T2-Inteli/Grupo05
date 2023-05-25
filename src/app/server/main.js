const express = require('express');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const diretorioDestino = './imagens/';

if (!fs.existsSync(diretorioDestino)) {
  fs.mkdirSync(diretorioDestino);
}

app.post('/salvar-imagem', async (req, res) => {
  try {
    const nomeArquivo = `imagem_${Date.now()}.jpeg`;
    const imagemBase64 = req.body.imagem;

    const imagemBuffer = Buffer.from(imagemBase64, 'base64');

    const image = await jimp.read(imagemBuffer);

    const caminhoCompleto = path.join(diretorioDestino, nomeArquivo);

    await image.writeAsync(caminhoCompleto);

    console.log('Imagem salva com sucesso');
    res.status(200).json({ message: 'Imagem salva com sucesso' });
  } catch (err) {
    console.log('Erro ao salvar a imagem: ', err);
    res.status(500).json({ error: 'Erro ao salvar a imagem' });
  }
});

app.get('/imagem/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const caminhoCompleto = path.join(diretorioDestino, nomeArquivo);

  if (fs.existsSync(caminhoCompleto)) {
    res.setHeader('Content-Type', 'image/jpeg');

    const fileStream = fs.createReadStream(caminhoCompleto);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
