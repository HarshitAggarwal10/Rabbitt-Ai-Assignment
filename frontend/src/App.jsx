import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !email) {
      setStatus("error");
      setMessage("Please upload a file and enter email");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      setLoading(true);
      setStatus("loading");
      setMessage("Generating AI sales summary...");

      await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData);

      setStatus("success");
      setMessage("Summary generated and email sent successfully!");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Rabbitt AI Assignment
        </h1>

        <p className="text-gray-600 mt-2">AI Sales Insight Automator</p>

        <div className="mt-3 text-sm text-gray-700">
          <p>
            <strong>Name:</strong> Harshit Aggarwal
          </p>
          <p>
            <strong>Roll No:</strong> 2310990766
          </p>
          <p>
            <strong>Role:</strong> AI Cloud DevOps Engineer
          </p>
        </div>
      </div>

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-105 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sales Insight Automator
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Upload sales data and generate an AI powered summary
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload CSV / Excel
            </label>

            <input
              type="file"
              accept=".csv,.xlsx"
              className="w-full border-2 border-dashed border-gray-300 p-3 rounded-xl bg-gray-50 hover:border-blue-400 cursor-pointer transition"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p className="text-xs text-green-600 mt-2">
                📄 {file.name} selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Email
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center"
          >
            {loading && (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
            )}

            {loading ? "Processing..." : "Generate AI Summary"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 text-center text-sm font-medium p-3 rounded-lg
            ${status === "success" ? "bg-green-100 text-green-700" : ""}
            ${status === "error" ? "bg-red-100 text-red-700" : ""}
            ${status === "loading" ? "bg-blue-100 text-blue-700" : ""}
            `}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
