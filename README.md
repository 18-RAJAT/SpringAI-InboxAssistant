# AI-Powered Email Management: Web Application and Browser Extension <img src="https://github.com/user-attachments/assets/671fc71c-3d65-4a2b-afca-8157b6bb2651" alt="Icon" width="20" height="20" style="border-radius: 50%;">



<p align="center">
  <img src="https://github.com/user-attachments/assets/70488be6-5b5c-4d4e-9329-b6f3becb0d11" alt="Image" style="width:50%; height:auto;">
</p>



[![Java Version](https://img.shields.io/badge/Java-17%2B-blue?style=flat-square)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2%2B-brightgreen?style=flat-square)](https://spring.io/projects/spring-boot)
[![API](https://img.shields.io/badge/API-RESTful-yellow?style=flat-square)](https://en.wikipedia.org/wiki/Representational_state_transfer)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square)](https://reactjs.org/)
[![Extensions](https://img.shields.io/badge/Extensions-Custom-orange?style=flat-square)](https://developer.chrome.com/docs/extensions)
[![Build Status](https://img.shields.io/badge/Build-Passing-pink?style=flat-square)](https://github.com/18-RAJAT/SpringAI-InboxAssistant/actions)
[![Code Style](https://img.shields.io/badge/Code%20Style-Checkstyle-darkblue?style=flat-square)](https://checkstyle.sourceforge.io/)




An intelligent email management system powered by Spring Boot and AI that helps you handle your inbox more efficiently through automated categorization, smart responses, and email analysis.

## Features ✨

- **AI-Powered Email Responses**: Automatically generate context-aware email replies
- **Smart Categorization**: Automatically classify emails into categories (Important, Spam, Social, etc.)
- **Email Summarization**: Get concise summaries of long email threads
- **Sentiment Analysis**: Detect the emotional tone of incoming emails
- **Follow-up Reminders**: Automatic reminders for important unanswered emails
- **Template Suggestions**: AI-generated email templates for common responses

## Tech Stack 🛠️

- **Backend**: Spring Boot 3.2
- **AI Integration**: Spring AI
- **Email Processing**: JavaMail API
- - **Natural Language Processing**: [![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange?style=flat)](https://ai.google/get-started/gemini-ecosystem/)
- **Database**:
  - Development: [![H2 Database](https://img.shields.io/badge/Database-H2-brown?style=flat-square&logo=h2)](https://www.h2database.com/)
  - Production: [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
- - **API Documentation**: [![Gemini API](https://img.shields.io/badge/Google%20Gemini-API-purple?style=flat)](https://ai.google.dev/gemini-api/docs)
- **Build Tool**: Maven

## Prerequisites 📋

- [![Java Version](https://img.shields.io/badge/Java-17%2B-blue?style=flat-square)](https://www.java.com/)
- [![Maven Version](https://img.shields.io/badge/Maven-3.9%2B-C71A36?style=flat-square)](https://maven.apache.org/)
- [![Gemini API Key](https://img.shields.io/badge/Google_Gemini-API_Key-FF6F00?style=flat-square)](https://ai.google.dev/gemini-api/docs/api-key)
- [![Email Account Credentials](https://img.shields.io/badge/Email_Account-Credentials-0078D4?style=flat-square)](https://support.google.com/mail/answer/7126229?hl=en)


## System Design 📊
![System Design](https://github.com/user-attachments/assets/62ead8dd-838a-4b16-a037-a9a72d8b1cd0)

## Installation & Setup ⚙️

1. **Clone the repository**:
   ```bash
   git clone https://github.com/18-RAJAT/SpringAI-InboxAssistant.git
   cd SpringAI-InboxAssistant
   ```

2. **Build the project**:
   ```bash
   mvn clean install
   ```

3. **Configure environment variables**:
   - Create `application.yml` in `src/main/resources/`:
   ```yaml
   spring:
      spring.application.name=email-writer
      gemini.api.url=${GEMINI_URL}
      gemini.api.key=${GEMINI_KEY}
      server.port=9191

   ```

4. **Start the application**:
   ```bash
   mvn spring-boot:run
   ```
5. **Access API documentation**:  
   [![Swagger UI](https://img.shields.io/badge/Swagger%20UI-YourColorCode?style=for-the-badge)](https://swagger.io/tools/swagger-ui/)
   [![OpenAPI Spec](https://img.shields.io/badge/OpenAPI%20Spec-85EA2D?style=for-the-badge)](https://swagger.io/specification/)


## Example API Request 🚀

```bash
curl -X POST "http://localhost:9191/api/email/generate" \
-H "Content-Type: application/json" \
-d '{
  "emailContent": "Hi, I'm following up on our meeting last week. When can we expect the project deliverables?",
  "tone": "professional"
}'
```

## Key API Endpoints 📡

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/email/generate` | POST | Generate AI-powered email responses |
| `/api/email/categorize` | POST | Categorize incoming emails |
| `/api/email/summarize` | POST | Summarize email threads |
| `/api/email/analyze-sentiment` | POST | Perform sentiment analysis on email content |
| `/api/email/schedule-followup` | POST | Schedule follow-up reminders |

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Acknowledgements 😇

- Spring AI team for the amazing AI integration capabilities
- Gemini for their powerful language models
- The Spring Boot community for continuous support and improvements
