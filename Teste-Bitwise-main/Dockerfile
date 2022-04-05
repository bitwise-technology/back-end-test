FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    # Clear cache
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    # Install PHP extensions
    && docker-php-ext-install pdo_mysql mbstring exif intl pcntl bcmath \
    && docker-php-ext-configure gd --with-webp --with-jpeg \
    && docker-php-ext-install gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
