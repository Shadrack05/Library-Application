# Lending Management System

## Overview
The **Lending Management System** is a web application built with **Ruby on Rails** to help manage book lending. It allows users to borrow books, track borrowing history, and manage returns efficiently.

## Features
- **Book Management**: Add, edit, and delete books.
- **Lending System**: Borrow and return books with tracking.
- **Search & Pagination**: Easily search books and paginate results.
- **Borrower History**: View the history of a specific borrower.
- **API Endpoints**: RESTful API for integrating with frontend applications.
- **Data Integrity**: Includes model validations to ensure valid data.

## Installation
### Prerequisites
Ensure you have the following installed:
- **Ruby** (version 3.4.1)
- **Rails** (version 8.0.1)
- **SQLite3** 
- **Git**
- **Node.js & npm**  (for frontend dependencies)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/Shadrack05/Library-Application.git
   cd Library-Application
   ```

2. **Install dependencies**
   ```sh
   bundle install
   npm install
   ```

3. **Set up the database**
   ```sh
   rails db:setup
   ```
   *For migrations, use:*
   ```sh
   rails db:create 
   rails db:migrate
   ```

4. **Start the server**
   ```sh
   rails server
   bin/vite dev 
   ```
   Then open `http://127.0.0.1:3000` in your browser.


## Running Tests
To ensure the app works correctly, run:
```sh
rails test
```

Developed by **Shadrack Omuya** 🚀

