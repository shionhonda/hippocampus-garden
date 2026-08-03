import asyncio
import json
from contextlib import suppress
from pathlib import Path


INDEX_HTML = Path(__file__).with_name("index.html").read_bytes()


async def app(scope, receive, send):
    if scope["type"] == "http":
        await send(
            {
                "type": "http.response.start",
                "status": 200,
                "headers": [(b"content-type", b"text/html; charset=utf-8")],
            }
        )
        await send({"type": "http.response.body", "body": INDEX_HTML})
    elif scope["type"] == "websocket":
        await handle_websocket(receive, send)


async def handle_websocket(receive, send):
    event = await receive()
    print("<-", event["type"])

    await send({"type": "websocket.accept"})
    print("-> websocket.accept")

    generation_task = None

    try:
        while True:
            event = await receive()
            print("<-", event["type"])

            if event["type"] == "websocket.disconnect":
                break

            message = json.loads(event["text"])

            if message["type"] == "start":
                generation_task = asyncio.create_task(
                    stream_fake_response(message["prompt"], send)
                )
            elif message["type"] == "stop" and generation_task is not None:
                generation_task.cancel()
                with suppress(asyncio.CancelledError):
                    await generation_task
                generation_task = None
                await send_json(send, {"type": "stopped"})
    finally:
        if generation_task is not None and not generation_task.done():
            generation_task.cancel()
            with suppress(asyncio.CancelledError):
                await generation_task


async def stream_fake_response(prompt, send):
    response = (
        f"You asked: {prompt}. "
        "This response is generated locally, one token at a time, "
        "without calling an LLM API."
    )

    for token in response.split():
        await asyncio.sleep(0.25)
        await send_json(send, {"type": "token", "value": token + " "})
    await send_json(send, {"type": "done"})


async def send_json(send, message):
    print("->", message["type"])
    await send({"type": "websocket.send", "text": json.dumps(message)})
