---
title: Loss Functions for Ordinal Regression
date: "2025-01-04T23:02:03.284Z"
description: "Ordinal regression has order structure between classes and there are dedicated loss functions to use this information."
featuredImage: ordinal_regression/ogp.jpg
tags: ["en", "machine-learning", "math"]
---

In traditional classification problems, there is often no natural "order" among classes (e.g., {dog, cat, bird}). However, in cases like restaurant ratings (0-5) or clothing sizes (XS < S < M < L < XL), there exists a natural ordinal relationship among the classes. Tasks that handle such ordered relationships are called **ordinal regression**.

Ordinal regression has "order structure" between classes that we can use to improve learning, so there are dedicated loss functions different from those in standard classification or regression tasks. This article introduces three popular approaches to ordinal regression.

## Threshold-Based Approach

The simplest approach divides ordinal classes {0,1,2,...,K−1} into multiple binary classification tasks based on thresholds. For example, for 3 classes (0,1,2), the tasks are:

- Task 1: Is it larger than 1?
- Task 2: Is it larger than 2?

At inference, the final class is determined as follows:

- If Task 1 outputs 0, the predicted class is 0.
- If Task 1 outputs 1 and Task 2 outputs 0, the predicted class is 1.
- If Task 1 and Task 2 both output 1, the predicted class is 2.

This approach is relatively simple and intuitive.

## Soft Label Loss

This approach assigns probabilities not only to the true class but also to neighboring classes based on a distance-based weighting. A "soft label" distribution is generated and used to minimize the cross-entropy loss with the model's predicted distribution.

For example, for classes {0,1,2} with the true class $r_t$, the soft label for each class $r_i$ is defined as:

$$
\phi(r_t, r_i) = |r_t - r_i|, \quad y_i = \frac{\exp(-\phi(r_t, r_i))}{\sum_{k} \exp(-\phi(r_t, r_k))}
$$

where $\phi$ is a distance metric (e.g., absolute error). The cross-entropy loss between the predicted distribution $\hat{p}$ and the soft label distribution $y$ is minimized:

$$
L = - \sum_i y_i \log \hat{p}_i
$$

This naturally introduces the property of penalizing predictions farther from the true class more heavily.

## Ordinal Logistic Loss (Cumulative Link Model)

This statistical approach, also known as **cumulative link models**, incorporates ordinal relationships by modeling the cumulative probability. In this approach, the network's output $z$ is treated as a one-dimensional continuous variable, and learnable thresholds $\alpha_0, \ldots, \alpha_{K-2}$ are introduced. The cumulative probability is modeled as:

$$
P(y \leq k) = \sigma(\alpha_k - z)
$$

where $\sigma$ is the sigmoid function. From these cumulative probabilities, the probability of each class is derived as follows:

$$
P(y=0) = \sigma(\alpha_0 - z) \\
P(y = k) = \sigma(\alpha_{k} - z) - \sigma(\alpha_{k-1} - z), \quad k = 1, \ldots, K-1 \\
P(y = K-1) = 1 - \sigma(\alpha_{K-2} - z).
$$

These probabilities are used to compute the likelihood, and the **ordinal logistic loss** is the negative log-likelihood:

$$
L = - \sum_i \log P(y = y_i)
$$

This approach is theoretically grounded but requires careful implementation to ensure the thresholds are monotonic.

## Implementation Example

Below is an implementation example using [the wine quality dataset](https://www.kaggle.com/datasets/yasserh/wine-quality-dataset) and a two-layer neural network. First of all, let's prepare some common functions for loading data and training the model.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load and preprocess the Wine dataset
def load_wine_data():
    wine = load_wine()
    X = wine.data   # shape=(n_samples, 13)
    y = wine.target # 0,1,2 (3 classes)

    # Train-test split: 8:2 ratio
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Standardization
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test  = scaler.transform(X_test)

    # Convert to Torch tensors
    X_train_torch = torch.from_numpy(X_train).float()
    y_train_torch = torch.from_numpy(y_train).long()
    X_test_torch  = torch.from_numpy(X_test).float()
    y_test_torch  = torch.from_numpy(y_test).long()

    return X_train_torch, y_train_torch, X_test_torch, y_test_torch


# Two-layer neural network example
class TwoLayerNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, output_dim)
    
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)  # Raw logits or output
        return x


