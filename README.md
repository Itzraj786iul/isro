# 🔥 AgniRakshak – Forest Fire Prediction & Spread Simulation Platform

AgniRakshak is an AI-powered web application developed to predict forest fire risk zones and simulate fire spread using remote sensing, geospatial, and meteorological data. Built for the **ISRO Bhartiya Antariksh Hackathon 2025**, it aids in real-time decision-making and disaster management by government authorities.

---

## 🚀 Tech Stack & Frameworks

| Layer            | Framework / Tools                                 |
|------------------|---------------------------------------------------|
| **Frontend**     | `React.js`, `Leaflet.js`, `Tailwind CSS`, `Mapbox` |
| **Backend**      | `Flask` (Python) OR `Node.js + Express` (JS)      |
| **ML/AI Models** | `TensorFlow`, `PyTorch`, `Scikit-learn`           |
| **Geospatial**   | `GDAL`, `Rasterio`, `OpenCV`, `QGIS`              |
| **Database**     | `MongoDB`, `Redis`                                |
| **Deployment**   | `Railway`, `Render`, `Vercel`, `Firebase`         |

---

## 📁 Project Structure

```bash
agni-rakshak/
│
├── frontend/                  # React frontend with map interface
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Main routes
│   │   └── App.js             # Entry point
│   └── package.json
│
├── backend/                   # API and ML logic
│   ├── app.py                 # Flask API (if Python used)
│   ├── routes/
│   ├── model/                 # Trained U-Net, CA model scripts
│   └── requirements.txt
│
├── data/                      # Raw input layers: DEM, LULC, VIIRS
│
├── outputs/                   # Output GeoTIFFs, simulated rasters
│
├── .env                       # API keys and secrets
├── README.md
└── LICENSE


🧠 ML Models & Pipeline
🔹 U-Net Model
Input: 30m raster stack (slope, aspect, LULC, temp, wind, humidity)

Output: Binary fire/no fire map

Framework: TensorFlow or PyTorch

🔹 Cellular Automata
Inputs: wind direction, slope, fuel load

Output: Raster time-series (1, 2, 3, 6, 12 hours)

Engine: Custom CA rules via NumPy + Rasterio

🔹 Explainability
SHAP for global feature attribution

LIME for local prediction inspection

💻 Getting Started
🔧 Backend (Flask Example)
bash
Copy
Edit
cd backend/
pip install -r requirements.txt
python app.py
🌐 Frontend
bash
Copy
Edit
cd frontend/
npm install
npm start
🔑 Configure .env for API keys, database URIs, and model paths.

📦 requirements.txt (sample)
txt
Copy
Edit
flask
rasterio
numpy
pandas
scikit-learn
tensorflow
opencv-python
shap
lime
gunicorn
📊 Output
🔥 Fire_Risk_Map.tif — Binary classification raster

⏱ Spread_Hour_01.tif to Spread_Hour_12.tif — Spread simulation outputs

🗺️ All viewable on map with animation controls

📈 Evaluation Metrics
Metric	Description
Accuracy	Binary classification accuracy
IoU Score	Overlap between predicted fire zones
Visual Match	VIIRS ground truth validation
Explainability	SHAP summary + waterfall plots

📥 Deployment
Frontend deployed on Vercel / Netlify

ML models served via REST API or local callable functions

📜 License
This project is licensed under the MIT License.
Feel free to fork and contribute.

🙏 Acknowledgements
ISRO Hackathon – Bhartiya Antariksh 2025

Forest Survey of India, VIIRS, ERA5, SentinelHub

TensorFlow, Leaflet.js, QGIS Community

🔗 For queries or contributions, feel free to raise an issue or pull request.

yaml
Copy
Edit

---

Would you like me to generate this as an actual `.md` file download for you? Or generate a badge-based GitHub summary with shields.io?
