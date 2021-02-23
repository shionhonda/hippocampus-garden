---
title: "Ready Steady GO: Dispatcher-Worker with errgroup"
date: "2021-02-14T22:10:03.284Z"
description: "A golang implementation of dispatcher-worker pattern with errgroup. It immediately cancels the other jobs when an error occurs in any goroutine."
featuredImage: go_dispatcher/ogp.jpg
tags: ["en", "golang"]
---


Suppose you are asked to write a golang program that:

1. processes multiple jobs concurrently
2. can limit the number of goroutines
3. immediately cancels the other jobs when an error occurs in any goroutine

To satisfy the requirement #1 and #2, you can adopt a dispatcher-worker pattern. The common pattern often utilizes `sync.WaitGroup`, but in this case, to satisfy the other requirement #3, you might want to use [golang.org/x/sync/errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup).

Here is my sample implementation. The job is to wait for a random milliseconds, and an error occurs when ordered to wait for more than 990 ms.

```go
package main

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"golang.org/x/sync/errgroup"
)

const (
	numWorkers      = 10
	queueLength     = 100
	numJobs         = 100
	maxWaitMilliSec = 1000
	thres           = 990
)

type Job struct {
	id           int
	waitMilliSec int
}

type Dispatcher struct {
	queue chan *Job
	eg    *errgroup.Group
}

func NewDispatcher(eg *errgroup.Group) *Dispatcher {
	return &Dispatcher{
		queue: make(chan *Job, queueLength),
		eg:    eg,
	}
}

func (d *Dispatcher) Start(ctx context.Context) {
	for i := 0; i < numWorkers; i++ {
		d.eg.Go(func() error {
			for j := range d.queue {
				err := work(ctx, j)
				if err != nil {
					return err
				}
			}
			return nil
		})
	}
}

func (d *Dispatcher) Append(job *Job) {
	d.queue <- job
}

func work(ctx context.Context, job *Job) error {
	select {
	case <-ctx.Done():
		fmt.Printf("Canceled the job #%d\n", job.id)
		return nil
	default:
		fmt.Printf("Working on the job #%d. Wait for %d ms.\n", job.id, job.waitMilliSec)
		if job.waitMilliSec > thres {
			return fmt.Errorf("cannot wait for more than %d ms: job #%d; %d ms", thres, job.id, job.waitMilliSec)
		}
		time.Sleep(time.Duration(job.waitMilliSec) * time.Millisecond)
		return nil
	}
}

func main() {
	eg, ctx := errgroup.WithContext(context.Background())
	d := NewDispatcher(eg)

	d.Start(ctx)
	for i := 0; i < numJobs; i++ {
		milliSec := rand.Intn(maxWaitMilliSec)
		d.Append(&Job{
			id:           i,
			waitMilliSec: milliSec,
		})
	}

	close(d.queue)
	err := d.eg.Wait()
	if err != nil {
		fmt.Println(err)
	}
}
```
<br/>

You can try the above code [here](https://play.golang.org/p/8nyavxlrEsf). It results in:

```
$ go run main.go 
Working on the job #6. Wait for 425 ms.
Working on the job #7. Wait for 540 ms.
...
Working on the job #77. Wait for 463 ms.
Working on the job #78. Wait for 996 ms.
Canceled the job #79
...
Canceled the job #98
Canceled the job #99
cannot wait for more than 990 ms: job #78; 996 ms
```

<br/>

## References
[1] [golang の channel を使って Dispatcher-Worker を作り goroutine 爆発させないようにする - at kaneshin](https://kaneshin.hateblo.jp/entry/2016/08/18/190435)  
[2] [Re: golang の channel を使って Dispatcher-Worker を作り goroutine 爆発させないようにする - okzkメモ](http://okzk.hatenablog.com/entry/2016/08/19/121652)  
[3] https://gist.github.com/okzk/4e5afec27927668e52d5eb6c5eb1bb72  
[4] https://gist.github.com/lestrrat/c9b78369cf9b9c5d9b0c909ed1e2452e  
[5] [Goメモ-62 (sync.WaitGroupとerrgroupパッケージ) - いろいろ備忘録日記](https://devlights.hatenablog.com/entry/2020/03/10/112904)  
[6] [複数のGoroutineをWaitGroup（ErrGroup）で制御する - Hack Your Design!](https://blog.toshimaru.net/goroutine-with-waitgroup/)
