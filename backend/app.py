from flask import Flask, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# ─────────────────────────────────────────────
# Supabase Configuration
# ─────────────────────────────────────────────
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("❌ Supabase credentials missing in .env file")

print("✅ Supabase URL Loaded:", SUPABASE_URL)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ─────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────
@app.route("/get-scores/<child_id>", methods=["GET"])
def get_scores(child_id):
    try:
        print("\n🔎 Fetching scores for child_id:", child_id)

        response = (
            supabase
            .table("child_daily_scores")
            .select("*")
            .eq("child_id", child_id)
            .order("day_number", desc=False)
            .execute()
        )

        print("📦 Full Supabase response:", response)

        if response.data is None:
            print("⚠ Supabase returned None")
            return jsonify([])

        print("✅ Supabase DATA:", response.data)

        return jsonify(response.data)

    except Exception as e:
        print("❌ ERROR fetching scores:", str(e))
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────────
# Health Check
# ─────────────────────────────────────────────
@app.route("/")
def home():
    return jsonify({"status": "Backend running"})


if __name__ == "__main__":
    app.run(debug=True)