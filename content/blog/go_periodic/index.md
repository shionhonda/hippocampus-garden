---
title: "Ready Steady GO: Call Function Periodically With Timeout"
date: "2020-08-16T22:10:03.284Z"
description: "This is a golang sample code that calls some function periodically for a specified amount of time."
featuredImage: go_periodic/ogp.jpg
tags: ["en", "golang"]
---

In this post, I introduce an example code that calls some function periodically for a specified amount of time. It was a good exercise for a golang beginner like me to use goroutines.

The sample code consists of the 3 elements.

1. Write a function `preiodicGreet()` that prints a given message periodycally
2. Set a timeout context in the main function
3. Call the function `preiodicGreet()` as a goroutine in the main function

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func periodicGreet(msg string, period time.Duration) {
	t := time.NewTicker(period * time.Second)
	defer t.Stop()
	for {
		select {
		case <-t.C: // Activate periodically
			fmt.Printf(msg)
		}
	}
}

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second) // Cancel in 5 seconds
	defer cancel()

	go periodicGreet("Hello, World!\n", 1) // Call as a goroutine

	select {
	case <-ctx.Done(): // When time is out
		fmt.Println("Periodic greeting done")
	}
}
```
<br/>

## References
[1] [Goで一定周期で何かを行う方法 - Qiita](https://qiita.com/ruiu/items/1ea0c72088ad8f2b841e)  
[2] [contextの使い方 - Qiita](https://qiita.com/taizo/items/69d3de8622eabe8da6a2)
