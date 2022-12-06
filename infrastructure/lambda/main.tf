resource "aws_s3_bucket" "lambda" {
  bucket = "${var.environment}-green-foods-lambda"
}

resource "aws_s3_bucket_acl" "lambda" {
  bucket = aws_s3_bucket.lambda.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "lambda" {
  bucket = aws_s3_bucket.lambda.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "archive_file" "lambda" {
  type = "zip"
  source_dir = "${path.root}/services/getProductByBarcode/dist"
  output_path = "${path.root}/build/getProductByBarcode"
}

resource "aws_s3_object" "lambda" {
   bucket = aws_s3_bucket.lambda.id
   key = "getProductByBarcode.zip"
   source = data.archive_file.lambda.output_path
   etag = filemd5(data.archive_file.lambda.output_path)
}