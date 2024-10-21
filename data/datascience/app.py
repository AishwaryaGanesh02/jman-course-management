from flask import Flask, request, jsonify
from recommendations import recommend_courses

app = Flask(__name__)


@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    employee_id = request.args.get('employeeId', type=int)

    if employee_id is None:
        return jsonify({'error': 'employeeId is required'}), 400

    recommendations = recommend_courses(employee_id)

    if recommendations is None:
        return jsonify({'error': f"No data found for employee ID: {employee_id}"}), 404

    return jsonify(recommendations.to_dict(orient='records'))


if __name__ == '__main__':
    app.run()
