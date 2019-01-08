FROM php:7.0-apache


RUN apt-get update && apt-get install -y libmagickwand-dev imagemagick --no-install-recommends
RUN pecl install imagick  && docker-php-ext-enable imagick

RUN docker-php-ext-install -j$(nproc) mysqli pdo_mysql
RUN apt-get install -y sendmail sendmail-bin mailutils && rm -rf /var/lib/apt/lists/*
RUN a2enmod rewrite

COPY config/php.ini /usr/local/etc/php/
CMD /usr/sbin/service sendmail restart && /usr/local/bin/apache2-foreground