# Simplified training & evaluation function
def train_and_evaluate(
    model, 
    criterion, 
    optimizer, 
    train_loader, 
    X_test, 
    y_test, 
    num_epochs=30, 
    evaluate_fn=None
):
    """
    model: nn.Module
    criterion: Loss function
    optimizer: torch.optim
    train_loader: DataLoader of (X, y)
    X_test, y_test: Test data (Tensor)
    evaluate_fn: Function to get predicted labels during evaluation (model, X_test) -> pred_label
                 Defaults to standard multi-class argmax for accuracy calculation.
    """
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        for batch_X, batch_y in train_loader:
            optimizer.zero_grad()
            outputs = model(batch_X)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
        
        if (epoch + 1) % 5 == 0:
            print(f"Epoch {epoch+1}/{num_epochs}, Loss: {running_loss/len(train_loader):.4f}")

    # --- Evaluation ---
    model.eval()
    with torch.no_grad():
        if evaluate_fn is None:
            # Standard multi-class: use argmax for predictions
            logits = model(X_test)
            pred_label = torch.argmax(logits, dim=1)
        else:
            # Use custom evaluation function (e.g., Threshold-based or Ordinal Logistic)
            pred_label = evaluate_fn(model, X_test)

        accuracy = (pred_label == y_test).float().mean().item()
    return accuracy
```

Here is the code for the threshold-based approach:

```python
def convert_to_threshold_labels(y):
    """
    y: 0, 1, or 2
    return: [is_ge1, is_ge2]
    Example:
        y=0 -> [0, 0]
        y=1 -> [1, 0]
        y=2 -> [1, 1]
    """
    arr = []
    for val in y:
        arr.append([1 if val >= 1 else 0,
                    1 if val >= 2 else 0])
    return torch.tensor(arr, dtype=torch.float32)


def train_threshold_based():
    # --- Data Preparation ---
    X_train, y_train, X_test, y_test = load_wine_data()
    
    # Convert y to 2-dimensional binary labels
    y_train_bin = convert_to_threshold_labels(y_train)
    y_test_bin  = convert_to_threshold_labels(y_test)

    # DataLoader (batch_size=16)
    train_dataset = torch.utils.data.TensorDataset(X_train, y_train_bin)
    train_loader  = torch.utils.data.DataLoader(train_dataset, batch_size=16, shuffle=True)

    # --- Model: Two outputs (>=1?, >=2?) ---
    model = TwoLayerNet(input_dim=13, hidden_dim=32, output_dim=2)
    
    criterion = nn.BCEWithLogitsLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)
    
    # --- Training ---
    # Define "evaluate_fn" for threshold-based predictions
    def evaluate_fn(m, X):
        m.eval()
        with torch.no_grad():
            logits = m(X)  # shape: (N, 2)
            probs = torch.sigmoid(logits)  # (p1, p2)
            # p1 = probability of >=1, p2 = probability of >=2
            pred_list = []
            for p1, p2 in probs:
                if p1 < 0.5:
                    pred_list.append(0)
                else:
                    # p1 >= 0.5
                    if p2 < 0.5:
                        pred_list.append(1)
                    else:
                        pred_list.append(2)
            return torch.tensor(pred_list, dtype=torch.long)
    
    acc = train_and_evaluate(
        model, 
        criterion, 
        optimizer, 
        train_loader, 
        X_test, 
        y_test, 
        num_epochs=30, 
        evaluate_fn=evaluate_fn
    )
    print(f"[Threshold-based] Test Accuracy = {acc*100:.2f}%")
