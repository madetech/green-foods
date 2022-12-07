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
  type        = "zip"
  source_dir  = "${path.root}/services/getProductByBarcode/dist"
  output_path = "${path.root}/build/getProductByBarcode"
}

resource "aws_s3_object" "lambda" {
  bucket = aws_s3_bucket.lambda.id
  key    = "getProductByBarcode.zip"
  source = data.archive_file.lambda.output_path
  etag   = filemd5(data.archive_file.lambda.output_path)
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
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "get_product_by_barcode" {
  function_name    = "${var.environment}-green-foods-getProductByBarcode"
  s3_bucket        = aws_s3_bucket.lambda.id
  s3_key           = aws_s3_object.lambda.key
  runtime          = "nodejs18.x"
  handler          = "handler.run"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  role             = aws_iam_role.lambda.arn
}

resource "aws_apigatewayv2_api" "lambda" {
  name          = "${var.environment}-green-foods"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id      = aws_apigatewayv2_api.lambda.id
  name        = "v1"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_product_by_barcode.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "lambda" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /product/{barcode}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"
  retention_in_days = 30
}

resource "aws_lambda_permission" "lambda" {
  statement_id  = "${var.environment}-green-foods-api-gateway-lambda-execution"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_product_by_barcode.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}