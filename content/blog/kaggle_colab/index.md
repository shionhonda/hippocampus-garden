---
title: "Kaggle on Colab Pro"
date: "2021-05-30T22:01:03.284Z"
description: "It's just $12 per month."
featuredImage: f1/ogp.png
tags: ["en", "kaggle"]
---

Colab Pro (currently available only in the US, Canada, Japan, Brazil, Germany, France, India, UK, and Thailand) offers ready-to-use and accelerated cloud computing resources which otherwise are expensive and tedious to maintain. Unlike its free version, Colab Pro allows us to use TPUs and high-end GPUs such as V100 and P100 way more often, access to high memory instances, and keep running notebooks up to 24 hours, for just $1 per month. 

Colab Pro would satisfy the resource requirements by Kaggle competitions in most cases. However, there remains a problem: each session stops after 24 hours. You need to prepare the dataset every time, but this takes some time depending on how you prepare it. In the table below, I compare five ways to prepare the Kaggle dataset in terms of the time for the initial loading and disk input / output.

|                                | Initial process | File I/O |
| :----------------------------: | :-------------: | :------: |
|    Download via Kaggle API     |     Slow 👎      |  Fast 👍  |
|      Download via gsutil       |    Slower 👎     |  Fast 👍  |
| Copy from Google Drive & Unzip |    Slower 👎     |  Fast 👍  |
|     Mount on Google Drive      |     Fast 👍      |  Slow 👎  |
|          Mount on GCS          |     Fast 👍      |  Slow 👎  |

Unfortunately, it seems there are no way to do the both fast. Considering that we want to iterate over the dataset many times to train models, it is more important to make disk I/O fast. So, in the current situations, I chose to take the first option: download the dataset to the instance via Kaggle API, which is explained in the next section.

## Kaggle on Colab Pro
1. Access `https://www.kaggle.com/<YourKaggleID>/account` and download `kaggle.json`  
![](2021-05-30-22-43-40.png)
2. Create `kaggle` folder in your Google Drive and upload `kaggle.json` there
3. Mount Google Drive by clicking the top right icon  
![](2021-05-30-22-47-19.png)
4. Copy `kaggle.json` in your Google Drive to the Colab's session and change file permission
```
! mkdir -p ~/.kaggle
! cp /content/drive/kaggle/kaggle.json ~/.kaggle/
! chmod 600 ~/.kaggle/kaggle.json
```
5. (Optional) Upgrade Kaggle API. This package is pre-installed in Colab instances, but as of May 2021, its version is older than the one used in the Kaggle notebooks and behaves differently.
```
! pip uninstall -y kaggle
! pip install -U kaggle
```
6. Download dataset via Kaggle API and 
```
! mkdir -p /content/<CompetitionID>
! kaggle competitions download -c <CompetitionID> -p /content
```
7. Unzip the zipped file
```shell
! unzip -q /content/<CompetitionID>.zip
# You can specify the portion of dataset for saving time and disk space
! unzip -q /content/<CompetitionID>.zip train/*
```

It's all done! When you finish training, you can save the weight files to Kaggle datasets and submit predictions via Kaggle API. For the complete usage, please refer to the [README](https://github.com/Kaggle/kaggle-api).

## What about Using GCS?
### Colab can Mount GCS Buckets but...

```python
from google.colab import auth
auth.authenticate_user()
```

```
! echo "deb http://packages.cloud.google.com/apt gcsfuse-bionic main" > /etc/apt/sources.list.d/gcsfuse.list
! curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
! apt update
! apt install gcsfuse
```

```
! mkdir -p seti-breakthrough-listen
! gcsfuse  --implicit-dirs --limit-bytes-per-sec -1 --limit-ops-per-sec -1 kds-e04be55adcebc737d70e0c48b4fb1d5cf353f2424d1ab1d818ca0e4f seti-breakthrough-listen
! ls seti-breakthrough-listen/
```

### Downloading with gsutil is Slow, too

## References
[1] [Colaboratoryで分析コンペをする時のテクニック集 - kaggle全力でやります](https://www.currypurin.com/entry/2021/03/04/070000)