exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        title: process.env.SITE_TITLE,
        text: process.env.SITE_TEXT
      })
    }
  } catch (e) {
    console.error('Error', e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}
