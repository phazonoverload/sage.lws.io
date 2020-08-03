const cloudinary = require('cloudinary')
cloudinary.config({ 
  cloud_name: process.env.cl_name, 
  api_key: process.env.cl_key, 
  api_secret: process.env.cl_secret
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
  try {
    const files = await cloudinary.v2.search
      .expression('folder:' + process.env.cl_folder_name)
      .sort_by('created_at', 'desc')
      .execute()

    return { 
      headers, 
      statusCode: 200,
      body: JSON.stringify(
        files.resources.filter(file => file.resource_type == 'image').map(file => {
          return {
            url: cloudinary.url(file.public_id+'.jpg', {
              quality: 'auto'
            }),
            thumbnail: cloudinary.image(file.public_id+'.jpg', {
              height: 400
            })
          }
        })
      )
    }
  } catch(e) {
    console.error('Error', e)
    return { headers, statusCode: 500, body: e.toString() }
  }
}
 