import cv2 as cv
import numpy as np
import os
import sys
from datetime import datetime

new_file = sys.argv[1];

cur_path = os.path.dirname(__file__)
new_path = os.path.join(cur_path, r'..\app\imagens\\' + new_file )

DIV = 18
AVAILABLE_NODE = [190,150,100] # RGB COLOR FOR AVAILABLE SPACES
MAX_DIFF = [60, 100, 40]

def calculate_color_percentage(image, frame_pixels):

    # Define the color range for the target color in HSV
    lower_color = np.array([AVAILABLE_NODE[2] - MAX_DIFF[2], AVAILABLE_NODE[1] - MAX_DIFF[1], AVAILABLE_NODE[0] - MAX_DIFF[0]])
    upper_color = np.array([AVAILABLE_NODE[2] + MAX_DIFF[2], AVAILABLE_NODE[1] + MAX_DIFF[1], AVAILABLE_NODE[0] + MAX_DIFF[0]])

    # Create a mask for pixels within the color range
    mask = cv.inRange(image, lower_color, upper_color)

    # Count the number of pixels that match the target color
    color_pixels = cv.countNonZero(mask)

    # Calculate the percentage of color pixels
    percentage = (color_pixels / frame_pixels) * 100

    return percentage

img = cv.imread(new_path)

# Creating a map and initializes it with 0

Map = []

for i in range(DIV):
    row = []
    for column in range(DIV):
        row.append(0)
    Map.append(row)

# Redimensioning the map

width = int(img.shape[1] * 0.5)
height = int(img.shape[0] * 0.5)
dimensions = (width, height)

# Defines the size of the node that will be analyzed

frame_size = int(((width/DIV) - 10) * ((height/DIV) - 10))

resize = cv.resize(img, dimensions, interpolation=cv.INTER_AREA)

final_mask = np.zeros(resize.shape[:2], dtype='uint8')

# Dividing the resized image

for i in range(DIV):

    for j in range(DIV):

        # Creates a blank space and then draws a rectangle on it that represents the current node
        temporary_mask = np.zeros(resize.shape[:2], dtype='uint8')

        cv.rectangle(final_mask, (int((width/DIV)*i) + 5, int((height/DIV)*j) + 5), (int((width/DIV)*(i+1)) - 5, int((height/DIV)*(j+1)) - 5), (255,255,255), -1)

        cv.rectangle(temporary_mask, (int((width/DIV)*i) + 5, int((height/DIV)*j) + 5), (int((width/DIV)*(i+1)) - 5, int((height/DIV)*(j+1)) - 5), (255,255,255), -1)

        # Actually creates a image for that node by applying the mask

        node_img = cv.bitwise_and(resize, resize, mask=temporary_mask)

        # Calculate the precentage of color for that node

        percentage = calculate_color_percentage(node_img, frame_size)

        # Decides wether the node is available or not

        if(percentage > 70):
            Map[i][j] = 1
            cv.putText(resize, f'{Map[i][j]}', (int((width/DIV)*i), int((height/DIV)*(j+1))), cv.FONT_HERSHEY_TRIPLEX, 1.0, (255,255,255), thickness=2)


masked_map = cv.bitwise_and(resize, resize, mask=final_mask)

# cv.imshow('Map div', masked_map)
filepath = os.path.join(cur_path, '..', 'app', 'imagens', 'mapa-' + datetime.now().strftime(r"%d-%m-%Y-%H%M%S") + '.jpg')
filename = filepath.split('\\')[-1]
print(filename, end='')
cv.imwrite(filepath, masked_map)

# for row in range(DIV):
#     for column in range(DIV):
#         print(Map[column][row], end=' ')
#     print('')

Map = np.array(Map)

np.savetxt('map.txt', Map, fmt='%d')

cv.waitKey(0)
cv.destroyAllWindows()