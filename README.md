# sage.lws.io

## Set Up

1. Create a Backblaze B2 account
1. In your settings, navigate to B2 Cloud Storage -> App Keys and generate a new key. Take note of your key ID and application key.
1. Naviate to B2 Cloud Storate -> Buckets and create a new public bucket. Take note of the bucket's name, ID, and endpoint.
1. Click on the button below and fill in the information requested.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/phazonoverload/sage.lws.io">
  <img src="https://www.netlify.com/img/deploy/button.svg">
</a>

## File Structure

Directly inside of your bucket, you should only have folders. Each folder should contain only images.

## Security Considerations

The bucket is public, which means anyone with the direct file URLs can access your photos. Realistically this is unlikely to be the case, but still worth considering.
