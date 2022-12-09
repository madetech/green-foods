resource "aws_apigatewayv2_api" "lambda" {
  name          = "${var.environment}-green-foods"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id      = aws_apigatewayv2_api.lambda.id
  name        = "v1"
  auto_deploy = true
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"
  retention_in_days = 30
}