
# Critiqly

## Project Description

Critiqly is an AI-powered, gamified code review platform designed to elevate your code review experience. It provides engaging onboarding and practical ways for new hires to learn and contribute to code reviews. Users can practice code reviews, receive instant AI feedback, and immerse themselves in company code review standards at their own pace. Critiqly helps users improve their code review skills through adaptive learning and levels that match their skill levels.

## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI
- **Database**: MongoDB
- **Deployment**: AWS Elastic Beanstalk (EBS) and AWS Amplify

## Prerequisites

- Python 3.10 or higher
- Node.js and npm

## Installation and Setup

### Frontend

1. Clone the repository:
   \`\`\`sh
   git clone https://github.com/yourusername/critiqly.git
   \`\`\`

2. Navigate to the frontend directory:
   \`\`\`sh
   cd critiqly/frontend
   \`\`\`

3. Create a \`.env\` file with the following content:
   \`\`\`env
   REACT_APP_API_URL=http://127.0.0.1:8000
   \`\`\`

4. Install dependencies and start the development server:
   \`\`\`sh
   npm install
   npm start
   \`\`\`

### Backend

1. Navigate to the backend directory:
   \`\`\`sh
   cd ../backend
   \`\`\`

2. Create a \`.env\` file with the following content:
   \`\`\`env
   mongoURL=<your_mongo_url>
   OPENAI_API_KEY=<your_openai_api_key>
   OPENAI_ENDPOINT=<your_openai_endpoint>
   \`\`\`

3. Install dependencies:
   \`\`\`sh
   pip install -r requirements.txt
   \`\`\`

4. Start the FastAPI server:
   \`\`\`sh
   uvicorn app.main:app --port 8000 --reload
   \`\`\`

## Endpoints

### Default

### User Interaction

- **POST** \`/UserInteraction\`
  - **Request Body**:
    \`\`\`json
    {
      "code": {
        "difficulty": "string",
        "number_of_mistakes": 0,
        "mistakes_found": 0,
        "lines": [
          {
            "line_number": 0,
            "is_modified": true,
            "is_correct": false,
            "versions": [
              {
                "id": 0,
                "code": "string"
              }
            ]
          }
        ],
        "readme": "string"
      },
      "user_input": "string"
    }
    \`\`\`
  - **Responses**:
    - \`200\`: Successful Response
    - \`422\`: Validation Error

### Insert Easy Level

- **POST** \`/InsertEasyLevel\`
  - **Responses**:
    - \`200\`: Successful Response

### Get Levels

- **GET** \`/LoadLevel\`
  - **Parameters**:
    - \`difficulty\` (query parameter, required)
  - **Responses**:
    - \`200\`: Successful Response
    - \`422\`: Validation Error

### Sign In

- **POST** \`/signin\`
  - **Request Body**:
    \`\`\`json
    {
      "email": "string",
      "password": "string"
    }
    \`\`\`
  - **Responses**:
    - \`200\`: Successful Response
    - \`422\`: Validation Error

### Sign Up

- **POST** \`/signup\`
  - **Request Body**:
    \`\`\`json
    {
      "email": "string",
      "password": "string"
    }
    \`\`\`
  - **Responses**:
    - \`200\`: Successful Response
    - \`422\`: Validation Error

## Deployment

### Amplify

1. Connect your GitHub repository to AWS Amplify.
2. Amplify will handle the deployment of the frontend.

### Elastic Beanstalk

1. Set up your environment variables in GitHub Secrets:
   - \`S3_BUCKET\`: Your S3 bucket name
   - \`EB_APPLICATION_NAME\`: Your Elastic Beanstalk application name
   - \`EB_ENVIRONMENT_NAME\`: Your Elastic Beanstalk environment name
   - \`AWS_ACCESS_KEY_ID\`: Your AWS access key ID
   - \`AWS_SECRET_ACCESS_KEY\`: Your AWS secret access key

2. Use the following GitHub Actions workflow for deployment:

   \`\`\`yaml
   name: CD Pipeline

   on:
     push:
       branches:
         - main
     workflow_dispatch:

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       env:
         AWS_REGION: us-east-1
         S3_BUCKET: ${{ secrets.S3_BUCKET }}
         EB_APPLICATION_NAME: ${{ secrets.EB_APPLICATION_NAME }}
         EB_ENVIRONMENT_NAME: ${{ secrets.EB_ENVIRONMENT_NAME }}
         AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
         AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

       steps:
       - name: Checkout code
         uses: actions/checkout@v2

       - name: Set up Python
         uses: actions/setup-python@v2
         with:
           python-version: '3.10'

       - name: Install dependencies for FastAPI
         working-directory: ./backend
         run: |
           python -m pip install --upgrade pip
           pip install -r requirements.txt

       - name: Configure AWS credentials
         uses: aws-actions/configure-aws-credentials@v1
         with:
           aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
           aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
           aws-region: us-east-1

       - name: Deploy FastAPI to Elastic Beanstalk
         working-directory: ./backend
         run: |
           zip -r app.zip .
           aws s3 cp app.zip s3://$S3_BUCKET/
           aws elasticbeanstalk create-application-version --application-name $EB_APPLICATION_NAME --version-label $GITHUB_SHA --source-bundle S3Bucket=$S3_BUCKET,S3Key=app.zip
           aws elasticbeanstalk update-environment --environment-name $EB_ENVIRONMENT_NAME --version-label $GITHUB_SHA
   \`\`\`

## Contributors

- Jason Tang
- Sarah Kim
- Mazen Youssef
- Omar Bakr

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For more information, please contact the maintainers at [email@example.com](mailto:omarcodes2@gmail.com).
