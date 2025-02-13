import dash
from dash import dcc, html
import plotly.graph_objects as go
import random
from flask_cors import CORS
from flask import Flask, jsonify

# Initialize Flask server
server = Flask(__name__)
CORS(server)  # Enable CORS for React communication
app = dash.Dash(__name__, server=server)

# 🔥 FIX: Set a dummy layout to avoid "NoLayoutException"
app.layout = html.Div([
    html.H1("Dash API Backend"),
    html.P("This is a backend for React."),
])

# Updated Topics List (Replacing Products with Customer Experience Topics)
topics = [
    "Customer Satisfaction", "Service Quality", "Communication & Responsiveness",
    "Product Reliability & Performance", "Pricing & Value for Money",
    "Brand Trust & Reputation", "Complaint Resolution & Support",
    "Loyalty & Retention", "Personalization & Customization",
    "Corporate Social Responsibility"
]

# Generate Random Trend Data
def generate_trend_data():
    return [{"x": i, "y": random.uniform(30, 100)} for i in range(20)]

# Generate Random Stats Between 50% and 90%
def generate_random_stats():
    return random.randint(50, 90)

# Create Random Occurrences for Bubble Chart (Simulating Popularity)
topic_counts = [random.randint(5, 30) for _ in topics]

# Sentiment Data for Sankey Chart (Replaced Products with Topics)
sentiments = {
    "Customer Satisfaction": {"Positive": 25, "Negative": 10, "Subtopics": {"Feedback": 8, "Support": 7, "Experience": 10}},
    "Service Quality": {"Positive": 30, "Negative": 15, "Subtopics": {"Speed": 12, "Accuracy": 10, "Consistency": 8}},
    "Communication & Responsiveness": {"Positive": 20, "Negative": 10, "Subtopics": {"Timeliness": 7, "Clarity": 6, "Friendliness": 7}},
    "Product Reliability & Performance": {"Positive": 35, "Negative": 15, "Subtopics": {"Durability": 12, "Efficiency": 13, "Ease of Use": 10}},
    "Pricing & Value for Money": {"Positive": 18, "Negative": 12, "Subtopics": {"Affordability": 5, "Discounts": 7, "Competitive Pricing": 6}},
    "Brand Trust & Reputation": {"Positive": 40, "Negative": 10, "Subtopics": {"Transparency": 15, "History": 12, "Reliability": 13}},
    "Complaint Resolution & Support": {"Positive": 22, "Negative": 18, "Subtopics": {"Response Time": 8, "Resolution Rate": 7, "Satisfaction": 7}},
    "Loyalty & Retention": {"Positive": 28, "Negative": 10, "Subtopics": {"Membership": 9, "Engagement": 10, "Rewards": 9}},
    "Personalization & Customization": {"Positive": 26, "Negative": 8, "Subtopics": {"Recommendations": 10, "Flexibility": 8, "User Experience": 8}},
    "Corporate Social Responsibility": {"Positive": 30, "Negative": 10, "Subtopics": {"Sustainability": 12, "Community Involvement": 9, "Ethical Practices": 9}},
}

# Function to create the Bubble Chart
def create_bubble_chart():
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=[random.randint(-100, 100) for _ in topics],
        y=[random.randint(-100, 100) for _ in topics],
        mode='markers+text',
        marker=dict(
            size=[count * 2 for count in topic_counts],
            color=['#FFA07A' if i % 2 == 0 else '#4682B4' for i in range(len(topics))],
            opacity=0.6
        ),
        text=topics,
        textposition='top center',
        hoverinfo='text'
    ))
    fig.update_layout(title="Customer Experience Insights (Bubble Chart)")
    return fig

# Function to create the Sankey Chart
def create_sankey_chart(selected_topic):
    if not selected_topic or selected_topic not in sentiments:
        return go.Figure()

    sentiment_data = sentiments[selected_topic]
    labels = [selected_topic, 'Positive', 'Negative'] + list(sentiment_data['Subtopics'].keys())

    source = [0, 0]  # Topic to Positive/Negative
    target = [1, 2]  # Positive and Negative
    values = [sentiment_data['Positive'], sentiment_data['Negative']]

    for subtopic, value in sentiment_data['Subtopics'].items():
        source.append(1 if value > 0 else 2)
        target.append(labels.index(subtopic))
        values.append(value)

    fig = go.Figure(go.Sankey(
        node=dict(label=labels, pad=20, thickness=20),
        link=dict(source=source, target=target, value=values, color=['green' if t == 1 else 'red' for t in source])
    ))
    fig.update_layout(title=f"Sentiment Analysis for {selected_topic}")
    return fig

# API Endpoints
@server.route('/bubble-chart', methods=['GET'])
def get_bubble_chart():
    return jsonify(create_bubble_chart().to_plotly_json())

@server.route('/sankey-chart/<topic>', methods=['GET'])
def get_sankey_chart(topic):
    return jsonify(create_sankey_chart(topic).to_plotly_json())

# Run the Server
if __name__ == '__main__':
    server.run(debug=False, host='127.0.0.1', port=8050)
