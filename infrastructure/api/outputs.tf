output "api_url" {
  value = aws_apigatewayv2_api.lambda.api_endpoint
}

output "api_id" {
  value = aws_apigatewayv2_api.lambda.id
}

output "api_execution_arn" {
  value = aws_apigatewayv2_api.lambda.execution_arn
}