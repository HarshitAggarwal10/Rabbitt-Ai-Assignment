const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const { generateSalesSummary } = require("../services/geminiService");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

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