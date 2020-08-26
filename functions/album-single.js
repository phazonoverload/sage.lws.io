const B2 = require('backblaze-b2')

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY
})

exports.handler = async (event, context) => {
  try {
    const { bucketId, prefix } = event.queryStringParameters
    await b2.authorize()
    const { data: listing } = await b2.listFileNames({
      bucketId,
      prefix,
      maxFileCount: 10000
    })
    const files = listing.files
      .map(photo => {
        return {
          ...photo,
          link: `https://${process.env.B2_BUCKET_NAME}.${
            process.env.B2_BUCKET_ENDPOINT
          }/${photo.fileName.split(' ').join('+')}`
        }
      })
      .sort((a, b) => (a.uploadTimestamp > b.uploadTimestamp ? -1 : 1))
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
