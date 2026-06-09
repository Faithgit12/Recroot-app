const Jimp = require('jimp');

async function cropLogo() {
  const image = await Jimp.read('assets/images/splash/logo.png');
  image.autocrop();
  await image.writeAsync('assets/images/splash/logo.png');
  console.log('Logo cropped successfully!');
}

cropLogo().catch(console.error);
