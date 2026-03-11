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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - email
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Sales dataset file (CSV or XLSX)
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: Email where the AI summary will be sent
 *     responses:
 *       200:
 *         description: AI summary generated and email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 summary:
 *                   type: string
 *       400:
 *         description: File missing or invalid input
 *       500:
 *         description: Internal server error
 */

router.post("/upload", upload.single("file"), async (req, res) => {

  try {

    const email = req.body.email;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "File required" });
    }

    const workbook = xlsx.read(file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const summary = await generateSalesSummary(data);

    await sendEmail(email, summary);

    return res.json({
      success: true,
      summary
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }

});

module.exports = router;