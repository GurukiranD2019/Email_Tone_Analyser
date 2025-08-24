# API Documentation

This document provides comprehensive documentation for the Email Tone Analyzer API endpoints.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## API Endpoints

### 1. Health Check

Check if the API server is running and healthy.

**Endpoint:** `GET /health`

**Response:**

```json
{
  "success": true,
  "message": "Backend server is running",
  "timestamp": "2025-08-12T10:30:00.000Z"
}
```

**Status Codes:**

- `200 OK` - Server is healthy

---

### 2. Submit Contact Form

Submit a new contact form inquiry.

**Endpoint:** `POST /contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Technical Support Request",
  "message": "I need help with the email analysis feature...",
  "type": "technical"
}
```

**Request Fields:**

- `name` (string, required) - Full name of the person
- `email` (string, required) - Valid email address
- `subject` (string, required) - Subject line for the inquiry
- `message` (string, required) - Detailed message content
- `type` (string, optional) - Type of inquiry (default: "general")

**Inquiry Types:**

- `general` - General inquiries
- `technical` - Technical support
- `backend` - Backend development
- `business` - Business partnerships
- `feedback` - Feedback and suggestions
- `bug` - Bug reports

**Response (Success):**

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "1691234567890"
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "All required fields must be provided"
}
```

**Status Codes:**

- `200 OK` - Form submitted successfully
- `400 Bad Request` - Missing required fields or invalid data
- `500 Internal Server Error` - Server error during submission

---

### 3. Get All Contacts (Admin)

Retrieve all contact form submissions.

**Endpoint:** `GET /contacts`

**Response:**

```json
{
  "success": true,
  "contacts": [
    {
      "id": "1691234567890",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "subject": "Technical Support Request",
      "message": "I need help with the email analysis feature...",
      "type": "technical",
      "timestamp": "2025-08-12T10:30:00.000Z",
      "status": "new",
      "updatedAt": "2025-08-12T11:00:00.000Z"
    }
  ]
}
```

**Contact Object Fields:**

- `id` (string) - Unique identifier
- `name` (string) - Contact's full name
- `email` (string) - Contact's email address
- `subject` (string) - Subject of inquiry
- `message` (string) - Message content
- `type` (string) - Type of inquiry
- `timestamp` (string) - ISO date when submitted
- `status` (string) - Current status
- `updatedAt` (string) - ISO date when last updated

**Status Values:**

- `new` - New submission
- `in-progress` - Being processed
- `resolved` - Issue resolved
- `closed` - Inquiry closed

**Status Codes:**

- `200 OK` - Contacts retrieved successfully
- `500 Internal Server Error` - Error retrieving contacts

---

### 4. Get Contact by ID

Retrieve a specific contact submission by ID.

**Endpoint:** `GET /contact/:id`

**URL Parameters:**

- `id` (string) - Contact ID

**Response (Success):**

```json
{
  "success": true,
  "contact": {
    "id": "1691234567890",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Technical Support Request",
    "message": "I need help with the email analysis feature...",
    "type": "technical",
    "timestamp": "2025-08-12T10:30:00.000Z",
    "status": "new"
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Contact not found"
}
```

**Status Codes:**

- `200 OK` - Contact found and returned
- `404 Not Found` - Contact with specified ID not found
- `500 Internal Server Error` - Server error

---

### 5. Update Contact Status

Update the status of a contact submission.

**Endpoint:** `PATCH /contact/:id/status`

**URL Parameters:**

- `id` (string) - Contact ID

**Request Body:**

```json
{
  "status": "in-progress"
}
```

**Valid Status Values:**

- `new`
- `in-progress`
- `resolved`
- `closed`

**Response (Success):**

```json
{
  "success": true,
  "message": "Contact status updated",
  "contact": {
    "id": "1691234567890",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Technical Support Request",
    "message": "I need help with the email analysis feature...",
    "type": "technical",
    "timestamp": "2025-08-12T10:30:00.000Z",
    "status": "in-progress",
    "updatedAt": "2025-08-12T11:30:00.000Z"
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Contact not found"
}
```

**Status Codes:**

- `200 OK` - Status updated successfully
- `404 Not Found` - Contact with specified ID not found
- `500 Internal Server Error` - Server error

---

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common error scenarios:

- **Validation Errors**: Missing required fields, invalid email format
- **Not Found Errors**: Requested resource doesn't exist
- **Server Errors**: Database issues, file system errors

## Rate Limiting

Currently, there is no rate limiting implemented. In a production environment, consider implementing rate limiting to prevent abuse.

## CORS Configuration

The API is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)

## Data Storage

All contact submissions are stored in a JSON file located at:

```
server/data/contacts.json
```

The data structure is an array of contact objects with automatic ID generation using timestamps.

## Example Usage

### JavaScript/TypeScript

```typescript
// Submit contact form
const submitContact = async (formData: ContactForm) => {
  try {
    const response = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Contact submitted:", result.id);
    } else {
      console.error("Error:", result.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

// Get all contacts (admin)
const getContacts = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/contacts");
    const result = await response.json();

    if (result.success) {
      return result.contacts;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

// Update contact status
const updateContactStatus = async (id: string, status: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/contact/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.contact;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return null;
  }
};
```

### cURL Examples

```bash
# Health check
curl http://localhost:3001/api/health

# Submit contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Subject",
    "message": "Test message",
    "type": "general"
  }'

# Get all contacts
curl http://localhost:3001/api/contacts

# Get specific contact
curl http://localhost:3001/api/contact/1691234567890

# Update contact status
curl -X PATCH http://localhost:3001/api/contact/1691234567890/status \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'
```

## Security Considerations

For production deployment, consider implementing:

1. **Authentication**: Add API key or JWT token authentication
2. **Rate Limiting**: Prevent abuse with rate limiting middleware
3. **Input Validation**: Stronger validation and sanitization
4. **CORS**: Restrict CORS to specific domains
5. **HTTPS**: Use secure connections
6. **Database**: Replace JSON file storage with a proper database
7. **Logging**: Add comprehensive request/response logging
8. **Error Handling**: Avoid exposing sensitive error information

## Future Enhancements

Planned API improvements:

- User authentication endpoints
- Email analysis API endpoints
- File upload for email attachments
- Advanced filtering and pagination
- Real-time notifications via WebSocket
- Integration with external email services
