const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const { generateSalesSummary } = require("../services/geminiService");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload CSV/XLSX sales data and generate AI summary
 *     description: Upload a sales dataset and receive an AI-generated executive summary via email.
 */

router.post("/upload", upload.single("file"), async (req, res) => {

  try {

    const email = req.body.email;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required"
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Read Excel / CSV
    const workbook = xlsx.read(file.buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Uploaded file contains no data"
      });
    }

    // Generate AI summary
    const summary = await generateSalesSummary(data);

    // Send email
    await sendEmail(email, summary);

    return res.status(200).json({
      success: true,
      summary
    });

  } catch (error) {

    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

module.exports = router;