from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import base64
from pathlib import Path
import cv2
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage
from flask_cors import CORS, cross_origin

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS globally
CORS(app)

# Function to process image
def process_image(path):
    img = cv2.imread(str(path))
    height, width = img.shape[:2]
    min_dimension = 400
    scale_factor = max(min_dimension / width, min_dimension / height)
    new_width = int(width * scale_factor)
    new_height = int(height * scale_factor)
    resized_image = cv2.resize(img, (new_width, new_height))
    output_path = f'{path}_processed.jpg'
    cv2.imwrite(output_path, resized_image)
    return output_path

# Initialize OpenAI Chat model
llm = ChatOpenAI(model="gpt-4o-mini")
output_parser = StrOutputParser()

@app.route('/process_prescription', methods=['POST', 'OPTIONS'])
@cross_origin()  # Enable CORS for this route
def process_prescription():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    image_path = Path("uploaded_image.jpeg")
    image_file.save(image_path)

    # Process image
    processed_image_path = process_image(image_path)

    # Convert processed image to base64
    with open(processed_image_path, "rb") as file:
        base64_image_data = base64.b64encode(file.read()).decode('utf-8')

    # Prepare message for OpenAI model
    message = HumanMessage(
        content=[
            {"type": "text", "text": """The image that you will receive now is an image of a medical prescription. 
This is an example of a JSON format that we are using to store prescription data.
"patient": {
           "name": "John Doe",
           "age": 45,
           "gender": "male",
           "prescribedBy": "Dr. Sarah Smith"
         },
         "prescription": [
           {
             "medicine": "Paracetamol",
             "dosage": "500mg",
             "timing": ["after lunch"]
           },
           {
             "medicine": "Amoxicillin",
             "dosage": "250mg",
             "timing": ["before lunch", "after lunch"]
           },
           {
             "medicine": "Vitamin D3",
             "dosage": "1000IU",
             "colour": "yellow",
             "timing": ["with breakfast"]
           },
           {
             "medicine": "Metformin",
             "dosage": "850mg",
             "timing": ["after breakfast", "after dinner"]
           }
         ]
        Please fill these values from the image I give you, and return in comma saprated form. Don't write anything else."""},
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{base64_image_data}"},
            },
        ],
    )

    # Send message to OpenAI and get response
    response = llm.invoke([message])
    
    # Return the response from OpenAI
    return jsonify({"prescription_data": response.content})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)
