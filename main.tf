terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 4.16"
      }
    }

    backend "s3" {
      bucket = "green-foods-tf-state"
      key = "green-foods-tf-state"
      region = "eu-west-1"
    }

    required_version = ">= 1.2.0"
}

provider "aws" {
    region = "eu-west-1"
}

module "website" {
  source = "./infrastructure/website"
}