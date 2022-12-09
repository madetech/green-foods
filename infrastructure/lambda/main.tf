data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.root}/services/${var.lambda_name}/dist"
  output_path = "${path.root}/build/${var.lambda_name}"
}

resource "aws_s3_object" "lambda" {
  bucket = var.bucket_id
  key    = "${var.lambda_name}.zip"
  source = data.archive_file.lambda.output_path
  etag   = filemd5(data.archive_file.lambda.output_path)
}

resource "aws_iam_role" "lambda" {
  name = "${var.environment}-green-foods-${var.lambda_name}-role"
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
  function_name    = "${var.environment}-green-foods-${var.lambda_name}"
  s3_bucket        = var.bucket_id
  s3_key           = aws_s3_object.lambda.key
  runtime          = "nodejs18.x"
  handler          = "handler.run"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  role             = aws_iam_role.lambda.arn
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id             = var.api_id
  integration_uri    = aws_lambda_function.get_product_by_barcode.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "lambda" {
  api_id    = var.api_id
  route_key = var.lambda_path
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_lambda_permission" "lambda" {
  statement_id  = "${var.environment}-green-foods-${var.lambda_name}-execution"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_product_by_barcode.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}