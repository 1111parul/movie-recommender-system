import logging
logging.basicConfig(level=logging.INFO)  

import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import time

app = Flask(__name__)
CORS(app)


recommendation = pickle.load(open('model/movie_list.pkl', 'rb'))
similarity = pickle.load(open('model/similarity.pkl', 'rb'))

def recommend(movie):
    def fetch_poster(movie_id):
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"
        headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2EyMWM2MGNhZmJiNjY5ZjFkNmEyZWQwY2U2ZjBhZiIsIm5iZiI6MTc1NDgwMjc5Ni42OTI5OTk4LCJzdWIiOiI2ODk4MmE2Y2I4YTlkMDY2ZTQ4ZWE5MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9SWNqAcOYbqADVIy7Mxx1EJmp6xHLcbmT17Yy1MziHQ"
        }

        for attempt in range(7):
            try:
                response = requests.get(url, headers=headers, timeout=10)
                data = response.json()
                poster_path = data.get('poster_path')
                print(f"Poster Path: {poster_path}")
                if poster_path:
                    return f"https://image.tmdb.org/t/p/w500/{poster_path}"
                return None
            except Exception as e:
                print(f"Error fetching poster for movie_id {movie_id} (attempt {attempt+1}): {e}")
                time.sleep(0.5)
        return None

    movie_index = recommendation[recommendation['title'] == movie].index[0]
    distances = similarity[movie_index]

    
    movies_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[0:8]

    movie_titles = []
    poster_urls = []
    movie_ids = []

    print("Recommended movies:")
    recommended_console_log = []

    for idx, _ in movies_list:
        title = recommendation.iloc[idx].title
        movie_id = int(recommendation.iloc[idx]['movie_id'])
        print(f"  - ID: {movie_id}, Title: {title}")
        recommended_console_log.append({"title": title, "id": movie_id})
        movie_titles.append(title)
        movie_ids.append(movie_id)
        poster_urls.append(fetch_poster(movie_id))

    
    print(f"Recommended movies (console log format): {recommended_console_log}")
    return {
        "movies": movie_titles,
        "movie_ids": movie_ids,
        "posters": poster_urls
    }



@app.route('/recommend', methods=['GET'])
def recommend_endpoint():
    movie_name = request.args.get('movie')
    if not movie_name:
        return jsonify({"error": "Please provide a movie name as ?movie=<name>"}), 400
    
    try:
        results = recommend(movie_name)
        return jsonify(results)
    except IndexError:
        return jsonify({"movies": [], "posters": [], "error": f"Movie '{movie_name}' not found"}), 404


@app.route('/movies', methods=['GET'])
def movies_endpoint():
    titles = recommendation['title'].tolist()
    return jsonify({'movies': titles})

# Add a root route to test
@app.route("/")
def home():
    return "Movie Recommender Backend is running!"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets PORT
    app.run(host="0.0.0.0", port=port)






