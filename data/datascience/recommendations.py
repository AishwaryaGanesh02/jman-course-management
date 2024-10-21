import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ast

# Load the data
data = pd.read_csv('.\\data\\data\\platinum\\report_data.csv')

# Preprocess skills
data['userSkills'] = data['userSkills'].apply(
    lambda x: ast.literal_eval(x) if isinstance(x, str) else x)
data['courseSkills'] = data['courseSkills'].apply(
    lambda x: ast.literal_eval(x) if isinstance(x, str) else x)
data['designationSkills'] = data['designationSkills'].apply(
    lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

# Create skills vector
data['skills_vector'] = data['courseSkills'].apply(lambda x: ' '.join(x))

# Initialize TF-IDF vectorizer and fit the data
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(data['skills_vector'])


def recommend_courses(employee_id, top_n=5):
    employee_data = data[data['employeeId'] == employee_id]
    if employee_data.empty:
        return None

    user_skills = set(employee_data.iloc[0]['userSkills'])
    designation_skills = set(employee_data.iloc[0]['designationSkills'])
    missing_skills = designation_skills - user_skills

    if missing_skills:
        missing_skills_vector = ' '.join(missing_skills)
        missing_tfidf = tfidf_vectorizer.transform([missing_skills_vector])
        cosine_sim = cosine_similarity(missing_tfidf, tfidf_matrix)
    else:
        existing_skills_vector = ' '.join(user_skills)
        existing_tfidf = tfidf_vectorizer.transform([existing_skills_vector])
        cosine_sim = cosine_similarity(existing_tfidf, tfidf_matrix)

    scores = cosine_sim[0]
    data['similarity_score'] = scores

    completed_courses = employee_data['courseId'].unique()
    filtered_data = data[~data['courseId'].isin(completed_courses)]
    filtered_data_unique = filtered_data.drop_duplicates(subset='courseId')

    recommendations = filtered_data_unique.nlargest(top_n, 'similarity_score')

    return recommendations[['courseId', 'courseName', 'similarity_score']]
