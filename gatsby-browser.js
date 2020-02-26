require("prismjs/themes/prism-solarizedlight.css")

exports.onRouteUpdate = () => {
    if (window.MathJax !== undefined) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
  }
}