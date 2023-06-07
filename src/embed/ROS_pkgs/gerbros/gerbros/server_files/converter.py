class Converter: 
    @staticmethod
    def convert_maze(maze):
        # Convert a string para uma lista bidimensional (matriz)
        maze = maze[1:-1]
        maze = maze.split('],[')
        maze = [list(map(int, maze.split(','))) for maze in maze]
        return maze

    @staticmethod
    def convert_points(points):
        # Converta a string para uma lista de tuplas
        points = [tuple(map(int, point.split(','))) for point in points.split(';')]
        return points

    @staticmethod
    def convert_origin(origin):
        # Converte a string para uma tupla
        origin = tuple(map(int, origin.split(',')))
        return origin
    