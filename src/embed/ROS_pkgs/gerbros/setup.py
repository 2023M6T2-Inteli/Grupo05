from setuptools import setup, find_packages
import os
from glob import glob

package_name = 'gerbros'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*launch.[pxy][yma]*')))

    ],
    install_requires=['setuptools', 'glob', 'os'],
    zip_safe=True,
    maintainer='Gerbros',
    maintainer_email='paulo.evangelista@sou.inteli.edu.br',
    description='Projeto de AGV para a Gerdau',
    license='The Unlicense',
    entry_points={
        'console_scripts': [
            "server = gerbros.server:main",
            "simulation = gerbros.simulation:main",
        ],
    },
)
