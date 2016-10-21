echo "Docker-compose up"
docker-compose up -d

echo "Sleeping for 10 seconds"
sleep 10

echo "Running tests"
mocha

echo "Removing docker containers and images"
for i in `docker ps -a | grep soul-compose | awk '{print $1}'`; do docker rm -f $(docker stop $i) || true; done
for i in `docker ps -a | grep mongo | awk '{print $1}'`; do docker rm -f $(docker stop $i) || true; done
for i in `docker images| grep soul-compose | awk '{print $3}'`; do docker rmi -f $i || true; done