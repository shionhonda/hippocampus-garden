from __future__ import annotations

import asyncio
import json
from contextlib import suppress
from pathlib import Path
from typing import Any, Awaitable, Callable


INDEX_HTML = Path(__file__).with_name("index.html").read_bytes()

Receive = Callable[[], Awaitable[dict[str, Any]]]
Send = Callable[[dict[str, Any]], Awaitable[None]]


async def app(scope: dict[str, Any], receive: Receive, send: Send) -> None:
    """A framework-free ASGI application for HTTP, WebSocket, and lifespan."""
    if scope["type"] == "lifespan":
        await handle_lifespan(receive, send)
    elif scope["type"] == "http":
        await handle_http(scope, send)
    elif scope["type"] == "websocket":
        await handle_websocket(scope, receive, send)
    else:
        raise ValueError(f"Unsupported scope type: {scope['type']}")


async def handle_lifespan(receive: Receive, send: Send) -> None:
    while True:
        event = await receive()
        if event["type"] == "lifespan.startup":
            await send({"type": "lifespan.startup.complete"})
        elif event["type"] == "lifespan.shutdown":
            await send({"type": "lifespan.shutdown.complete"})
            return


async def handle_http(scope: dict[str, Any], send: Send) -> None:
    if scope["method"] == "GET" and scope["path"] == "/":
        status = 200
        body = INDEX_HTML
        content_type = b"text/html; charset=utf-8"
    else:
        status = 404
        body = b"Not found"
        content_type = b"text/plain; charset=utf-8"

    await send(
        {
            "type": "http.response.start",
            "status": status,
            "headers": [
                (b"content-type", content_type),
                (b"content-length", str(len(body)).encode()),
            ],
        }
    )
    await send({"type": "http.response.body", "body": body})


async def handle_websocket(
    scope: dict[str, Any], receive: Receive, send: Send
) -> None:
    event = await receive()
    print("<-", event["type"])
    if event["type"] != "websocket.connect":
        return

    if scope["path"] != "/ws":
        await send({"type": "websocket.close", "code": 1008})
        return

    await send({"type": "websocket.accept"})
    print("-> websocket.accept")

    generation_task: asyncio.Task[None] | None = None

    try:
        while True:
            event = await receive()
            print("<-", event["type"])

            if event["type"] == "websocket.disconnect":
                break

            if event["type"] != "websocket.receive" or "text" not in event:
                continue

            try:
                message = json.loads(event["text"])
            except json.JSONDecodeError:
                await send_json(send, {"type": "error", "message": "Invalid JSON"})
                continue

            if message.get("type") == "start":
                prompt = str(message.get("prompt", "")).strip()
                if not prompt:
                    await send_json(
                        send, {"type": "error", "message": "Prompt is empty"}
                    )
                elif generation_task is not None and not generation_task.done():
                    await send_json(
                        send,
                        {"type": "error", "message": "Generation already running"},
                    )
                else:
                    generation_task = asyncio.create_task(
                        stream_fake_response(prompt, send)
                    )

            elif message.get("type") == "stop":
                if generation_task is not None and not generation_task.done():
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


async def stream_fake_response(prompt: str, send: Send) -> None:
    response = (
        f"You asked: {prompt}. "
        "This response is generated locally, one token at a time, "
        "without calling an LLM API."
    )

    try:
        for token in response.split():
            await asyncio.sleep(0.25)
            await send_json(send, {"type": "token", "value": token + " "})
        await send_json(send, {"type": "done"})
    except OSError:
        # The connection can close just before websocket.disconnect is received.
        return


async def send_json(send: Send, message: dict[str, Any]) -> None:
    print("->", message["type"])
    await send({"type": "websocket.send", "text": json.dumps(message)})
