#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi
if ! command -v docker || ! command -v docker-compose 
then
    echo "Please install docker and docker-compose"
    exit 126
fi
echo "-------------------------------- ^.^ start ^.^ --------------------------------"

echo "                                  ------- ^^^ compose-up ^^^ -------"
sudo docker-compose up -d

echo "------- --> Now go to http://localhost:8000 <-- -------"

while true; do
    read -p "Exit? Y <--" yn
    case $yn in
        [Yy]* ) sudo docker-compose stop; exit 130;;
        * ) echo "the only right answer is Y/y";;
    esac
done
