# Esse arquivo é um teste de implementação de algoritmos de otimização de rotas

# Importando bibliotecas
import numpy as np
import networkx as nx 
import matplotlib.pyplot as plt
import random
import math

# Criando grafos simples e explicando sua estrutura
G = nx.DiGraph()

edge_lists = [(1,2),(2,3),(9,10), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9)]

G.add_nodes_from([1,2,3,4,5,6,7,8,9,10])
G.add_edges_from(edge_lists)

nx.drawing(G, with_labels=True)
plt.show()
