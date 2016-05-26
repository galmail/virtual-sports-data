

Steps to deploy on AWS
-----------------------

1. Launch New Instance: Ubuntu 64-bit
2. Configure Security for Inbound HTTP calls.
3. SSH to the machine and run:

sudo apt-get update
sudo apt-get install phantomjs
sudo apt-get install git
sudo apt-get install npm
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
curl https://install.meteor.com/ | sh
git clone https://github.com/galmail/virtual-sports-data
cd virtual-sports-data
meteor


