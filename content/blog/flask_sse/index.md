---
title: "Simulating Real-Time Chats using Flask's Server-Sent Events"
date: "2023-11-06T22:01:03.284Z"
description: "Discover the power of Flask's Server-Sent Events for better developer's experience of chatbots"
featuredImage: flask_sse/ogp.jpg
tags: ["en", "python", "web"]
---

With the increasing adoption of OpenAI's GPT API and similar LLM APIs, chatbots have become a hot topic in the technology world. In chatbot-powered apps, the response from the GPT is often streamed to allow real-time conversation, which is enabled by  [**server-sent events**](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) (**SSE**).

This is cool, but here's the thing: when you develop your app with these APIs, it can get expensive, tricky with rate limits, and complex. So you may want to mock them during in the development environment. In this short blog post, I present a minimal implementation of a Flask server to simulate OpenAI's stream API.

Here is a demo using my mocked API.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ny-QncybvNk?si=6OwOn0KyaVperz6M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

I tested my code in the settings below:

- python = "3.11"
- Flask = "3.0.0"
- flask-cors = "4.0.0"

## Server Side Code

The minimal server side code can be written in just 20 lines.

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

It first defines a generator that simulates a chatbot sending two tokens per second. Then the SSE route `/stream` streams these messages to clients in the `text/event-stream` format.

That's pretty much it, but I'd like to add three points here:

- In the `generate` function, the prefix "data: " and the suffix "\n\n" are important. If they are misformatted, the client side may not receive the data correctly
- The stream terminates by a "data: [DONE]\n\n" messsage, imitating the [OpenAI API's behavior](https://platform.openai.com/docs/api-reference/chat/create)
- `flask_cors.CORS(app)` is required when you want to call the endpoint from browsers

You can run this server at port 8001 by something like `python server.py`

## Client side

You can call the above endpoint simply by `curl http://localhost:8001`, but let's step a little further using JavaScript. Using a EventSource pattern, you can create an SSE-triggered logic to update the DOM.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="msg-box"></div>
    <script>
      var source = new EventSource("http://localhost:8001/stream")
      source.onopen = (e) => console.log("Connection opened")
      source.onerror = (e) => console.log("Error:", event)
      source.onmessage = (e) => {
        if (event.data !== "[DONE]") {
          document.getElementById("msg-box").innerHTML += " " + event.data
        } else {
          console.log("Connection closed")
          source.close()
        }
      }
    </script>
  </body>
</html>
```

When you open this file with a browser, you should see the streamed text. Happy coding!

## References

[1] [API Reference - OpenAI API](https://platform.openai.com/docs/api-reference/chat/create)  
[2] [Using server-sent events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)  
[3] [javascript - EventSource.onmessage is not firing even though Flask server push seems to work - Stack Overflow](https://stackoverflow.com/questions/56077192/eventsource-onmessage-is-not-firing-even-though-flask-server-push-seems-to-work)  
[4] [Server-sent events in Flask without extra dependencies • Max Halford](https://maxhalford.github.io/blog/flask-sse-no-deps/)  
[5] [How to stream completions | OpenAI Cookbook](https://cookbook.openai.com/examples/how_to_stream_completions)  