resource "aws_s3_bucket" "www_bucket" {
  bucket = "green-foods-public-bucket"
  acl = "public-read"

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }

  website {
    index_document = "index.html"
  }
}