from flask import Flask, session, jsonify
import os
import socket

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')

SERVER_ID = os.environ.get('SERVER_ID', socket.gethostname())

@app.route('/')
def index():
    """Main endpoint showing which server handles the request."""
    if 'visit_count' not in session:
        session['visit_count'] = 0
    session['visit_count'] += 1

    # Track which servers have handled this session
    if 'servers_seen' not in session:
        session['servers_seen'] = []
    if SERVER_ID not in session['servers_seen']:
        session['servers_seen'] = session['servers_seen'] + [SERVER_ID]

    return jsonify({
        'server_id': SERVER_ID,
        'hostname': socket.gethostname(),
        'visit_count': session['visit_count'],
        'servers_seen': session['servers_seen'],
        'message': f'Hello from {SERVER_ID}!'
    })

@app.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({'status': 'healthy', 'server_id': SERVER_ID})

@app.route('/reset')
def reset():
    """Reset the session."""
    session.clear()
    return jsonify({'message': 'Session cleared', 'server_id': SERVER_ID})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
