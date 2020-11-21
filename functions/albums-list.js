const B2 = require('backblaze-b2')

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY
})

exports.handler = async (event, context) => {
  try {
    if(event.queryStringParameters.password != process.env.SITE_PASSWORD) {
      throw 'Password invalid'
    }
    await b2.authorize()
    const { data: listing } = await b2.listFileNames({
      bucketId: process.env.B2_BUCKET_ID,
      maxFileCount: 10000,
      delimiter: '/',
      prefix: ''
    })
    const files = listing.files
      .map(item => {
        return {
          ...item,
          link: `/album?bucketId=${item.bucketId}&prefix=${item.fileName}`
        }
      })
      .sort((a, b) => (a.fileName > b.fileName ? -1 : 1))
    return {
      statusCode: 200,
      body: JSON.stringify(files)
    }
  } catch (e) {
    console.error('Error', e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}
