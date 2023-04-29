<table>

<tr>


<td>

<a  href= "https://www2.gerdau.com.br/"><img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Gerdau_logo_%282011%29.svg/1200px-Gerdau_logo_%282011%29.svg.png"  alt="Gerdau"  border="0"  width="20%"></a>

</td>

<td><a  href= "https://www.inteli.edu.br/"><img  src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png"  alt="Inteli - Instituto de Tecnologia e Liderança"  border="0"  width="30%"></a>

</td>

</tr>

</table>

  

<font  size="+12"><center>

---
---
SIMULAÇÃO DE ROBÔS PARA APLICAÇÃO DIVERSAS.

---
---
</center></font>
  

>*Observação 1: A estrutura inicial deste documento é só um exemplo. O seu grupo deverá alterar esta estrutura de acordo com o que está sendo solicitado nos artefatos.*

  

>*Observação 2: O índice abaixo não precisa ser editado se você utilizar o Visual Studio Code com a extensão **Markdown All in One**. Essa extensão atualiza o índice automaticamente quando o arquivo é salvo.*

  

**Conteúdo**

  

- [Autores](#autores)
- [Visão Geral do Projeto](#visão-geral-do-projeto)
  - [Empresa](#empresa)
  - [O Problema](#o-problema)
  - [Objetivos](#objetivos)
    - [Objetivos gerais](#objetivos-gerais)
    - [Objetivos específicos](#objetivos-específicos)
  - [Partes interessadas](#partes-interessadas)
- [Análise do Problema](#análise-do-problema)
  - [Análise da área de atuação](#análise-da-área-de-atuação)
  - [Análise do cenário: Matriz SWOT](#análise-do-cenário-matriz-swot)
  - [Proposta de Valor: Value Proposition Canvas](#proposta-de-valor-value-proposition-canvas)
  - [Matriz de Risco](#matriz-de-risco)
- [Requisitos do Sistema](#requisitos-do-sistema)
  - [Personas](#personas)
  - [Histórias dos usuários (user stories)](#histórias-dos-usuários-user-stories)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
  - [Módulos do Sistema e Visão Geral (Big Picture)](#módulos-do-sistema-e-visão-geral-big-picture)
  - [Descrição dos Subsistemas](#descrição-dos-subsistemas)
    - [Requisitos de software](#requisitos-de-software)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [METADESIGN.](#metadesign)
  - [FATORES MERCADOLÓGICO:](#fatores-mercadológico)
      - [**CENÁRIO DO MERCADO.**](#cenário-do-mercado)
      - [**VISÃO.**](#visão)
  - [SISTEMA PRODUTO/DESIGN:](#sistema-produtodesign)
      - [**MISSÃO.**](#missão)
      - [**DESIGN.**](#design)
  - [SUSTENTABILIDADE AMBIENTAL:](#sustentabilidade-ambiental)
  - [*Referências:*](#referências)
  - [Wireframe + Storyboard](#wireframe--storyboard)
  - [Design de Interface - Guia de Estilos](#design-de-interface---guia-de-estilos)
- [Projeto de Banco de Dados](#projeto-de-banco-de-dados)
  - [Modelo Conceitual](#modelo-conceitual)
  - [Modelo Lógico](#modelo-lógico)
- [Teste de Software](#teste-de-software)
  - [Testes Unitários](#testes-unitários)
  - [Teste de Usabilidade](#teste-de-usabilidade)
- [Análise de Dados](#análise-de-dados)
- [Manuais](#manuais)
  - [Manual de Implantação](#manual-de-implantação)
  - [Manual do Usuário](#manual-do-usuário)
  - [Manual do Administrador](#manual-do-administrador)
- [Referências](#referências-1)

  
  

# Autores

  

<a  href="https://www.linkedin.com/in/alysson-cordeiro-0684a8236">Alysson Cordeiro</a><br>

<a  href="https://www.linkedin.com/in/brunomleao">Bruno Leão</a><br>

<a  href="https://www.linkedin.com/in/caio-m1849">Caio Martins</a><br>

<a  href="https://www.linkedin.com/in/filipi-enzo-siqueira-kikuchi-1811a9213">Filipi Kikuchi</a><br>

<a  href="https://www.linkedin.com/in/kil-matheus-gomes-teixeira-78257020a">Kil Matheus</a><br>

<a  href="https://www.linkedin.com/in/paulo-evangelista">Paulo Evangelista</a><br>

<a  href="https://www.linkedin.com/in/kil-matheus-gomes-teixeira-78257020a">Henrique Schilder</a><br>

  
  

# Visão Geral do Projeto

  

## Empresa

  

Presente em mais de 10 países, a GERDAU é a maior empresa Brasileira produtora de aço e uma das principais fornecedoras de aços longos nas Américas e de aços especiais no mundo. No Brasil, tambem produz aços planos e minério de ferro. É uma pioneira nesse setor e na implantação de iniciativas de inovação digital, alem de ser uma das maiores recicladoras da América Latina, reclicando milhões de toneladas de sucato em aço, reforçando seu compromisso com o desenvolviemtno sustentável das regiões onde atua.

  

## O Problema

  

Um dos valores que a GERDAU mais preza é a segurança e a construção de um ambiente seguro em suas operações. Isso ligado a um grande desafio: acidente zero.

Um dos seus maiores riscos críticos já mapeados está relacionado a operações de colaboradores em Espaços Confinados, locais onde não foram projetados para ocupação humana contínua. Esses lugares podem apresentar um risco a integridade e a saúde dos mesmos sem a capacitação e equipamento adequados como exigem as normas regulamentadoras (NR33). Além disso, espaços confinados apresentam meios limitados de entrada e saída, uma ventilação insuficiente para remover contaminantes e tambem podendo contem uma deficiência (< 19,5%) ou enrequecimento (< 23%) de oxigênio

  

## Objetivos

  

### Objetivos gerais

  

Por meio de uma solução de simulação, um robô seja capaz de se mover em ambientes de espaço confinado, coletar dados a partir de sensores (principalmente de oxigênio outros gases) e que utilize filmagens para apoiar na inspeção prévia da estrutura.

  

### Objetivos específicos

  

Os objetivos específicos que a GERDAU espera da solução criada é a diminuição da probabilidade do risco de acidente durante serviços em espaços confinados por meio de uma análise atmosférica.

  

## Partes interessadas

  

Empresa GERDAU

Alunos do grupo 5 GER-bROS - Instituto de Tecnologia e Liderança - INTELI

  

# Análise do Problema

  

*Descrição_da_análise_do_problema*

  

## Análise da área de atuação

  

*Descrição_da_análise_da_área_de_atuação*

  
## Matriz de Oceano Azul

Para realizar a matriz de oceano azul, forma identificados os pontos que a empresa pretende Eliminar, Reduzir, Criar e Elevar. 

<p  align="center">

<img  src="docs\img\Matriz de Oceano azul.jpg"  alt="Matriz-oceano-azul">

</p>

### **Eliminar**
Para elencar os pontos que a empresa gostaria de eliminar, utilizou-se as dores elencadas pelo cliente, referentes a como a operação em espaços confinados é realizada atualmente. A medição imprecisa das condições atmosféricas dos ambientes foi um dos principais pontos que a empresa pretende reduzir ao aplicar a solução que foi acordado para desenvolvimento, embora seja impossível eliminar este tipo de ocorrência, a solução do grupo Ger_bROS pretende mitigar este risco, corroborando com a política "Acidente Zero" que a companhia já emprega atualmente, através da medição em tempo real dos fatores do ambiente. Além disso, através do equipamento elaborado, é possível mitigar o risco ocupacional de permanência dos colaboradores da empresa ao passo de que é permitido ao usuário a visualização em tempo real das imagens de dentro do espaço, o que previne acidentes como o caso de um funcionário desmaiar dentro da instalações em que a manutenção ou vistoria é realizada.

### **Reduzir**
Os pontos de redução elencados na matriz supramencionada estão correlacionados a diminuição de eventualidades referentes às operações em espaços confinados. De forma primária, ainda que, dada a filosofia da empresa de importar-se com a segurança e bem-estar de seus colaboradores, elencou-se o quesito de atenuação de gastos com eventuais acidentes, uma vez que após sofrer algum tipo de lesão no trabalho, os funcionários recebem amparo da empresa conforme assegura a lei. Outrossim, uma das peças chaves da solução é melhorarar a efetividade de manutenções preventivas nos espaços confinados, dado que, uma vez que o equipamento estiver implantado, será possível diminuir o intervalo entre as manutenções pois não é necessário que um técnico adentre as instalações de maior risco para fazer a vistoria do espaço e averiguar problemas, a câmera pensada para a solução assume esse papel e é capaz de registrar possíveis falhas. Em outro aspecto, é possível reduzir a necessidade de alocação de mão de obra para a função de medição das condições dos espaços confinados e desta forma pode-se empregar funcionários em outras atividades, aumentando a produtividade. 

### **Criar**
Para a realização das tarefas acima elencadas, a Gerdau pretende criar, ou que se crie neste caso, um veículo guiado automatizado de modo que seja possível fazer a visualização dos espaços confinados sem a necessidade da ação humana. Para que seja possível auferir as medições, será criado um software que possa ler dados de sensores e decidir o curso de ação para as tarefas que julgarem cabíveis. Outrossim, dashboard será criado, com os dados coletados, e será distribuído para os técnicos resposáveis de modo que eles possam visualizá-los facilmente em um dashboard, trazendo mais segurança para a equipe de forma geral e permitindo um registro histórico das operações que foram realizadas e em quais condições ocorreram. 

### **Elevar**
Para o quesito elevar, seguindo as boas práticas de segurança que a empresa tem e se baseando em sua cultura da segurança no trabalho, a solução até então proposta eleva a qualidade da segurança para os colaboradores, ao ponto de que permite conhecimento mais preciso das condições em que eles irão realizar suas tarefas no cotidiano e, por outra ótica, permite também a promover um plano de melhor capicatação para os funcionários, pensando na modernização industrial que ocorre atualmente e a política de inovação da empresa, nada mais necessário do que ter colaboradores que consigam manter-se atualizados no mercado de trabalho que cada vez mais migra para soluções automatizadas.

### **Avaliação de valor** 
Seguindo a ideia da matriz de oceano azul, foi feita uma avaliação de valor da solução em comparação com outras já disponíves no mercado e pode-se depreender, em certo aspecto, como a solução da equipe Ger_bROS se destaca quando comparada as soluções generalistas que não lidam com alguns dos problemas da indústria de siderurgia e metalurgia como um todo. 

<p  align="center">

<img  src="docs\img\Matriz de Avaliação de Valor.jpg"  alt="Avaliacao-de-valor">

</p>

> *Observação: A escala do gráfico refere-se ao quanto uma solução prioriza mais ou menos certo aspecto que foi elencado no eixo "x"*.
  
  
## Análise do cenário: Matriz SWOT

  

*Matriz_SWOT*

  
  

## Proposta de Valor: Value Proposition Canvas

  O Canvas é uma ferramente utilizada para guiar os desenvolvedores em relação qual é o real problema encontrado, para conseguir alinha a solução (produto e/ou serviço) para que atenda as necessidades e que agregue valor a empresa.
  Logo a baixo segue o desenvolvimento do <b>Value Proposition Canvas</b>
  
  <p  align="center">

<img  src="img/Canvas Value Proposition.jpg"  alt="Canvas Value Proposition">

</p>

## Matriz de Risco


<img  src="img/Matriz de risco - ameacas.png"  alt="Matriz de risco - ameacas">
<img  src="img/Matriz de risco - oportunidades.png"  alt="Matriz de risco - oportunidades">

Para garantir o sucesso de um projeto, é importante identificar e mitigar todos os riscos envolvidos no processo. No caso do projeto em questão, foram identificados alguns riscos. Abaixo, apresentamos maneiras de mitigar riscos mapeados

Risco 1: Equipar o robô com sensores de contaminação que possam detectar produtos químicos ou outros contaminantes presentes no espaço confinado. Além disso, o robô poderia ser equipado com revestimentos especiais que protejam seus componentes e sensores desses produtos/contaminantes.

Risco 2 e 3: Verificação da qualidade dos sensores e equipamentos utilizados no robô, com testes regulares para garantir o seu bom funcionamento e minimizar a possibilidade de falhas.

Risco 4: É importante que a equipe responsável pela operação do robô tenha conhecimento sobre as fontes de interferência e como evitá-las.

Risco 5: Garantir que o sistema de comunicação utilizado seja confiável e possua redundância. É recomendável que seja feita uma avaliação prévia do ambiente de espaço confinado para identificar possíveis obstáculos à transmissão de dados. Além disso, uma maneira que se é possível de se imaginar para mitigar o risco em questão é construção de um sistema de controle que possua capacidade de armazenamento de dados, para que, em caso de falhas na transmissão, os dados coletados pelo robô possam ser recuperados posteriormente.

  

# Requisitos do Sistema

  

*Descrição_dos_requisitos*

  

## Personas

  

*Descrição_das_personas*

  
  

## Histórias dos usuários (user stories)

  

*Descrição_das_histórias_dos_usuários*

  
  

# Arquitetura do Sistema
A arquitetura do sistema foi feito de forma particionada, separando o sistema operacional do robô, a arquitetura do backend para comunicação com o equipamento e o frontend para avaliar as informações do ambiente em que o equipamento está inserido, bem como visualizar as imagens captadas pela câmera que pretende implementar. 

<p  align="center">

<img  src="docs\img\Arquitetura do Sistema.jpg"  alt="Arquitetura">

</p>

## **FrontEnd**
Como pode-se ver, pensando na arquitetura do Frontend, foram pensadas 3 telas distintas, sendo uma delas para a visualização das informações captadas pela câmera acoplada ao Turtlebot3, uma tela para visualização dos dados processados pelos sensores em um dashboard, de modo a facilitar a operação do usuário final e uma tela para a simulação da rotina de inspeção que o robô estará encarregado de realizar, sendo esta responsável por verificar a execução correta dos procedimentos necessários a atividade realizada. 

## **Backend**
Como pode-se ver, a arquitetura do backend estará responsável por processar as informações que serão enviadas pelo robô, via wi-fi, para uma API servida em Node.js. As informações em questão serão o nível de oxigênio no espaço confinado, a imagens do espaço em que o robô se encontra, possibilitando assim a visualização prévia do espaço ou para uma eventual reavaliação da operação quando necessário e a rota que foi ou será executado pelo equipamento, assegurando desta forma que a realização das atividades esperadas foi ou está sendo executada de forma correta. 

## **Sistema Embarcado**
Como pode-se ver, a arquitetura pensada para o sistema embarcado está sumariamente atrelada ao Robot Operating System, o ROS, através do qual, fundamentado-so na estrutura de Nodes, nós, de comunicação, faremos a conexão do robô com o servidor e desta forma poderemos operá-lo ou captar as informações solicitadas como padrão pelo backend. 

> *Observação: Assim como indagado pelo parceiro de negócios, o módulo de conectividade a ser utilizado ainda não está definido, cabendo ao desenvolvimento posterior definir qual tipo de conexão será utilizado para uma boa utilização da ferramenta.*


## Módulos do Sistema e Visão Geral (Big Picture)

  

## Descrição dos Subsistemas

  

### Requisitos de software

  
  

## Tecnologias Utilizadas


---

# METADESIGN.
## FATORES MERCADOLÓGICO:

---

O produto é protagonizado pelo serviço destinado para em ambientes confinados, o qual coleta dados a partir de sensores, sobretudo de gases. O produto provém da combinação de componetes tecnológicos, como o robô TurtleBot 3 - fabricado pela empresa Open Source Robotics Foudation em colaboração com ROBOTIS - para a detecção de problemas em tubulações; e um Dashborad em tempo real para visualização de filmagens desse ambiente.

Nesse sentido, o produto se orienta no mercado como uma solução inovadora e ecoeficiente (detalhes no tópico seguinte: "Sustentabilidade Ambiental"), o qual se posiciona no mesmo como uma solução de alta qualidade em custo/benefício, visto que, além da resolução do problema da coorperativa, traz segurança de trabalho para técnicos que operam nos setores dos condutos gaseficados e áreas afins, auxiliando na eficiência e produtividade desses.

Vale ressaltar também que a custo do produto é resultante do serviço gerado pelos componentes do protótipo, ou seja, a precificação é a junção total de toda produção e de todo serviço realizado pelo produto. Na produção, por exemplo, é importante destacar o investimento do time de desenvolvedores do software,  o robô selecionado para aplicação, e outros componentes eletrônicos, como o sensor de pressão atmosférica, e não eletrônicos, como a câmera para filmagem do local confinado. Já, ademais, para o serviço, o investimento precifica, por exemplo, o treinamento, se possível, de controle e automação para técnico que utilizará o robô e precifica a manutenção do robô.

---
#### **CENÁRIO DO MERCADO.**
---
O projeto está inserido no mercado de controle e automação, cujo cenário está em constante crescimento em todo o mundo. Com a crescente demanda por eficiência e produtividade, empresas de diversos setores estão investindo em soluções de automação e controle para otimizar seus processos produtivos e reduzir custos. Segundo relatório da MarketsandMarkets, a indústria global de automação e controle deve crescer de US$ 171,5 bilhões em 2019 para US$ 229,3 bilhões até 2024, com uma taxa de crescimento anual composta (CAGR) de 6,1% durante o período. Os principais fatores impulsionando esse crescimento incluem a crescente demanda por soluções de automação e controle em diversos setores, como manufatura, energia, saúde e transporte, além da evolução das tecnologias de automação e controle, como a Internet das Coisas (IoT) e a inteligência artificial. Fonte [ [1](#referências) ]

No Brasil, apesar dos avanços em robótica e automação, tecnologias destinadas para espaços confinados ainda não é muito popular, especialmente em pequenas e médias empresas. No entanto, há um aumento na demanda por soluções tecnológicas para aprimorar a segurança e eficiência das operações em ambientes confinados, e algumas empresas já estão investindo em tecnologias nesse sentido, como a Gerdau S. A. em parceria com o Instituto de Tecnologia de Liderança. Além disso, vale ressaltar que a legislação brasileira tem se tornado cada vez mais rigorosa em relação à segurança em ambientes confinados, o que pode aumentar a necessidade de soluções tecnológicas nessa área. Portanto, é possível que a tecnologia de controle e automação em espaços confinados tenha um potencial de crescimento no Brasil nos próximos anos.

---
#### **VISÃO.**
---
A visão do projeto proposto é de oferecer um serviço inovador e sustentável para a detecção de problemas em espaços confinados, aliando tecnologia avançada a uma abordagem em segurança de trabalho. O projeto busca atender às demandas do mercado atual, que valoriza cada vez mais soluções tecnológicas eficientes e que também estejam alinhadas às questões ambientais. Ademais,  projeto visa facilitar o trabalho de técnicos que operam em ambientes confinados, oferecendo segurança e praticidade na detecção de problemas e contribuindo para aumentar a eficiência e produtividade desses profissionais. Vale acentuar também que o projeto tem potencial para atender a um amplo mercado, considerando as diversas áreas que demandam a detecção de problemas em espaços confinados, como a indústria petroquímica, a mineração, a construção civil, entre outras.

---
## SISTEMA PRODUTO/DESIGN:
---
#### **MISSÃO.**
---
A missão do projeto proposto é antecipar a segurança de ambientes confinados para a locomoção humana futura, assegurando a saúde e o bem-estar das pessoas que irão transitar nesses espaços. Essa missão está alinhada à visão institucional da Gerdau, que coloca a segurança como um valor fundamental norteando as decisões cotidianas em busca da construção de um ambiente seguro em todas as suas operações.

---
#### **DESIGN.**
---

A mensagem que se deseja transmitir é sobre a importância da segurança dos colaboradores em atividades de risco, especialmente em ambientes de espaço confinado. Para alcançar esse objetivo, é crucial que o design do robô seja cuidadosamente pensado, a fim de evidenciar sua função principal de coletar dados em ambientes perigosos e contribuir para a segurança dos colaboradores. Uma forma eficaz de fazer isso é por meio de uma aparência amigável e confiável, que transmita segurança e confiança aos usuários.
Além disso, é essencial que a forma de divulgação e venda do produto esteja alinhada com a mensagem a ser transmitida, destacando seus benefícios em relação à segurança dos colaboradores e à eficiência operacional da empresa. Isso pode ser feito por meio de campanhas publicitárias e de marketing que enfatizem os diferenciais do produto, como a capacidade de coletar dados precisos em ambientes perigosos, reduzindo o risco de acidentes e melhorando a tomada de decisão em situações críticas. Dessa forma, será possível transmitir uma mensagem clara e efetiva sobre a importância da segurança no ambiente de trabalho, ao mesmo tempo em que se promove um produto de qualidade e eficiente.

---
## SUSTENTABILIDADE AMBIENTAL:
---
O serviço do projeto poderá trazer benefícios significativos em termos de ecoeficiência, ajudando a reduizr alguns impactos ambientais, melhorar a segurança e reduzir os custos, como, por exemplo:

-  **Redução de emissões de gases poluentes**: A detecção de vazamentos em tubulações de gás poderia ajudar a prevenir a emissão de gases poluentes na atmosfera. Isso reduziria a quantidade de gases de efeito estufa emitidos e ajudaria a melhorar a qualidade do ar em ambientes urbanos.
- **Redução de desperdício**: A detecção precoce de vazamentos também pode ajudar a reduzir o desperdício de gás. Em vez de desperdiçar gás em vazamentos não detectados, o gás pode ser utilizado de forma mais eficiente.
- **Melhoria da segurança**: eficiencia e melhoraria na segurança dos trabalhadores que trabalham com gás. A detecção precoce de vazamentos poderia ajudar a prevenir acidentes e a reduzir o risco de explosões, se por ventura for inflamável.
- **Redução de custos**: A detecção precoce de vazamentos também pode ajudar a reduzir os custos de manutenção, já que as tubulações podem ser reparadas mais rapidamente antes que os problemas se agravem.
- **Consumo de energia elétrica**: O robô TurtleBot 3, utilizado no projeto, é conhecido por ser eficiente em termos de energia, o que reduziria o consumo de energia elétrica em comparação com outros equipamentos utilizados para inspeção em espaços confinados. Fonte [ [2](#referências) ]
- **Algoritmo Verde**: Contribui para a ecoeficiência através do uso de tecnologias verdes e da aplicação de algoritmos eficientes que reduzem o impacto ambiental, aumentam a eficiência energética e otimizam o uso de recursos naturais, onde a utilização desse algoritmos também pode proporcionar uma redução nos custos de operação e manutenção do produto, tornando-o mais competitivo no mercado e aumentando sua viabilidade econômica.
  
## *Referências:* 
[1] *(https://www.marketsandmarkets.com/automation-control-market-research-6.html)*

[2] *Consumo de energia elétrica: (https://wiki.nps.edu/display/RC/TutleBot3+Batteries)*


---
---
## Wireframe + Storyboard

  

## Design de Interface - Guia de Estilos

  
  

# Projeto de Banco de Dados

  

## Modelo Conceitual

  

## Modelo Lógico

  
  

# Teste de Software

  

## Testes Unitários

  

## Teste de Usabilidade

  
  

# Análise de Dados

  
  

# Manuais

  

## Manual de Implantação

  

## Manual do Usuário

  

## Manual do Administrador

  
  

# Referências
