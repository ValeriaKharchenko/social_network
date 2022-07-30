# !/bin/bash

docker build . --file=Dockerfile --tag=social_network_ui
START  "http://localhost:8181"
docker run -p 8181:80 social_network_ui
