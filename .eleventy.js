const less = require('less');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/images': '/images',
    'src/fonts': '/fonts',
  });

  eleventyConfig.addWatchTarget("./src/less/");
  eleventyConfig.addWatchTarget("./src/images/");
  eleventyConfig.addWatchTarget("./src/fonts/");

  // build less - see `src/content/_less.liquid`
  eleventyConfig.addTransform('less', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await less.render(content).then(result => result.css);
    }
    return content;
  });

  return {
    dir: {
      input: 'src/pages'
    }
  };
};
