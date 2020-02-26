require("prismjs/themes/prism-okaidia.css")

exports.onRouteUpdate = () => {
    if (window.MathJax !== undefined) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
  }
}