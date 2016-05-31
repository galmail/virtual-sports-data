

Steps to deploy on AWS
-----------------------

1. Launch New Instance: Ubuntu 64-bit
2. Configure Security for Inbound HTTP calls.
3. SSH to the machine and run:

sudo apt-get update
sudo apt-get install phantomjs
sudo apt-get install git
sudo apt-get install mongodb
sudo apt-get install npm
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
curl https://install.meteor.com/ | sh
git clone https://github.com/galmail/virtual-sports-data
cd virtual-sports-data
meteor


4. Test that the app is working properly.
5. Build the app (Ubuntu 64bit):


Install dependencies:

npm install fibers --save
npm install phantom --save
npm install --production
meteor build ../vsd-build --architecture os.linux.x86_64
cd ../vsd-build
tar xvzf virtual-sports-data.tar.gz
cd bundle
(cd programs/server && npm install)
MONGO_URL=mongodb://localhost:27017/virtual-sports-data ROOT_URL=http://54.171.253.30 node main.js > logs.txt


