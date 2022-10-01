---
title: "How to Increase Shared Memory in Vertex AI Workbench"
date: "2022-10-01T22:10:03.284Z"
description: 'If you want more shm in Workbench, specify shm size in the "Metadata" pane when creating a notebook.'
featuredImage: workbench_shm/ogp.jpg
tags: ["en", "kaggle", "cloud"]
---

**[Vertex AI Workbench](https://cloud.google.com/vertex-ai-workbench)** is a managed Jupyter Notebook service of Google Cloud. It allows you to choose a wide range of configurations such as GPU types, disk size, and environment (which Docker image to compute on). The Docker image options include [Kaggle Python](https://github.com/Kaggle/docker-python) [^1], so Workbench is one of the best (paid) alternatives when you run out of the GPU quota of the Kaggle Notebook.

## Is Shared Memory Too Small?
However, in contrast to Kaggle Notebook's 5.5 GB, Workbench provides only 64 MB of shared memory (**shm**) by default.

```sh
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
overlay          99G   27G   68G  28% /
tmpfs            64M     0   64M   0% /dev
tmpfs           1.9G     0  1.9G   0% /sys/fs/cgroup
shm              64M     0   64M   0% /dev/shm
/dev/sdb         98G   12K   98G   1% /home/jupyter
/dev/sda1        99G   27G   68G  28% /etc/hosts
tmpfs           1.9G     0  1.9G   0% /proc/acpi
tmpfs           1.9G     0  1.9G   0% /sys/firmware
```

When you are using PyTorch, this often leads to fatal errors in DataLoader, such as:

> DataLoader worker (pid xxx) is killed by signal: Bus error. 

> ERROR: Unexpected bus error encountered in worker. This might be caused by insufficient shared memory (shm)

Setting `num_workers` to zero solves these errors themselves, but it's not a real solution because it sacrifices the speed of the DataLoder process.

The real solution is to execute the `docker run` command with either of the following two options:

- `--shm-size=5.5gb` ([ref](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources))
- `--ipc=host` ([ref](https://docs.docker.com/engine/reference/run/#ipc-settings---ipc))

But can you do this in Workbench? The launching command `docker run` is hidden by GUI.

## Solution: Specify in Metadata Pane
When you create a new notebook in Workbench GUI, you'll see an optional pane for setting some metadata. In this pane, you can pass the option `--shm-size=5.5gb` or `--ipc=host` with the key `container-custom-params`, as shown in the screenshot below.

![Metadata](metadata.png)

If you create a notebook with this metadata, you'll get an instance with sufficient shm.

```sh
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
overlay          99G   27G   68G  28% /
tmpfs            64M     0   64M   0% /dev
tmpfs           1.9G     0  1.9G   0% /sys/fs/cgroup
shm             5.5G     0  5.5G   0% /dev/shm
/dev/sdb         98G   12K   98G   1% /home/jupyter
/dev/sda1        99G   27G   68G  28% /etc/hosts
tmpfs           1.9G     0  1.9G   0% /proc/acpi
tmpfs           1.9G     0  1.9G   0% /sys/firmware
```


[^1]: Python image optimized for Kaggle Notebooks, supporting hundreds of machine learning libraries popular on Kaggle