```

Here is the code for the soft label loss approach:

```python
class SoftLabelLoss(nn.Module):
    """
    Computes the cross-entropy loss between the model's output and a soft label distribution,
    where the soft label is based on distances: y_i = exp(-|r_t - r_i|).
    """
    def __init__(self, num_classes):
        super().__init__()
        self.num_classes = num_classes
    
    def forward(self, logits, target):
        """
        logits: (batch_size, num_classes) - Model's raw logits output.
        target: (batch_size,) - Class labels for each sample (0, 1, 2, ...).
        """
        with torch.no_grad():
            # Create soft labels
            batch_size = target.size(0)
            # Reshape target to (batch_size, 1)
            target_ = target.unsqueeze(1).float()
            # Create a class index tensor of shape (1, num_classes)
            class_indices = torch.arange(self.num_classes, device=logits.device).float().unsqueeze(0)
            # Calculate distances between target and each class
            dists = torch.abs(target_ - class_indices)  # (batch_size, num_classes)
            # Compute unnormalized weights exp(-distance)
            unnorm = torch.exp(-dists)
            # Normalize to create soft label distribution
            soft_labels = unnorm / unnorm.sum(dim=1, keepdim=True)
        
        # Compute log probabilities using log-softmax
        log_probs = F.log_softmax(logits, dim=1)  # (batch_size, num_classes)
        # Compute cross-entropy loss
        loss = - (soft_labels * log_probs).sum(dim=1).mean()
        return loss

def train_soft_label():
    # --- Data Preparation ---
    X_train, y_train, X_test, y_test = load_wine_data()
    
    # Create DataLoader (batch_size=16)
    train_dataset = torch.utils.data.TensorDataset(X_train, y_train)
    train_loader  = torch.utils.data.DataLoader(train_dataset, batch_size=16, shuffle=True)

    # --- Model: Outputs probabilities for 3 classes (class 0, 1, 2) ---
    model = TwoLayerNet(input_dim=13, hidden_dim=32, output_dim=3)

    criterion = SoftLabelLoss(num_classes=3)
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    # --- Training & Evaluation ---
    # For soft labels, the predicted class is determined using the usual argmax
    acc = train_and_evaluate(
        model,
        criterion,
        optimizer,
        train_loader,
        X_test,
        y_test,
        num_epochs=30,
        evaluate_fn=None  # None => Uses argmax to determine the predicted class
    )
    print(f"[Soft Label] Test Accuracy = {acc*100:.2f}%")
```

Here is the code for the ordinal logistic loss:

```python
class OrdinalLogisticModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_classes):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, 1)  # Scalar output z
        
        # (K-1) threshold parameters
        # Raw parameters raw_alpha => softplus => cumsum to ensure ascending order
        self.raw_alpha = nn.Parameter(torch.zeros(num_classes - 1))
    
    def forward(self, x):
        h = F.relu(self.fc1(x))
        z = self.fc2(h).squeeze(-1)  # (batch_size,)
        
        alpha_sorted = torch.cumsum(F.softplus(self.raw_alpha), dim=0)
        return z, alpha_sorted

