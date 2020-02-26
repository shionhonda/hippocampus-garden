require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
    if (window.MathJax !== undefined) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
  }
}