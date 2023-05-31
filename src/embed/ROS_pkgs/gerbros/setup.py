from setuptools import setup
import os
from glob import glob

package_name = 'gerbros'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*launch.[pxy][yma]*')))

    ],
    install_requires=['setuptools', 'glob', 'os'],
    zip_safe=True,
    maintainer='paulo',
    maintainer_email='paulo.evangelista@sou.inteli.edu.br',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            
            "server = gerbros.server:main",
            "simulation = gerbros.simulation:main"
        ],
    },
)
