# Pacotes ROS

- `interfaces`: Pacote C++ que contém as interfaces (tipagens das mensagens e serviços) ROS
- `gerbros`: Pacote Python que contém todos os nós ROS

### Instalando o pacote:
Na pasta ROS_pkgs, execute `colcon build --packages-up-to gerbros interfaces --symlink-install` para buildar os pacotes
instale-os com `source install/setup.sh` (`setup.zsh` caso use ZSH)

### rodando os pacotes
Para executar todos os nós ROS, rode `ros2 launch gerbros launch.xml`

> Para deixar o terminal do ROS mais legível, execute: `export RCUTILS_CONSOLE_OUTPUT_FORMAT="[{severity} | {name}]>  {message}"`