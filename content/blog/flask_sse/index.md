---
title: "Server-Sent Events with Flask"
date: "2023-11-01T22:01:03.284Z"
description: ""
featuredImage: flask_sse/ogp.jpg
tags: ["en", "python", "web"]
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ny-QncybvNk?si=6OwOn0KyaVperz6M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

- python = "^3.11"
- Flask = "^3.0.0"
- flask-cors = "^4.0.0"

## Server side

```python
import flask
import flask_cors
import time

app = flask.Flask(__name__)
flask_cors.CORS(app)

def generate():
    tokens = "Hello, this is a mocked chatbot. How can I help you?".split(" ")
    for token in tokens:
        time.sleep(0.5)
        yield f"data: {token}\n\n"
    yield "data: [DONE]\n\n"

@app.route('/stream')
def stream():
    return flask.Response(generate(), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run(port=8001)
```

## Client side

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="msg-box"></div>
    <script>
        var source = new EventSource('http://localhost:8001/stream');
        source.onopen = e => console.log('Connection opened');
        source.onerror = e => console.log('Error:', event);
        source.onmessage = e => {
            if (event.data !=="[DONE]"){
                document.getElementById('msg-box').innerHTML += " " + event.data;
            }else{
                console.log("Connection closed");
                source.close()
            }
        };
    </script>
  </body>
</html>
```

## References
