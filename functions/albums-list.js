const B2 = require('backblaze-b2')

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY
})

exports.handler = async (event, context) => {
  try {
    await b2.authorize()
    const { data: bucketList } = await b2.getBucket({
      bucketName: process.env.B2_BUCKET_NAME
    })
    const { data: listing } = await b2.listFileNames({
      bucketId: bucketList.buckets[0].bucketId,
      maxFileCount: 10000,
      delimiter: '/',
      prefix: ''
    })
    const files = listing.files.map(item => {
      return {
        ...item,
        link: `/album?bucketId=${item.bucketId}&prefix=${item.fileName}`
      }
    })
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
