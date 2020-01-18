# expense-manager
Import the sql file and use env.txt as mention below for easy setup

## Setup
- Create database "expense_manager"
- select `expense_manager` as database and import `expense_manager.sql` 
- admin user email = `admin@admin.com`
- admin user password = `test`
- rename `env.txt` to `.env`
- run `composer install`
- run `php artisan passport:install`

## Renew clients
After running `composer install` and `php artisan passport:install` from above, you can change client ids and secret if token is not accepted by OAuth
- save client `id` and client `secret`
- run `npm install `
- on `resources\js\store\stores.js` line 14 and 15, update client `id` ad `secret`
- run `npm run prod`
