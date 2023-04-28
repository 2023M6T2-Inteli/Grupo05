<table>
<tr>
<td>
<a href= "https://www2.gerdau.com.br/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Gerdau_logo_%282011%29.svg/1200px-Gerdau_logo_%282011%29.svg.png" alt="Gerdau" border="0" width="70%"></a>
</td>
<td><a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width="30%"></a>
</td>
</tr>
</table>

<font size="+12"><center>

</center></font>

# Matriz de Oceano Azul

Para realizar a matriz de oceano azul, forma identificados os pontos que a empresa pretende Eliminar, Reduzir, Criar e Elevar. 

<p  align="center">

<img  src="docs\img\Matriz de Oceano azul.jpg"  alt="Matriz-oceano-azul">

</p>

## **Eliminar**
Para elencar os pontos que a empresa gostaria de eliminar, utilizou-se as dores elencadas pelo cliente, referentes a como a operação em espaços confinados é realizada atualmente. A medição imprecisa das condições atmosféricas dos ambientes foi um dos principais pontos que a empresa pretende reduzir ao aplicar a solução que foi acordado para desenvolvimento, embora seja impossível eliminar este tipo de ocorrência, a solução do grupo Ger_bROS pretende mitigar este risco, corroborando com a política "Acidente Zero" que a companhia já emprega atualmente, através da medição em tempo real dos fatores do ambiente. Além disso, através do equipamento elaborado, é possível mitigar o risco ocupacional de permanência dos colaboradores da empresa ao passo de que é permitido ao usuário a visualização em tempo real das imagens de dentro do espaço, o que previne acidentes como o caso de um funcionário desmaiar dentro da instalações em que a manutenção ou vistoria é realizada.

## **Reduzir**
Os pontos de redução elencados na matriz supramencionada estão correlacionados a diminuição de eventualidades referentes às operações em espaços confinados. De forma primária, ainda que, dada a filosofia da empresa de importar-se com a segurança e bem-estar de seus colaboradores, elencou-se o quesito de atenuação de gastos com eventuais acidentes, uma vez que após sofrer algum tipo de lesão no trabalho, os funcionários recebem amparo da empresa conforme assegura a lei. Outrossim, uma das peças chaves da solução é melhorarar a efetividade de manutenções preventivas nos espaços confinados, dado que, uma vez que o equipamento estiver implantado, será possível diminuir o intervalo entre as manutenções pois não é necessário que um técnico adentre as instalações de maior risco para fazer a vistoria do espaço e averiguar problemas, a câmera pensada para a solução assume esse papel e é capaz de registrar possíveis falhas. Em outro aspecto, é possível reduzir a necessidade de alocação de mão de obra para a função de medição das condições dos espaços confinados e desta forma pode-se empregar funcionários em outras atividades, aumentando a produtividade. 

## **Criar**
Para a realização das tarefas acima elencadas, a Gerdau pretende criar, ou que se crie neste caso, um veículo guiado automatizado de modo que seja possível fazer a visualização dos espaços confinados sem a necessidade da ação humana. Para que seja possível auferir as medições, será criado um software que possa ler dados de sensores e decidir o curso de ação para as tarefas que julgarem cabíveis. Outrossim, dashboard será criado, com os dados coletados, e será distribuído para os técnicos resposáveis de modo que eles possam visualizá-los facilmente em um dashboard, trazendo mais segurança para a equipe de forma geral e permitindo um registro histórico das operações que foram realizadas e em quais condições ocorreram. 

## **Elevar**
Para o quesito elevar, seguindo as boas práticas de segurança que a empresa tem e se baseando em sua cultura da segurança no trabalho, a solução até então proposta eleva a qualidade da segurança para os colaboradores, ao ponto de que permite conhecimento mais preciso das condições em que eles irão realizar suas tarefas no cotidiano e, por outra ótica, permite também a promover um plano de melhor capicatação para os funcionários, pensando na modernização industrial que ocorre atualmente e a política de inovação da empresa, nada mais necessário do que ter colaboradores que consigam manter-se atualizados no mercado de trabalho que cada vez mais migra para soluções automatizadas.

## **Avaliação de valor** 
Seguindo a ideia da matriz de oceano azul, foi feita uma avaliação de valor da solução em comparação com outras já disponíves no mercado e pode-se depreender, em certo aspecto, como a solução da equipe Ger_bROS se destaca quando comparada as soluções generalistas que não lidam com alguns dos problemas da indústria de siderurgia e metalurgia como um todo. 

<p  align="center">

<img  src="docs\img\Matriz de Avaliação de Valor.jpg"  alt="Avaliacao-de-valor">

</p>

> *Observação: A escala do gráfico refere-se ao quanto uma solução prioriza mais ou menos certo aspecto que foi elencado no eixo "x"*.

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

