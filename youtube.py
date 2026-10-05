from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript(video_id):

    api = YouTubeTranscriptApi()

    transcript = api.fetch(video_id)

    documents = []

    for item in transcript:
        documents.append({
            "text": item.text,
            "start": item.start
        })

    return documents