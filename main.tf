terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 4.16"
      }
    }

    backend "s3" {
      bucket = "patrycja-green-foods-tf-states"
      key = "patrycja-green-foods-tf-states"
      region = "eu-west-2"
    }

    required_version = ">= 1.2.0"
}

provider "aws" {
    region = "eu-west-2"
}
