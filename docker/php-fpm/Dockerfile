FROM php:8.1.0-fpm-alpine

# Install packages
RUN apk add --no-cache curl git build-base zlib-dev oniguruma-dev autoconf bash

# Xdebug
ARG INSTALL_XDEBUG=false
RUN if [ ${INSTALL_XDEBUG} = true ]; \
    then \
      pecl install xdebug && docker-php-ext-enable xdebug; \
    fi;

COPY ./docker/php-fpm/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ARG SYMFONY_CLI_VERSION=4.28.0
RUN wget https://github.com/symfony/cli/releases/download/v$SYMFONY_CLI_VERSION/symfony_linux_amd64.gz \
    && gzip -d symfony_linux_amd64.gz \
    && mv symfony_linux_amd64 symfony \
    && chmod +x symfony \
    && mv symfony /usr/local/bin/

RUN apk add --update nodejs npm \
    && npm install --global yarn

# Postgres
RUN apk add --no-cache libpq-dev && docker-php-ext-install pdo_mysql


# Source code
RUN chown www-data:www-data /var/www
COPY --chown=www-data:www-data ./ /var/www
WORKDIR /var/www

USER www-data



CMD ["php-fpm", "-F"]

EXPOSE 9000
