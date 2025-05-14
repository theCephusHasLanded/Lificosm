#!/bin/sh

# This script replaces environment variables in the turnserver.conf file
# and starts the TURN server with the updated configuration

CONFIG_FILE="/etc/turnserver.conf"
TEMP_CONFIG="/tmp/turnserver.conf.tmp"

# Copy the original config
cp $CONFIG_FILE $TEMP_CONFIG

# Replace environment variables
sed -i "s/\${TURN_SERVER_PORT:3478}/$TURN_SERVER_PORT/g" $TEMP_CONFIG
sed -i "s/\${TURN_SERVER_REALM:lificosm.com}/$TURN_SERVER_REALM/g" $TEMP_CONFIG
sed -i "s/\${TURN_SECRET:changeit}/$TURN_SECRET/g" $TEMP_CONFIG

# Move the updated config back
mv $TEMP_CONFIG $CONFIG_FILE

echo "TURN server configuration updated with environment variables"