class OrdinalLogLoss(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.num_classes = num_classes
    
    def forward(self, inputs, target):
        """
        inputs: A tuple (z, alpha)
          z:     (batch_size,) scalar output
          alpha: (K-1,) thresholds
        target: (batch_size,) labels 0..K-1
        """
        z, alpha = inputs  # Unpack
        K = self.num_classes
        batch_size = z.size(0)

        # p(Y=0)
        p_y0 = torch.sigmoid(alpha[0] - z)  # (batch_size,)
        # p(Y=K-1)
        p_yK_1 = 1.0 - torch.sigmoid(alpha[-1] - z)  # (batch_size,)

        if K > 2:
            sig_all = torch.sigmoid(alpha.unsqueeze(1) - z.unsqueeze(0))  # (K-1, batch_size)
            # p_middle[k] = sigma(alpha_k - z) - sigma(alpha_{k-1} - z)
            p_mid = sig_all[1:] - sig_all[:-1]  # shape: (K-2, batch_size)
            p_mid = p_mid.transpose(0, 1)       # (batch_size, K-2)
        else:
            p_mid = None
        
        p = torch.empty_like(z)
        
        mask0 = (target == 0)
        p[mask0] = p_y0[mask0]
        
        maskK_1 = (target == (K-1))
        p[maskK_1] = p_yK_1[maskK_1]
        
        if K > 2:
            mask_mid = ~(mask0 | maskK_1)
            if mask_mid.any():
                idx = target[mask_mid] - 1  # 1..K-2 => 0..(K-3)
                rowwise = p_mid[mask_mid]   # (N_mid, K-2)
                idx_2d = idx.unsqueeze(1)
                p_vals = torch.gather(rowwise, 1, idx_2d).squeeze(1)
                p[mask_mid] = p_vals
        
        # -log p
        eps = 1e-12
        nll = -torch.log(p + eps)
        return nll.mean()

def train_ordinal_logistic():
    # --- Data Preparation ---
    X_train, y_train, X_test, y_test = load_wine_data()

    train_dataset = torch.utils.data.TensorDataset(X_train, y_train)
    train_loader  = torch.utils.data.DataLoader(train_dataset, batch_size=16, shuffle=True)

    # --- Model: Scalar output + 2 thresholds (for 3 classes) ---
    model = OrdinalLogisticModel(input_dim=13, hidden_dim=32, num_classes=3)

    criterion = OrdinalLogLoss(num_classes=3)
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    # Training loop (train_and_evaluate is used, but inputs passed to the criterion are special)
    # evaluate_fn calculates class probabilities => argmax
    def custom_criterion(outputs, targets):
        # outputs = (z, alpha)
        return criterion(outputs, targets)

    def evaluate_fn(m, X):
        m.eval()
        with torch.no_grad():
            z_test, alpha_test = m(X)
            # p(Y=0) = σ(alpha_0 - z)
            p_y0 = torch.sigmoid(alpha_test[0] - z_test).unsqueeze(1)
            # p(Y=2) = 1 - σ(alpha_1 - z)
            p_y2 = (1.0 - torch.sigmoid(alpha_test[-1] - z_test)).unsqueeze(1)
            # p(Y=1) = middle probability
            if alpha_test.size(0) > 1:
                sig_all = torch.sigmoid(alpha_test.unsqueeze(1) - z_test.unsqueeze(0))  # (2, N)
                p_mid = (sig_all[1:] - sig_all[:-1]).transpose(0, 1)  # (N, 1)
            else:
                p_mid = None
            
            if p_mid is None:
                # For binary classification only
                p_all = torch.cat([p_y0, p_y2], dim=1)
            else:
                p_all = torch.cat([p_y0, p_mid, p_y2], dim=1)  # (N, 3)

            pred_label = torch.argmax(p_all, dim=1)
            return pred_label

    acc = train_and_evaluate(
        model,
        custom_criterion,
        optimizer,
        train_loader,
        X_test,
        y_test,
        num_epochs=30,
        evaluate_fn=evaluate_fn
    )
    print(f"[Ordinal Logistic] Test Accuracy = {acc*100:.2f}%")
```

## Summary

In this post, we covered three approaches to ordinal regression:

- Threshold-based approach: Decomposes the problem into multiple binary classification tasks based on thresholds.
- Soft label loss: Creates soft labels by spreading probabilities around the true class and minimizes cross-entropy.
- Ordinal logistic loss: Uses a scalar output and multiple thresholds to model cumulative probabilities.

Each method leverages ordinal information in its unique way. Choosing the right approach depends on the dataset's characteristics, the number of classes, and the required model precision.
