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

resource "aws_iam_role" "lambda" {
  name = "${var.environment}-green-foods-getProductByBarcode-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda" {
  role = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "get_product_by_barcode" {
  function_name = "${var.environment}-green-foods-getProductByBarcode"
  s3_bucket = aws_s3_bucket.lambda.id
  s3_key = aws_s3_object.lambda.key
  runtime = "nodejs18.x"
  handler = "handler.run"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  role = aws_iam_role.lambda.arn
}