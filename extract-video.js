module.exports = async ({ page, context }) => {
  const requests = [];

  page.on('request', request => {
    const url = request.url();
    requests.push(url);
    if (url.endsWith('.mp4') || url.includes('.m3u8')) {
      console.log('🎯 Found video URL:', url);
    }
  });

  await page.goto(context.url, { waitUntil: 'networkidle2' });

  try {
    await page.click('video');
  } catch (err) {
    console.log('⚠️ Could not click video:', err.message);
  }

  await page.waitForTimeout(10000);

  return { requests };
};
