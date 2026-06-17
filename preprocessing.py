import pandas as pd
import numpy as np
import sys

# --------------------------
# 1) Configuration
# --------------------------
INPUT_FILE = 'accident_prediction_india.csv'
OUTPUT_FILE = 'cleaned_accident_data.csv'

print(f"Attempting to load data from: {INPUT_FILE}")

# --------------------------
# 2) Load Data
# --------------------------
try:
    # CRITICAL: Added 'na_values' to correctly handle "Unknown" strings
    df = pd.read_csv(INPUT_FILE, na_values=['Unknown'])
    print("Data loaded successfully.")
    print(f"Original data has {df.shape[0]} rows and {df.shape[1]} columns.")
except FileNotFoundError:
    print(f"Error: The file '{INPUT_FILE}' was not found.")
    sys.exit(1)
except Exception as e:
    print(f"An error occurred while loading the data: {e}")
    sys.exit(1)

# Create a copy for preprocessing
df_clean = df.copy()

# --------------------------
# 3) Clean Column Names
# --------------------------
print("Cleaning column names...")
df_clean.columns = df_clean.columns.str.strip().str.lower().str.replace(' ', '_', regex=False).str.replace(r'\(km/h\)', '', regex=True)
print("New columns:", df_clean.columns.tolist())

# --------------------------
# 4) Handle Missing Values (Revised Strategy)
# --------------------------
print("\nHandling missing values...")

# Strategy 1: Fill 'city_name' with a specific string
df_clean['city_name'] = df_clean['city_name'].fillna('Not Specified')
print(f"'city_name' NaNs filled with 'Not Specified'.")

# Strategy 2: Drop rows where critical data for analysis is missing
critical_cols = ['accident_severity', 'driver_age', 'time_of_day', 'month', 'day_of_week']
original_rows = df_clean.shape[0]
df_clean = df_clean.dropna(subset=critical_cols)
new_rows = df_clean.shape[0]

if original_rows > new_rows:
    print(f"Dropped {original_rows - new_rows} rows due to missing critical data.")

# --------------------------
# 5) Feature Engineering (With fixes)
# --------------------------
print("\nStarting feature engineering...")

# --- Feature 1: Time of Day Bin ---
# Convert 'time_of_day' to just the hour
df_clean['time_hour'] = pd.to_datetime(df_clean['time_of_day'], format='%H:%M', errors='coerce').dt.hour
time_bins = [-1, 5, 11, 17, 23] # 0-5, 6-11, 12-17, 18-23
time_labels = ['Night (00-05)', 'Morning (06-11)', 'Afternoon (12-17)', 'Evening (18-23)']
df_clean['time_of_day_bin'] = pd.cut(df_clean['time_hour'], bins=time_bins, labels=time_labels, right=True)

# *** FIX 1: Add 'Unknown Time' as a valid category *before* filling NaN ***
if pd.api.types.is_categorical_dtype(df_clean['time_of_day_bin']):
    df_clean['time_of_day_bin'] = df_clean['time_of_day_bin'].cat.add_categories('Unknown Time')

# Now this fillna will work
df_clean['time_of_day_bin'] = df_clean['time_of_day_bin'].fillna('Unknown Time')


# --- Feature 2: Season ---
season_map = {
    'January': 'Winter', 'February': 'Winter',
    'March': 'Summer', 'April': 'Summer', 'May': 'Summer',
    'June': 'Monsoon', 'July': 'Monsoon', 'August': 'Monsoon', 'September': 'Monsoon',
    'October': 'Post-Monsoon', 'November': 'Post-Monsoon',
    'December': 'Winter'
}
df_clean['season'] = df_clean['month'].map(season_map)
df_clean['season'] = df_clean['season'].fillna('Unknown Season')


# --- Feature 3: Driver Age Group ---
age_bins = [17, 25, 40, 60, 120] # 18-25, 26-40, 41-60, 61+
age_labels = ['18-25', '26-40', '41-60', '61+']
df_clean['age_group'] = pd.cut(df_clean['driver_age'], bins=age_bins, labels=age_labels, right=True)

# *** FIX 2: Add 'Unknown Age' as a valid category *before* filling NaN ***
if pd.api.types.is_categorical_dtype(df_clean['age_group']):
    df_clean['age_group'] = df_clean['age_group'].cat.add_categories('Unknown Age')

# Now this fillna will work
df_clean['age_group'] = df_clean['age_group'].fillna('Unknown Age')


# --- Feature 4: Weekend vs. Weekday ---
weekend_list = ['Saturday', 'Sunday']
df_clean['is_weekend'] = df_clean['day_of_week'].isin(weekend_list).astype(int) # 1 if weekend, 0 if weekday

print("New columns added: 'time_of_day_bin', 'season', 'age_group', 'is_weekend'")

# --------------------------
# 6) Final Cleanup
# --------------------------
# Drop temporary column and any duplicates
df_clean = df_clean.drop(columns=['time_hour'])
df_clean = df_clean.drop_duplicates()
print("Dropped temporary 'time_hour' column and removed duplicate rows.")

# --------------------------
# 7) Save Cleaned Data
# --------------------------
try:
    df_clean.to_csv(OUTPUT_FILE, index=False)
    print(f"\nSuccessfully saved cleaned data to: {OUTPUT_FILE}")
    print("\n--- Processing Summary ---")
    print(f"Original shape: {df.shape}")
    print(f"Cleaned shape:  {df_clean.shape}")
    print("\nFirst 5 rows of cleaned data:")
    print(df_clean.head())
    
except Exception as e:
    print(f"An error occurred while saving the data: {e}")