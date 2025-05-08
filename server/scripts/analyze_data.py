# filepath: /C:/Users/winha/Desktop/final-project-20.10/final.py
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import hashlib
import json
from time import time
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def read_csv_file(file_path):
    data = pd.read_csv(file_path)
    return data

def analyze_data(data):
    label_mapping = {'SLEEP_APNEA': 0, 'NORMAL_SLEEP': 1, 'DEEP_SLEEP': 2}
    data['label'] = data['label'].replace(label_mapping)

    X = data[['mean_1_a', 'mean_2_a', 'mean_3_a', 'mean_4_a', 'mean_d_0_a', 'mean_d_1_a', 'mean_d_2_a', 'mean_d_3_a', 'mean_d_4_a']]
    y = data['label']
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=123)

    scaler = StandardScaler()
    X_train_normalized = scaler.fit_transform(X_train)
    X_test_normalized = scaler.transform(X_test)

    encoder = OneHotEncoder(sparse_output=False, categories='auto', handle_unknown='ignore')
    y_train_encoded = encoder.fit_transform(y_train.values.reshape(-1, 1))
    y_test_encoded = encoder.transform(y_test.values.reshape(-1, 1))

    model = Sequential()
    model.add(Dense(64, input_dim=X_train_normalized.shape[1], activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(y_train_encoded.shape[1], activation='softmax'))

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    history = model.fit(X_train_normalized, y_train_encoded, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

    y_pred_prob = model.predict(X_test_normalized)
    y_pred = y_pred_prob.argmax(axis=-1)
    y_test_labels = y_test_encoded.argmax(axis=-1)

    accuracy = accuracy_score(y_test_labels, y_pred)
    report = classification_report(y_test_labels, y_pred)

    return accuracy, report

def main(file_path):
    data = read_csv_file(file_path)
    accuracy, report = analyze_data(data)
    return accuracy, report

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python final.py <path_to_csv_file>")
        sys.exit(1)

    file_path = sys.argv[1]
    accuracy, report = main(file_path)
    print(f"Accuracy: {accuracy}")
    print("Classification Report:")
    print(report)