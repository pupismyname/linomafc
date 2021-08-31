const less = require('less');

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/less/");

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
