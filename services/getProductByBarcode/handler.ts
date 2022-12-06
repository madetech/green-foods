import {APIGatewayProxyResult, APIGatewayProxyEventV2} from "aws-lambda"

export const run = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    const name: String = event.pathParameters?.name || "world"
    return {statusCode: 200, body: `hello ${name}`}
}