const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

// Load .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// Supabase Configuration
// ─────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("❌ Supabase credentials missing in .env file");
}

console.log("✅ Supabase URL Loaded:", SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// 🔹 Get Scores
app.get("/get-scores/:child_id", async (req, res) => {
    try {
        const { child_id } = req.params;

        console.log("🔎 Fetching scores for child_id:", child_id);

        const { data, error } = await supabase
            .from("child_daily_scores")
            .select("*")
            .eq("child_id", child_id)
            .order("day_number", { ascending: true });

        if (error) throw error;

        console.log("✅ Supabase DATA:", data);

        return res.json(data || []);
    } catch (err) {
        console.error("❌ ERROR fetching scores:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// 🔹 Add Child
app.post("/api/add-child", async (req, res) => {
    try {
        const { parent_id, name, age, gender, language } = req.body;

        if (!parent_id) {
            return res.status(400).json({ error: "Missing parent_id" });
        }

        console.log("Using parent ID:", parent_id);

        const { data, error } = await supabase
            .from("children")
            .insert([
                {
                    parent_id: parent_id,
                    name: name,
                    age: age,
                    gender: gender,
                    language: language,
                    dyslexia_level: null,
                    dyslexia_profile: null,
                },
            ])
            .select();

        if (error) throw error;

        if (data && data.length > 0) {
            return res.status(201).json({
                success: true,
                child_id: data[0].id,
                parent_id: parent_id,
                message: "Child added successfully",
            });
        }

        return res.status(400).json({ error: "Failed to add child" });
    } catch (err) {
        console.error("❌ Error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// 🔹 Get Children by Parent ID
app.get("/api/get-children/:parent_id", async (req, res) => {
    try {
        const { parent_id } = req.params;

        console.log("📥 /api/get-children HIT");
        console.log("➡️ parent_id:", parent_id);

        const { data, error } = await supabase
            .from("children")
            .select("*")
            .eq("parent_id", parent_id);

        if (error) throw error;

        console.log("📦 Supabase data:", data);

        return res.status(200).json(data);
    } catch (err) {
        console.error("❌ ERROR:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// 🔹 Health Check
app.get("/", (req, res) => {
    res.json({ status: "Backend running" });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});