module.exports = async ({ page, context }) => {
  let videoUrl = null;

  page.on('request', request => {
    const url = request.url();
    if (url.endsWith('.mp4') || url.includes('.m3u8')) {
      videoUrl = url;
    }
  });

  await page.goto(context.url, { waitUntil: 'networkidle2' });

  try {
    await page.click('video');
  } catch (err) {
    console.log("Could not click video:", err.message);
  }

  await page.waitForTimeout(5000);

  return { videoUrl };
};
