
<table>
<tr>
<td>

<a  href= "https://www2.gerdau.com.br/"><img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Gerdau_logo_%282011%29.svg/1200px-Gerdau_logo_%282011%29.svg.png"  alt="Gerdau"  border="0"  width="20%"></a>

</td>

<td><a  href= "https://www.inteli.edu.br/"><img  src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png"  alt="Inteli - Instituto de Tecnologia e Liderança"  border="0"  width="30%"></a>

</td>
</tr>
</table>

# Simulações de Robôs para aplicações diversas

## Ger_bROS

## Integrantes:

<a  href="https://www.linkedin.com/in/alysson-cordeiro-0684a8236">Alysson Cordeiro</a><br>

<a  href="https://www.linkedin.com/in/brunomleao">Bruno Leão</a><br>

<a  href="https://www.linkedin.com/in/caio-m1849">Caio Martins</a><br>

<a  href="https://www.linkedin.com/in/filipi-enzo-siqueira-kikuchi-1811a9213">Filipi Kikuchi</a><br>

<a  href="https://www.linkedin.com/in/kil-matheus-gomes-teixeira-78257020a">Kil Matheus</a><br>

<a  href="https://www.linkedin.com/in/paulo-evangelista">Paulo Evangelista</a><br>

<a  href="https://www.linkedin.com/in/kil-matheus-gomes-teixeira-78257020a">Henrique Schilder</a><br>

---

## Descrição


O Instituto de Tecnologia e Liderança (INTELI) estabeleceu uma parceria com a GERDAU, uma das maiores empresas produtoras de aço, com o objetivo de criar uma solução tecnológica inovadora. Essa colaboração envolveu alunos do curso de Engenharia da Computação, que desenvolveram um sistema capaz de analisar as condições atmosféricas de forma precisa utilizando dispositivos de Internet das Coisas (IoT) e um robô capaz de se locomover em espaços confinados.

O principal objetivo dessa solução é ajudar a GERDAU a alcançar um desafio importante, o "Acidente Zero". Com esse projeto, a empresa busca reduzir os riscos aos quais seus colaboradores são expostos em ambientes confinados, oferecendo uma análise prévia do local. Isso proporcionará um controle mais efetivo da situação e uma tomada de decisão mais precisa.

Para viabilizar o desenvolvimento dessa solução, o INTELI disponibilizou robôs móveis fabricados pela empresa Robotis. Esses robôs serão integrados com lógica de programação para movimentação, sensores e um Dashboard, agregando um valor significativo para o nosso cliente.

<br><br>

<p  align="center">
<img  src="docs/img/robo.jpg"  alt="Robô">
<i>Imagem 1: robô</i>
</p>
<p  align="center">
Fonte: TurtleBot3 Robotis, Disponibilizado pelo Inteli.
</p>O nosso projeto tem como objetivo principal auxiliar os colaboradores da GERDAU a terem um controle mais efetivo em situações em que é necessário que um ser humano adentre um espaço confinado para realizar uma manutenção. O objetivo é reduzir significativamente a probabilidade de exposição a riscos, especialmente os relacionados às condições atmosféricas.

O nosso robô será equipado com sensores avançados, capazes de detectar as condições atmosféricas presentes no ambiente, incluindo o nível de oxigênio e a presença de gases tóxicos e/ou inflamáveis. Além disso, o robô será capaz de capturar imagens do local utilizando uma câmera integrada, permitindo uma análise visual precisa. Todas essas informações serão transmitidas para uma plataforma de interface intuitiva, onde o técnico terá acesso às informações coletadas antes de tomar qualquer decisão.

Com essa solução, visamos proporcionar uma avaliação prévia do ambiente confinado, permitindo que o técnico tenha acesso a informações essenciais para tomar decisões seguras e bem informadas. Dessa forma, aumentaremos a segurança e reduziremos os riscos associados às atividades em espaços confinados.

<br>

---

## 🛠 Estrutura de pastas
```bash
.
├── LICENSE
├── README.md
├── docs
│   ├── README.md
│   ├── _config.yml
│   ├── index.md
│   ├── img
│   └── pdf
├── media
│   └── README.md
└── src
    ├── README.md
    ├── algorithm
    │   ├── battery.py
    │   ├── initial.py
    │   ├── map_generator.py
    │   └── simulation.py
    ├── app
    │   ├── pages
    │   ├── components
    │   ├── styles
    │   ├── utils
    │   ├── api
    │   └── ... outros arquivos e pastas relevantes para o projeto Next.js
    ├── embed
    │   └── ROS_pkgs
    │       └── ...outros arquivos e pastas relevantes para o pacote ROS
    └── img_detection
        ├── model.pt
        └── pipeline.ipynb

12 directories, 18 files
```
 Todas as nossa pastas importantes estão declaradas acima. Vale ressaltar que quando utilizamos algumas tecnologias de desenvolvimento como Backend, Frontend e Bibliotecas para o funcionamento da solução como todo, elas geram inúmeros diretórios que não cabem a serem declarados acima, pois é de uso e funcionamento interno do sistema. 

