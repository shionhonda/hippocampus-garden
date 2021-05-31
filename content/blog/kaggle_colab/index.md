---
title: "Happy Kaggling on Colab Pro & Google Drive"
date: "2021-05-31T22:01:03.284Z"
description: "This post shows you how to set up a cheap and comfortable computing environment for Kaggle using Colab Pro and Google Drive. Happy Kaggling!"
featuredImage: kaggle_colab/ogp.jpg
tags: ["en", "kaggle"]
---

Colab Pro (currently available only in the US, Canada, Japan, Brazil, Germany, France, India, UK, and Thailand) offers ready-to-use and accelerated cloud computing resources which otherwise are expensive and tedious to maintain. Unlike its free version, Colab Pro allows us to use TPUs and high-end GPUs such as V100 and P100 way more often, access high memory instances, and keep running notebooks for up to 24 hours, just for $10 per month. 

Colab Pro can meet the resource requirements of Kaggle competitions in most cases. However, there remains a problem: each session stops after 24 hours. You need to prepare the dataset every time, which takes some time depending on how you prepare it. In the table below, I compare five different ways of preparing the Kaggle dataset in terms of the time for the initial loading and disk input/output.

|                         | Initial process | File I/O |
| :---------------------: | :-------------: | :------: |
| Download via Kaggle API |    Slower 👎     |  Fast 👍  |
|   Download via gsutil   |    Slower 👎     |  Fast 👍  |
| Unzip from Google Drive |     Slow 👎      |  Fast 👍  |
|  Mount to Google Drive  |     Fast 👍      |  Slow 👎  |
|      Mount to GCS       |     Fast 👍      |  Slow 👎  |

Unfortunately, there doesn't seem to be a fast way to do both things. Considering that we want to train models iterating over the dataset many times, it is more important to make disk I/O fast. So, for the current situation, I chose to take the third option: first, download the dataset in Google Drive as a zip file via Kaggle API, and when you start a session, unzip the zip file to the instance's disk. This procedure is explained step by step in the next section.

## Kaggle on Colab Pro
### Downloading Dataset in Google Drive
First of all, you have to download the Kaggle dataset as a zip file to Google Drive using Kaggle API.
The following steps only need to be done once.

1. Go to `https://www.kaggle.com/<YourKaggleID>/account` and download `kaggle.json`  
![](2021-05-30-22-43-40.png)
2. Create `kaggle` folder in your Google Drive and upload `kaggle.json` there
3. Start a Colab session
4. Mount Google Drive by clicking the top-right icon  
![](2021-05-30-22-47-19.png)
5. Copy `kaggle.json` in your Google Drive to the current session and change file permissions
```
! mkdir -p ~/.kaggle
! cp ./drive/MyDrive/kaggle/kaggle.json ~/.kaggle/
! chmod 600 ~/.kaggle/kaggle.json
```
5. (Optional) Upgrade Kaggle API. This package is pre-installed in Colab instances, but as of May 2021, its version is older than the one used in the Kaggle notebooks and behaves differently.
```
! pip uninstall -y kaggle
! pip install -U kaggle
```
6. Download dataset via Kaggle API in Google Drive (this may take some time to complete and a few more minutes to be reflected in Google Drive GUI).
```
! mkdir -p ./drive/MyDrive/kaggle/<CompetitionID>
! kaggle competitions download -c <CompetitionID> -p ./drive/MyDrive/kaggle/<CompetitionID>
```

You may want to upgrade your Google Drive plan to get more storage.

### Extracting Zip File to Instance
7. Extract the zipped file to the current session (this may also take some time)
```shell
! mkdir -p <CompetitionID>
! unzip -q ./drive/MyDrive/kaggle/<CompetitionID>.zip -d <CompetitionID>
# You can specify the portion of dataset for saving time and disk space
! unzip -q ./drive/MyDrive/kaggle/<CompetitionID>.zip train/* -d <CompetitionID>
```

It's all done! When you finish training, you can export the weight files to Kaggle datasets and submit predictions via Kaggle API. For the complete instructions, please refer to the [README](https://github.com/Kaggle/kaggle-api).

### Speed Comparison
Unzipping from Google Drive takes a long time. Is it really faster than directly downloading via Kaggle API or gsutil? To answer this question, I measured the time it takes to prepare the dataset of the competition "[House Prices - Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/)" (935 KB) with three different approaches.

|             Method              | Time [s] |
| :-----------------------------: | :------: |
|     Unzip from Google Drive     |  1.012   |
| Download via Kaggle API & Unzip |  1.030   |
|       Download via gsutil       |  2.026   |

This result may vary depending on the region where these instances are located, but in most cases, unzipping from Google Drive will be the fastest.

### Beware Disk Size
Colab Pro currently offers a disk of 150 GB, so you can't handle zip files larger than 75 GB. 

## What about Mounting External Storage?
### Mounting GCS Buckets
Colab can be mounted on Google Cloud Storage, allowing us to access Kaggle datasets *without downloading them*. To do so, you need some setups. First, authenticate your account by the following snippet:

```python
from google.colab import auth
auth.authenticate_user()
```
</br>
Then, install `gcsfuse`.

```
! echo "deb http://packages.cloud.google.com/apt gcsfuse-bionic main" > /etc/apt/sources.list.d/gcsfuse.list
! curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
! apt update
! apt install gcsfuse
```
</br>
Next, open a Kaggle notebook in your preferred competition, and get the GCS path by running the following snippet:

```python
from kaggle_datasets import KaggleDatasets
print(KaggleDatasets().get_gcs_path())
```
</br>
For the competition "[House Prices - Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/)", the GCS path was `gs://kds-ecc57ad1aae587b0e86e3b9422baab9785fc1220431f0b88e5327ea5`.

Now mount to the GCS bucket by `gcsfuse`.

```
! mkdir -p <CompetitionID>
! gcsfuse  --implicit-dirs --limit-bytes-per-sec -1 --limit-ops-per-sec -1 <GCSPath without gs://> <CompetitionID>
```
</br>
The mounting process completes in a second! But when you try to iterate over the dataset, you'll find out that the disk access is irritatingly slow. The speed should depend on the region of the Colab instance and the GCS bucket, but in general, you should avoid mounting to GCS buckets.

For your information, the region of the Colab instance can be obtained by:

```
! curl ipinfo.io
```
</br>
The region of the GCS bucket should be obtained by the command below, but I got `AccessDeniedException` and couldn't solve it.

```
! gsutil ls -Lb gs://kds-ecc57ad1aae587b0e86e3b9422baab9785fc1220431f0b88e5327ea5
```
</br>

### Mounting Google Drive
Again, the disk access is too slow.


## References
[1] [Colaboratoryで分析コンペをする時のテクニック集 - kaggle全力でやります](https://www.currypurin.com/entry/2021/03/04/070000)  
[2] [Colaboratory環境でGoogle Cloud Storage(GCS)と連携する(gsutil,gcsfuse)](https://technodaifuku.blogspot.com/2020/09/colaboratorygoogle-cloud.html)  
[3] [Downloading Datasets into Google Drive via Google Colab | by Kevin Luk | Towards Data Science](https://towardsdatascience.com/downloading-datasets-into-google-drive-via-google-colab-bcb1b30b0166)