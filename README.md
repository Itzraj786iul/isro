# 🔥 AgniRakshak - Forest Fire Prediction and Spread Simulation Platform

AgniRakshak is a smart AI/ML-powered web platform that predicts forest fire risk zones and simulates their spread in real-time using geospatial, meteorological, and terrain data. Developed as part of the **ISRO Bhartiya Antariksh Hackathon**, this tool is designed to assist forest departments and disaster management authorities in making data-driven decisions for wildfire containment.

---

## 🌐 Live Demo
[👉 Click here to view the website](https://your-deployed-link.com)  
*(Replace this with your actual deployment URL)*

---

## 🚀 Features

- 🔍 **Fire Risk Prediction**: Generates 30m resolution binary map (Fire / No Fire) for the next day using U-Net.
- 🌬️ **Spread Simulation**: Predicts fire spread over 1, 2, 3, 6, and 12 hours using Cellular Automata models.
- 🗺️ **Interactive Map UI**: Visualize predictions, fire zones, and animation overlays.
- 📥 **GeoTIFF Downloads**: Export raster maps and simulated results.
- 🧠 **Explainability**: SHAP-based insights on model prediction.

---

## 🧰 Tech Stack

| Category             | Tools / Libraries                      |
|----------------------|-----------------------------------------|
| **Frontend**         | React.js, Leaflet.js, Tailwind CSS     |
| **Backend**          | Node.js / Express OR Flask (choose yours) |
| **Machine Learning** | TensorFlow / PyTorch, U-Net, Cellular Automata |
| **Geospatial**       | Rasterio, GDAL, OpenCV, QGIS           |
| **Database**         | MongoDB, Redis (for caching)           |
| **Deployment**       | Railway / Vercel / Firebase / Render   |

---

## 📁 Folder Structure

.
├── frontend/ # React app for UI
│ └── components/
│ └── pages/
├── backend/ # API layer and ML model handling
│ └── routes/
│ └── model/
├── data/ # Input GeoTIFFs, LULC, DEM, etc.
├── outputs/ # Prediction & Simulation GeoTIFFs
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/agni-rakshak.git
cd agni-rakshak

2. Install Dependencies
Frontend
cd frontend
npm install
npm start

Backend
cd backend
pip install -r requirements.txt
# or
npm install && node index.js
