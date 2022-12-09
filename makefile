MAKEFILE_PATH = $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR = $(dir $(MAKEFILE_PATH))

buildWebsite: 
	export REACT_APP_API_URL=$$(terraform output -raw api_url); \
	cd $(CURRENT_DIR)/green-foods; \
	npm i; \
	npm run build

buildGetProductByBarcode: 
	cd $(CURRENT_DIR)/services/getProductByBarcode; \
	npm i; \
	npm run build

build: buildGetProductByBarcode

apply: 
	terraform init; \
	terraform apply -var="environment=dev" --auto-approve	

upload:
	aws s3 cp $(CURRENT_DIR)/green-foods/build s3://dev-green-foods-public-bucket/ --recursive

deploy: build apply buildWebsite upload
