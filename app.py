from flask import Flask, render_template, request, jsonify

from youtube import get_transcript
from vectorstore import create_vectorstore
from rag import create_rag_chain

app = Flask(__name__)

videos = {}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/load", methods=["POST"])
def load_video():
    data = request.get_json()
    url = data.get("url", "").strip()

    if not url:
        return jsonify({"error": "Please enter a YouTube URL or video ID."}), 400

    try:
        video_id = url.split("v=")[-1].split("&")[0]

        transcript = get_transcript(video_id)

        vectorstore = create_vectorstore(transcript)

        retriever = vectorstore.as_retriever(
            search_kwargs={"k": 5}
        )

        rag = create_rag_chain(retriever)

        videos[video_id] = rag

        return jsonify({
            "video_id": video_id,
            "title": "YouTube Video"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/ask", methods=["POST"])
def ask_question():
    data = request.get_json()

    video_id = data.get("video_id")
    question = data.get("question", "").strip()

    if not video_id or not question:
        return jsonify({"error": "Video ID and question are required."}), 400

    if video_id not in videos:
        return jsonify({"error": "Video has not been loaded."}), 400

    try:
        rag = videos[video_id]

        answer = rag(question)

        return jsonify({
            "answer": answer,
            "sources": []
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