---
## 🛠 **INSTALAÇÃO**.


## 📈 Exemplo de uso

Alguns exemplos interessantes e úteis sobre como seu projeto pode ser utilizado.

Adicione blocos de códigos e, se necessário, screenshots.

Este modelo pode ser copiado e utilizado à vontade.

Através da cópia/clone/ download do repositório, altere os dados do readme.md e carregue os arquivos de seu projeto.

---

## 💻 **MANUAL DE CONFIGURAÇÃO**.
<br></br>
### **Como usar o programa?**
Inicialmente, para podermos utilizar a nossa aplicação, devemos primeiramente baixar os diretórios diretamente do GitHub no link a seguir:

* Diretório - https://github.com/2023M6T2-Inteli/Grupo05

Para fazer o download do repostório, deve-se seguir conforme a imagem abaixo:

<img  src="docs/img/git_download.png"  alt="diretório">
<i>Imagem 2: diretório</i>
<br></br>
Vale ressaltar que você poderá baixar de duas maneiras:

1. Através do *Open with GitHub Desktop*. Por aqui poderá crar um clone para sua máquina.
2. Ou através do *Download ZIP*.

Em seguida, abra seu editor de código - usamos o Visual Code para execução. E vá para a pasta destino do programa.

**Pasta destino: src>app>renderer>pages>inicio**

<img  src="docs/img/vs_inicial.png"  alt="VS Code aberto">
<i>Imagem 3: VS Code aberto</i>

<br></br>

Agora, nessa pasta, baixe o framework React.js. Aqui está comando para baixar o React usando o npm:

<b>npm install react</b>

E também o Next.js. Aqui estão os comandos para baixar o Next.js usando o npm:

<b>npm install next</b>

Logo depois, instale as bibliotecas pedentes. aqui estão as bibliotecas Utilizadas:

* MUI, Material UI - https://mui.com
* MUI, Icons Material - https://mui.com/material-ui/getting-started/installation/
* React-Boostrap - https://react-bootstrap.github.io/docs/getting-started/introduction
* Axios - https://axios-http.com/docs/intro
* Tailwindcss - https://tailwindcss.com/docs/installation
* 
Todas as bibliotecas utilizadas a seguir, desde de que o projeto esteja baixado direto do Github e esteja aberto no terminal do VSCode, podem ser instaladas pelo comando:

<b>npm i</b>

Caso ainda não consiga instalar tudo, você pode instalar separadamente utilizando os comandos <b>npm install</b> e suas respectivas bibliotecas ou visitando os sites indicados de cada uma acima.

<img  src="docs/img/npm_i.png"  alt="npm install">
<i>Imagem 4: instalação das bibliotecas</i>

<br></br>
Agora com nosso ambiente configurado, você já pode executar o programa usando "<b>npm run dev</b>". Lembre-se que, para executá-lo, você precisa estar na pasta destino do código principal que é "**pages**". Aqui está o direcionamento: **src>app>renderer>pages>inicio**.

<img  src="docs/img/npm_run.png"  alt="npm run dev">
<i>Imagem 5: aplicação rodando.</i>

<br></br>
Prontinho! O front-end está funcionando em sua máquina!

<img  src="docs/img/app_run.png"  alt="aplicação rodando">
<i>Imagem 6: aplicação rodando</i>


___
---

## 🗃 Histórico de lançamentos

A cada atualização os detalhes devem ser lançados aqui.

* 0.2.1 - 25/01/2022

* MUDANÇA: Atualização de docs (código do módulo permanece inalterado)

* 0.2.0 - 15/01/2022

* MUDANÇA: Remove `setDefaultXYZ()`

* ADD: Adiciona `init()`

* 0.1.1 - 11/01/2022

* CONSERTADO: Crash quando chama `baz()` (Obrigado @NomeDoContribuidorGeneroso!)

* 0.1.0 - 10/01/2022

* O primeiro lançamento adequado

* MUDANÇA: Renomeia `foo()` para `bar()`

* 0.0.1 - 01/01/2022

* Trabalho em andamento

## 📋 Licença/License

<p  xmlns:cc="http://creativecommons.org/ns#"  xmlns:dct="http://purl.org/dc/terms/"><a  property="dct:title"  rel="cc:attributionURL"  href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a  rel="cc:attributionURL dct:creator"  property="cc:attributionName"  href="https://www.yggbrasil.com.br/vr">INTELI, VICTOR BRUNO ALEXANDER ROSETTI DE QUIROZ</a> is licensed under <a  href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"  target="_blank"  rel="license noopener noreferrer"  style="display:inline-block;">Attribution 4.0 International<img  style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"  src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img  style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"  src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://github.com/iuricode/readme-template>

2. <https://github.com/gabrieldejesus/readme-model>

3. <https://creativecommons.org/share-your-work/>