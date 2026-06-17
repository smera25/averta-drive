import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
import joblib
import json
import os

print("Starting model training...")

# --- 1. Load Data ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'cleaned_accident_data.csv')

try:
    data = pd.read_csv(DATA_PATH)
    print("Data loaded successfully.")
except Exception as e:
    print(f"Error loading data: {e}")
    exit()

# --- 2. Define Features (X) and Target (y) ---
features = [
    'weather_conditions',
    'road_condition',
    'vehicle_type_involved',
    'time_of_day_bin',
    'lighting_conditions',
    'traffic_control_presence',
    'age_group'
]
target = 'accident_severity'

# --- 3. Clean Data ---
df_clean = data[features + [target]].dropna()
print(f"Original data: {len(data)}, Cleaned data: {len(df_clean)}")

if df_clean.empty:
    print("No data left after cleaning. Check CSV and feature names.")
    exit()

X = df_clean[features]
y = df_clean[target]

# --- 4. Encode Target Variable ---
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Save the class names (e.g., ['Fatal', 'Minor', 'Serious'])
target_classes = le.classes_.tolist()
CLASSES_PATH = os.path.join(BASE_DIR, 'target_classes.json')
with open(CLASSES_PATH, 'w') as f:
    json.dump(target_classes, f)
print(f"Target classes saved: {target_classes}")

# --- 5. Create Preprocessing Pipeline ---
categorical_transformer = OneHotEncoder(handle_unknown='ignore')
preprocessor = ColumnTransformer(
    transformers=[('cat', categorical_transformer, features)])

# --- 6. Define The Model ---
model = RandomForestClassifier(n_estimators=100, random_state=42)

# --- 7. Create and Train the Full Pipeline ---
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                           ('classifier', model)])

print("Training the model... (This may take a moment)")
pipeline.fit(X, y_encoded)
print("Model training complete.")

# --- 8. Save the Pipeline ---
MODEL_PATH = os.path.join(BASE_DIR, 'accident_model.joblib')
joblib.dump(pipeline, MODEL_PATH)
print(f"Model saved as 'accident_model.joblib'")
print("--- Training process finished. ---")