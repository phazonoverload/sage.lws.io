exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        event.queryStringParameters.key == process.env.ACCESS_KEY
      )
    }
  } catch (e) {
    console.error('Error', e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}
