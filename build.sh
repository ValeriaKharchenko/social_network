# !/bin/bash

docker build . --file=Dockerfile --tag=social_network_ui
docker run -p 8181:80 social_network_ui
