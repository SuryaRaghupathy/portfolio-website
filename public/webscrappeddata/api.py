import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        # Parse the incoming JSON data
        data = request.get_json()

        # Print the received JSON data
        print("Received JSON data:", data)

        # Access individual fields from the JSON data
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Print the individual fields (optional)
        print(f"Name: {name}, Email: {email}, Message: {message}")

        # Create the email content
        subject = "New Contact Form Submission"
        body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

        # Send the email
        send_email("digitalsurya1996@gmail.com", subject, body)

        # Send a success response back to the client
        return jsonify({"status": "success", "message": "Message received and email sent!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": "Failed to process the data."}), 500

def send_email(to_email, subject, body):
    try:
        from_email = os.environ.get("EMAIL_ADDRESS")  # Fetch email from environment variable
        from_password = os.environ.get("EMAIL_PASSWORD")  # Fetch password from environment variable

        # Setup the MIME
        message = MIMEMultipart()
        message['From'] = from_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        # Connect to Gmail's SMTP server and send the email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, from_password)
        text = message.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()

        print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email: {e}")

if __name__ == '__main__':
    app.run(debug=True)
