import {Handler} from '@netlify/functions';
import {toJson} from '@kawkab-oss/fatoora-parser';

export const handler: Handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
  let response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify('fatoora')
  };
  try {
    console.log(body.base64)

    const fatoora = toJson(body.base64);
    response = {
      headers: headers,
      statusCode: 200,
      body: JSON.stringify(fatoora),
    };
  } catch (e) {
    response = {
      statusCode: 400,
      headers: headers,
      body: e.message
    };
  }
  return response;
};
