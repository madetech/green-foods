MAKEFILE_PATH = $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR = $(dir $(MAKEFILE_PATH))

build: 
	cd $(CURRENT_DIR)/green-foods; npm run build

apply: 
	terraform init; terraform apply -var="environment=dev" --auto-approve	

upload:
	aws s3 cp $(CURRENT_DIR)/green-foods/build s3://dev-green-foods-public-bucket/ --recursive

deploy: build apply upload
