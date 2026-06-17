import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from mlxtend.frequent_patterns import apriori, association_rules
from io import StringIO
import json
import os 
import joblib # <-- ADDED FOR AI MODEL

# Initialize Flask App
app = Flask(__name__)
# Enable CORS to allow your React app to call this API
CORS(app)

# --- Base Directory ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# --- Data Loading ---
DATA_PATH = os.path.join(BASE_DIR, 'cleaned_accident_data.csv')
data = pd.DataFrame() # Initialize as empty
try:
    data = pd.read_csv(DATA_PATH)
    print("CSV data loaded successfully.")
except Exception as e:
    print(f"Error loading CSV from {DATA_PATH}: {e}")

# --- Load the trained model and class names ---
try:
    MODEL_PATH = os.path.join(BASE_DIR, 'accident_model.joblib')
    model = joblib.load(MODEL_PATH)
    
    CLASSES_PATH = os.path.join(BASE_DIR, 'target_classes.json')
    with open(CLASSES_PATH, 'r') as f:
        target_classes = json.load(f)
    print("AI prediction model loaded successfully.")
except Exception as e:
    print(f"Error loading AI model: {e}")
    print("AI prediction endpoint will not work!")
    model = None
    target_classes = []

# --- AI Suggestion Helper Function ---
def generate_suggestion(inputs):
    if inputs.get('weather_conditions') in ['Rainy', 'Stormy', 'Foggy']:
        if inputs.get('time_of_day_bin') == 'Night (00-05)':
            return "Extreme caution advised. Driving in poor weather at night is high risk. Avoid travel if possible."
        return "Poor visibility and wet roads detected. Reduce speed, increase following distance, and use headlights."
    if inputs.get('road_condition') in ['Wet', 'Damaged', 'Under Construction']:
        return "Hazardous road conditions. Be alert, reduce speed, and watch for unexpected obstacles."
    if inputs.get('age_group') == '18-25':
        return "As a younger driver, please be mindful of speed limits and avoid all distractions."
    return "Always wear a seatbelt and remain aware of your surroundings. Drive defensively."

# --- API Endpoints ---

@app.route('/api/olap-pivot')
def olap_pivot():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        pivot_table = pd.pivot_table(data, index='state_name', columns='accident_severity', aggfunc='size', fill_value=0)
        result = pivot_table.reset_index().to_json(orient='records')
        return json.loads(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/kmeans')
def run_kmeans():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        features = data[['driver_age', 'speed_limit_']].dropna()
        scaler = StandardScaler()
        features_scaled = scaler.fit_transform(features)
        kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
        features['cluster'] = kmeans.fit_predict(features_scaled)
        centers = scaler.inverse_transform(kmeans.cluster_centers_)
        cluster_data = features['cluster'].value_counts().reset_index()
        cluster_data.columns = ['cluster', 'count']
        result = {
            "cluster_centers": pd.DataFrame(centers, columns=['driver_age', 'speed_limit_']).to_dict(orient='records'),
            "cluster_counts": cluster_data.to_dict(orient='records')
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/knn')
def run_knn():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        features_df = data[['driver_age', 'number_of_vehicles_involved', 'accident_severity']].dropna()
        le = LabelEncoder()
        features_df['severity_encoded'] = le.fit_transform(features_df['accident_severity'])
        X = features_df[['driver_age', 'number_of_vehicles_involved']]
        y = features_df['severity_encoded']
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)
        knn = KNeighborsClassifier(n_neighbors=5)
        knn.fit(X_train, y_train)
        y_pred = knn.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        # FIX for JSON serialization
        label_mapping_raw = dict(zip(le.transform(le.classes_), le.classes_))
        label_mapping = {int(key): value for key, value in label_mapping_raw.items()}

        return jsonify({
            "accuracy": round(accuracy * 100, 2),
            "k_value": 5,
            "features_used": ['driver_age', 'number_of_vehicles_involved'],
            "target": "accident_severity",
            "label_mapping": label_mapping
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/apriori')
def run_apriori():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        features_df = data[['weather_conditions', 'road_type', 'time_of_day_bin']].dropna()
        basket = pd.get_dummies(features_df)
        frequent_itemsets = apriori(basket.astype(bool), min_support=0.01, use_colnames=True)
        rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.1)
        rules['antecedents'] = rules['antecedents'].apply(lambda x: list(x))
        rules['consequents'] = rules['consequents'].apply(lambda x: list(x))
        result_df = rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']].sort_values(by='confidence', ascending=False)
        result = result_df.head(20).to_json(orient='records')
        return json.loads(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Chart Endpoints ---
@app.route('/api/stats/by-state')
def stats_by_state():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        by_state = data.groupby('state_name').size().reset_index(name='count')
        by_state = by_state.sort_values(by='count', ascending=False).head(15)
        result = { "labels": by_state['state_name'].tolist(), "values": by_state['count'].tolist() }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/stats/by-time-bin')
def stats_by_time_bin():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        by_time = data.groupby('time_of_day_bin').size().reset_index(name='count')
        result = { "labels": by_time['time_of_day_bin'].tolist(), "values": by_time['count'].tolist() }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/stats/by-severity')
def stats_by_severity():
    if data.empty:
        return jsonify({"error": "Data not loaded"}), 500
    try:
        by_severity = data.groupby('accident_severity').size().reset_index(name='count')
        result = { "labels": by_severity['accident_severity'].tolist(), "values": by_severity['count'].tolist() }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- AI PREDICTION ENDPOINT ---
@app.route('/api/predict', methods=['POST'])
def predict_severity():
    if model is None:
        return jsonify({"error": "Model is not loaded"}), 500
    try:
        form_data = request.json
        data_for_model = {
            'weather_conditions': form_data.get('weather'),
            'road_condition': form_data.get('roadSurface'),
            'vehicle_type_involved': form_data.get('vehicleType'),
            'time_of_day_bin': form_data.get('timeOfDay'),
            'lighting_conditions': form_data.get('lightCondition'),
            'traffic_control_presence': form_data.get('traffic'),
            'age_group': form_data.get('driverAge')
        }
        
        df = pd.DataFrame([data_for_model])
        prediction_index = model.predict(df)[0]
        probabilities = model.predict_proba(df)[0]
        
        severity = target_classes[prediction_index]
        confidence_score = round(max(probabilities) * 100, 2)
        suggestion = generate_suggestion(data_for_model)
        
        return jsonify({
            "severity": severity,
            "score": confidence_score,
            "suggestion": suggestion
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5000) # Runs on http://localhost:5000