# ECOMMAPP - E-Commerce Backend

A Laravel-based RESTful API for an e-commerce application with user authentication, product management, and order processing capabilities.

## Features

- **User Management**
  - User registration and authentication
  - Role-based access control (Admin, User)
  - Personal access tokens for API authentication

- **Product Management**
  - Product catalog with detailed information
  - Product creation and management

- **Order Processing**
  - Order placement and tracking
  - Queue-based job processing

- **Database**
  - User and product data management
  - Caching system
  - Session management

## Tech Stack

- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Database**: MySQL/PostgreSQL (configured in .env)
- **Authentication**: Laravel Sanctum (Token-based)
- **Task Queue**: Laravel Queue
- **Frontend**: Vue.js + Vite

## Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js & npm
- MySQL/PostgreSQL

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ali-chnitifa-12/ECOMMAPP.git
   cd ECOMMAPP
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Set up the database**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Build assets**
   ```bash
   npm run build
   ```

## Running the Application

### Development Server
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Watch for Asset Changes
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Orders
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details

## Testing

Run the test suite:
```bash
php artisan test
```

Run specific tests:
```bash
php artisan test tests/Feature
php artisan test tests/Unit
```

## Database Migrations

Run migrations:
```bash
php artisan migrate
```

Rollback migrations:
```bash
php artisan migrate:rollback
```

Fresh migration (resets database):
```bash
php artisan migrate:fresh
```

## Seeding

Populate database with sample data:
```bash
php artisan db:seed
```

Seed specific seeder:
```bash
php artisan db:seed --class=AdminSeeder
```

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/      # API controllers
│   │   ├── Middleware/       # HTTP middleware
│   │   └── Requests/         # Form request validations
│   ├── Models/               # Eloquent models
│   └── Providers/            # Service providers
├── config/                   # Configuration files
├── database/
│   ├── migrations/           # Database migrations
│   ├── seeders/              # Database seeders
│   └── factories/            # Model factories
├── routes/
│   ├── api.php               # API routes
│   ├── web.php               # Web routes
│   └── console.php           # Artisan commands
├── resources/
│   ├── views/                # Blade templates
│   ├── css/                  # Stylesheets
│   └── js/                   # JavaScript files
├── tests/                    # Automated tests
└── storage/                  # File storage
```

## Key Models

- **User**: User accounts with roles and authentication
- **Product**: E-commerce products with descriptions and pricing

## Queue Jobs

The application uses Laravel Queue for background job processing:
```bash
php artisan queue:work
```

## Security

- Uses Laravel Sanctum for API authentication
- Implements middleware for authorization
- CSRF protection enabled
- SQL injection prevention through Eloquent ORM
- XSS protection via Blade templating

## File Uploads

User and product files are stored in:
- `storage/app/public` - Public files
- `storage/app/private` - Private files

Create symbolic link for public storage:
```bash
php artisan storage:link
```

## Environment Variables

Key environment variables in `.env`:
- `APP_NAME` - Application name
- `APP_ENV` - Environment (local, production)
- `APP_DEBUG` - Debug mode
- `DB_*` - Database configuration
- `MAIL_*` - Email configuration
- `SANCTUM_STATEFUL_DOMAINS` - CORS domains

## Troubleshooting

### Database Connection Issues
- Verify database credentials in `.env`
- Ensure database server is running
- Check database creation

### Permission Errors
```bash
chmod -R 775 storage bootstrap/cache
```

### Cache Issues
```bash
php artisan cache:clear
php artisan config:clear
```

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## Support

For issues and questions, please create an issue on GitHub.

## License

This project is licensed under the MIT License.

## Author

**Ali Chnitifa**
- GitHub: [@ali-chnitifa-12](https://github.com/ali-chnitifa-12)

---

**Last Updated**: March 25, 2026
