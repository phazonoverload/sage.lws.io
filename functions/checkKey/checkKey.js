require('dotenv').config()
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
  try {
  } catch(e) {
    console.error('Error', e)
    return { headers, statusCode: 500, body: e.toString() }
  }
}
 