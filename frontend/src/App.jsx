import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";
import rehypeHighlight from 'rehype-highlight';
import Markdown from "react-markdown";
import { AiOutlineRobot } from 'react-icons/ai'; 

function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    setClicked(true);
    setLoading(true);

    console.log("Requesting review for the code:", code);

    try {
      const response = await axios.post("https://ai-code-reviewer-60rn.onrender.com/ai/get-review/", { code });

      console.log("API Response:", response);

      if (response.status === 200) {
        setReview(response.data);
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-800 shadow-lg rounded-lg">
        AI Code Reviewer
      </header>

      <div className="flex flex-row gap-6 w-full max-w-6xl">
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".js,.py,.css,.cpp,.cs,.ts,.html,.json,.java"
            onChange={handleFileUpload}
            className="mb-4 text-sm text-gray-300 cursor-pointer bg-gray-800 p-2 rounded-lg"
          />

          <div className="border border-gray-800 p-4 rounded-lg bg-gray-900 whitespace-pre-wrap text-sm">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                backgroundColor: '#1e1e1e',
                color: '#f8f8f2'
              }}
            />
          </div>

          <button 
            onClick={reviewCode} 
            className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Review Code
          </button>

          {clicked && !loading && (
  <div className="mt-4 text-lg text-green-400 font-semibold flex items-center gap-2">
    <AiOutlineRobot size={24} />
    deepseek-r1-distill-llama-70b Responses
  </div>
)}

          {loading && (
            <div className="mt-4 text-lg text-yellow-400">
              Loading...
            </div>
          )}
        </div>

        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          {review ? (
            <div className="text-lg text-white">
              <h2 className="font-bold mb-2">Code Review:</h2>
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {review}
              </Markdown>
            </div>
          ) : (
            <div className="text-lg text-gray-400">No review available yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


