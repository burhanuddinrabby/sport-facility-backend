# Sportsify application backend
## Sports Facility Booking Platform

## Technology Used in this application:

*   Programming Language: **TypeScript**
*   Web Framework: **Express.js**
*   ODM & Validation Library: **Mongoose for MongoDB**

### Models:

**User Model:**

*   `name`: *string*
*   `email`: *valid email as string*
*   `password`: *string*
*   `phone`: *string*
*   `role`: *user* | *admin*
*   `address`: *string*

**Facility Model:**

*   `name`: *string*
*   `description`: *string*
*   `pricePerHour`: *number*
*   `location`: *string*
*   `isDeleted`: *true* | *false*

**Booking Model:**

*   `date`: *string* *(YYYY-MM-DD)*
*   `startTime`: *string (HH:SS)* -> "12:00"
*   `endTime`: *string (HH:SS)* -> "12:00"
*   `user`: *ObjectID*
*   `facility`: *ObjectID*
*   `payableAmount`: *number (endTime-startTime)\*pricePerHour*
*   `isBooked`: *confirmed | unconfirmed | canceled*

### API Endpoints
#### User Routes

1. **User Sign Up**
*   **Route**: `POST /api/auth/signup`
*   **Request Body**:

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin",
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```

2. **User Login**
*   **Route**: `POST /api/auth/login`
*   **Request Body**:

```json
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
  }
}
```

  


3. **Create a Facility (Admin Only)**
*   **Route**: `POST /api/facility`
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```


  

4. **Update a Facility (Admin Only)**
*   **Route**: `PUT /api/facility/:id`
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```

* **Response**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

5. **Delete a Facility - Soft Delete (Admin Only)**
*   **Route**: `DELETE /api/facility/:id`
*   **Headers**:

```plain
      Authorization: Bearer JWT_TOKEN
```

*   **Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Updated Tennis Court",
      "description": "Updated outdoor tennis court with synthetic surface.",
      "pricePerHour": 35,
      "location": "789 Sports Ave, Springfield",
      "isDeleted": true
    }
}

```

**6\. Get All Facilities**

*  **Route**: `GET /api/facility`
*  **Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
```

  

#### Booking Routes

  
### 7\. Check Availability
*   **Route**: `GET /api/check-availability`

#### Query Parameters
*   **date** (`string`, optional): The date for which availability is to be checked. Format: `YYYY-MM-DD`. If not provided, today's date will be used by default.


#### Example Request

```sql
GET /api/check-availability?date=2024-06-15
```

#### Example Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
      {
          "startTime": "08:00",
          "endTime": "10:00"
      },
      {
          "startTime": "14:00",
          "endTime": "16:00"
      }
   ]
}

```
**8\. Create a Booking (User Only)**

  *   **Route**: `POST /api/bookings`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```
* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
```

**9\. View All Bookings (Admin Only)**

  *   **Route**: `GET /api/bookings`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}

```
**10\. View Bookings by User (User Only)**

  *   **Route**: `GET /api/bookings/user`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

**11\. Cancel a Booking (User Only)**

  *   **Route**: `DELETE /api/bookings/:id`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": "canceled"
    }
}
```