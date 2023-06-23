import os
import sys
import numpy as np

def moving_average(a, n=3) :
    ret = np.cumsum(a, dtype=float)
    ret[n:] = ret[n:] - ret[:-n]
    return ret[n - 1:] / n
    

values = np.load('values.npy') if os.path.exists('values.npy') else np.array([])

new_value = sys.argv[1]

values = np.append(values, new_value)

np.save('values.npy', values)

print(moving_average(values, 3)[-1])