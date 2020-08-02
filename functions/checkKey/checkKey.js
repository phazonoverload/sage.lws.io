const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
  try {
    const matches = event.queryStringParameters.key == process.env.upload_key
    const payload = { matches }
    if(matches) {
      payload.cloudName = process.env.cl_name,
      payload.uploadPreset = process.env.cl_ul_preset
    }
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(payload)
    }
  } catch(e) {
    console.error('Error', e)
    return { headers, statusCode: 500, body: e.toString() }
  }
}
 