FROM php:8.0-apache

RUN apt-get update && apt-get install -y \
    unixodbc-dev libgssapi-krb5-2 gnupg2 \
    && docker-php-ext-install pdo pdo_mysql

# Install Microsoft ODBC driver and PHP extensions for SQL Server
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && pecl install pdo_sqlsrv \
    && docker-php-ext-enable pdo_sqlsrv

COPY . /var/www/html
