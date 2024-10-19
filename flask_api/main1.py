from flask import Flask, request, jsonify
import ollama
from paddleocr import PaddleOCR
import concurrent.futures
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
CORS(app)

# Initialize PaddleOCR with GPU support
model = PaddleOCR(lang='en', use_angle_cls=True, use_gpu=True)

# Helper function to extracxt strings
def extract_strings(nested_list):
    extracted_strings = []

    def recursive_extraction(lst):
        for item in lst:
            if isinstance(item, list):
                recursive_extraction(item)
            elif isinstance(item, tuple) and isinstance(item[0], str):
                extracted_strings.append(item[0])

    recursive_extraction(nested_list)
    return extracted_strings

# Perform OCR on the image using GPU
def perform_ocr(file_path):
    result = model.ocr(file_path)
    texts = extract_strings(result)
    resultant_text = "/n".join(texts)
    print(resultant_text)
    return resultant_text

# Send the OCR output to the LLM API for further processing
def get_medicine_and_dosage(ocr_output):
    prompt = """
    This is an example JSON format for a medical prescription, please take a look at it: {"patient": {"name": "John Doe", "age": 45, "gender": "male"}, "prescription": [{"medicine": "Paracetamol", "dosage": "1 tablet", "timing": ["after lunch"]}, {"medicine": "Penicilin", "dosage": "1 tablet", "timing": ["after lunch"]}]}
    The following is the text generated from an OCR system. Thus, it may not be in proper shape, and some words or characters might be missing or incorrect. Please correct them.
    Only input medicine names that actually exist, make sure to double check.
    You must understand any mistakes or missing parts and correct them properly.
    You will generate JSON from this, that must have the following fields:
    1) Patient - name, age, gender(male/female)
    2) Prescription - array of medicines, each medicine has the following fields - [medicine, dosage, timing(array of any of the following values: (before lunch/after lunch, before dinner/after dinner))]
    Ignore any text that does not make sense to you, and while creating the JSON output, you may refer to the above JSON format I gave you. 
    You must only output the JSON, and no other text at all.
    Only replace values in the above given JSON format. THATS ALL YOU HAVE TO DO.
    ONLY OUTPUT THE JSON. NO OTHER TEXT AT ALL!!!!!
    YOU ARE NOT ALLOWED TO CHANGE THE FORMAT OF THE JSON FILE! ONLY REPLACE THE VALUES! MAKE SURE YOU DON'T ADD ANY ADDITIONAL FIELDS!!  
    This is the OCR generated text: 
    """
    prompt = prompt + ocr_output
    response = ollama.chat(model='llama3.2', messages=[
        {
            'role': 'user',
            'content': prompt
        },
    ])
    return response['message']['content']

# Function to handle both OCR and API processing concurrently
def process_image(file_path):
    ocr_output = perform_ocr(file_path)
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(get_medicine_and_dosage, ocr_output)
        corrected_text = future.result()
    return corrected_text

# API endpoint to upload image and process OCR
@app.route('/process_prescription', methods=['POST'])
def process_prescription():
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400
    
    image_file = request.files['image']
    file_path = f"./{image_file.filename}"
    image_file.save(file_path)

    try:
        result = process_image(file_path)
        return jsonify({"corrected_text": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)  # Change port here, allow network access
