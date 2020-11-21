exports.handler = async event => {
  try {
    const { password } = JSON.parse(event.body)
    return res({ validated: password == process.env.SITE_PASSWORD })
  } catch (error) {
    return res({ error }, 500)
  }
}

function res(o, statusCode = 200) {
  return { statusCode, body: JSON.stringify(o) }
}
