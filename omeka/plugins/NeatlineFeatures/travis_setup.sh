#! /usr/bin/env bash

if [ -z $OMEKA_BRANCH ]; then
OMEKA_BRANCH=stable-1.5
fi

export PLUGIN_DIR=`pwd`
export OMEKA_DIR=`pwd`/omeka

mysql -e "create database IF NOT EXISTS omeka_test;" -uroot;
git clone https://github.com/omeka/Omeka.git $OMEKA_DIR

# check out the correct branch
cd $OMEKA_DIR && git checkout $OMEKA_BRANCH
cd $PLUGIN_DIR

# move configuration files
mv $OMEKA_DIR/application/config/config.ini.changeme $OMEKA_DIR/application/config/config.ini
mv $OMEKA_DIR/application/tests/config.ini.changeme $OMEKA_DIR/application/tests/config.ini

# set up testing config
sed -i 's/db.host = ""/db.host = "localhost"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/db.username = ""/db.username = "root"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/db.dbname = ""/db.dbname = "omeka_test"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/email.to = ""/email.to = "test@example.com"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/email.administator = ""/email.administrator = "admin@example.com"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/paths.maildir = ""/paths.maildir = "\/tmp"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/paths.imagemagick = ""/paths.imagemagick = "\/usr\/bin\/"/' $OMEKA_DIR/application/tests/config.ini
sed -i 's/256M/512M/' $OMEKA_DIR/application/tests/bootstrap.php

# symlink the plugin
cd $OMEKA_DIR/plugins && ln -s $PLUGIN_DIR 

# Now we set up the running Omeka instance for Cukes.
cat <<EOF > $OMEKA_DIR/db.ini
[database]
host     = "localhost"
username = "root"
password = ""
dbname   = "omeka"
prefix   = "omeka_"
charset  = "utf8"
EOF
cp $OMEKA_DIR/.htaccess.changeme $OMEKA_DIR/.htaccess
sed -i 's/[; ]*debug.exceptions *=.*/debug.exceptions = 1/' $OMEKA_DIR/application/config/config.ini 

mysql -uroot -e "CREATE DATABASE omeka CHARACTER SET = 'utf8' COLLATE = 'utf8_unicode_ci';"
gzip -cd $PLUGIN_DIR/features/data/db-dump.sql.gz | mysql -uroot omeka

# This has to be changed because sometimes Omeka passes empty strings into
# databases.
echo "SET GLOBAL sql_mode='';" | mysql -uroot

# Set up the site in Apache.
echo "Set up web site."
sudo apt-get clean
sudo apt-get update
sudo apt-get install apache2 libapache2-mod-php5 php5-mysql
sudo cp /etc/apache2/sites-available/default /etc/apache2/sites-available/omeka
ESCAPED_DIR=$(echo $OMEKA_DIR | sed 's|/|\\/|g')
sudo sed -i 's|/var/www|'$ESCAPED_DIR'|' /etc/apache2/sites-available/omeka
sudo sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/sites-available/omeka
sudo a2dissite default && sudo a2ensite omeka
sudo a2enmod php5
sudo a2enmod rewrite
sudo /etc/init.d/apache2 restart

