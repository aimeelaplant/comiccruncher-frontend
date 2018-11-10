WEB_SERVER = dockeruser@68.183.126.115

CC_AWS_BUCKET = appearances-us-east-1

NEXT_STATIC_DIR = _next/static

DOCKER_RUN_AWSCLI = docker run --rm \
	-e "AWS_ACCESS_KEY_ID=${CC_AWS_ACCESS_KEY_ID}" \
	-e "AWS_SECRET_ACCESS_KEY=${CC_AWS_SECRET_ACCESS_KEY}" \
	-e "AWS_DEFAULT_REGION=us-east-1" \
	-v "$$(pwd):/project" \
	mesosphere/aws-cli	

DOCKER_COMPOSE_DEPLOYMENT = docker-compose -f ./deploy/uploads/docker-compose.deploy.yml

DOCKER_COMPOSE_DEV = docker-compose -f docker-compose.yml

DEPLOY_COMMAND = ${DOCKER_COMPOSE_DEPLOYMENT} up \
	-d \
	--build \
	--remove-orphans

PM2_IMAGE = comiccruncher/frontend:test

# Installs the S3 image.
docker-pull-awscli:
	docker pull mesosphere/aws-cli

# Uploads static assets to S3.
docker-upload-static:
	${DOCKER_RUN_AWSCLI} s3 cp ./static s3://${CC_AWS_BUCKET}/static --recursive

# Uploads the NextJS build to S3.
docker-upload-next-build:
	${DOCKER_RUN_AWSCLI} s3 cp ./.next/static/$(shell cat ./.next/BUILD_ID) s3://$${CC_AWS_BUCKET}/${NEXT_STATIC_DIR}/$(shell cat ./.next/BUILD_ID) \
		--recursive \
		--content-type "application/json" \
		--cache-control "public, max-age=86400"

# Uploads the NextJS static chunks to S3.
docker-upload-next-chunks:
	${DOCKER_RUN_AWSCLI} s3 cp ./.next/static/chunks s3://$${CC_AWS_BUCKET}/${NEXT_STATIC_DIR}/chunks \
		--recursive \
		--content-type "application/json"

# Uploads the NextJS static runtime to S3.
docker-upload-next-runtime:
	${DOCKER_RUN_AWSCLI} s3 cp ./.next/static/runtime s3://$${CC_AWS_BUCKET}/${NEXT_STATIC_DIR}/runtime \
		--recursive \
		--content-type "application/json"

# Uploads all the static assets to S3.
docker-upload-s3: docker-pull-awscli docker-upload-static docker-upload-next-build docker-upload-next-chunks docker-upload-next-runtime

yarn-build:
	yarn build

# Builds the Docker image for PM2.
# Make sure to build the yarn build first..
docker-build-pm2:
	docker build -t ${PM2_IMAGE} -f deploy/Dockerfile .

docker-push-pm2:
	docker push ${PM2_IMAGE}

docker-pull-pm2:
	docker pull ${PM2_IMAGE}

docker-compose-deploy:
	${DEPLOY_COMMAND}

docker-compose-deploy-stop:
	${DOCKER_COMPOSE_DEPLOYMENT} stop

docker-compose-deploy-rm:
	${DOCKER_COMPOSE_DEPLOYMENT} rm

remote-upload-deployments:
	scp -r ./deploy/uploads ${WEB_SERVER}:~/deploy

remote-deploy:
	ssh ${WEB_SERVER} "docker pull ${PM2_IMAGE} && ${DEPLOY_COMMAND}"

# Run docker-compose on the development version.
# Make sure to run `yarn build` to build the production files.
# This is for testing the production build on development.
# If you want to run the NextJS app on dev, then run `yarn dev`.
docker-compose-deploy-dev:
	${DOCKER_COMPOSE_DEV} up --build --force-recreate

docker-compose-deploy-dev-stop:
	${DOCKER_COMPOSE_DEV} stop


docker-compose-deploy-dev-rm:
	${DOCKER_COMPOSE_DEV} stop
