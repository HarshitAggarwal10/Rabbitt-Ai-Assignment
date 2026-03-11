require("dotenv").config()

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

const uploadRoute = require("./routes/upload")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rabbitt-ai-assignment.vercel.app",
      "https://rabbitt-ai-assignment.onrender.com"
    ],
  })
)

app.use(express.json())
app.use(helmet())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(limiter)

app.use("/api", uploadRoute)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})