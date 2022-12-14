terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket = "green-foods-tf-state"
    key    = "green-foods-tf-state"
    region = "eu-west-1"
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-west-1"
}

variable "environment" {
  type    = string
  default = "dev"
}

module "website" {
  source      = "./infrastructure/website"
  environment = var.environment
}

module "lambda_bucket" {
  source      = "./infrastructure/storage"
  environment = var.environment
  bucket_name = "green-foods-lambda"
}

module "api_gw" {
  source      = "./infrastructure/api"
  environment = var.environment
}

module "getProductByBarcodeLambda" {
  source            = "./infrastructure/lambda"
  environment       = var.environment
  bucket_id         = module.lambda_bucket.bucket_id
  api_id            = module.api_gw.api_id
  api_execution_arn = module.api_gw.api_execution_arn
  lambda_name       = "getProductByBarcode"
  lambda_path       = "GET /products/{barcode}"
}

output "website_url" {
  value = module.website.website_url
}

output "api_url" {
  value = module.api_gw.api_url
}
