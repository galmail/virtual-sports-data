Steps to deploy on AWS
-----------------------

1. Launch New Instance: Ubuntu 64-bit
2. Configure Security for Inbound HTTP calls.
3. SSH to the production machine and run:

```
sudo apt-get update
sudo apt-get install npm
sudo npm install npm -g
```

4. Install Correct Node Version (0.10.43)

```
sudo apt-get install build-essential libssl-dev
curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
source ~/.profile
nvm install 0.10.43
ln -s ~/.nvm/0.10.43/bin/node /usr/bin/node
```

5. Check Node Version: node -v

6. Deploy with MUP from local machine:

```
DEBUG=* mup setup
DEBUG=* mup deploy
```

7. SSH to the production machine and run:

```
sudo chown -R ubuntu:root /opt/virtual-sports-data/*
sudo vi /opt/virtual-sports-data/app/package.json
```

8. Add the following dependency:

```
"phantom": "2.1.2"
```

9. (cd programs/server && npm install)

10. From local machine run:

```
mup stop
mup start 
```

*****************************************

```
#sudo apt-get install phantomjs
#sudo apt-get install git
#sudo apt-get install mongodb
#sudo apt-get install npm
#curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
#sudo apt-get install -y nodejs
#curl https://install.meteor.com/ | sh
#git clone https://github.com/galmail/virtual-sports-data
#cd virtual-sports-data
#meteor
```

Steps to Backup and Restore Database
--------------------------------

##Backup Database

```
ssh -i "VirtualSports.pem" ubuntu@ec2-54-194-68-227.eu-west-1.compute.amazonaws.com
mongodump -h localhost:27017 -d virtual-sports-data
exit
scp -r -i "VirtualSports.pem" ubuntu@ec2-54-194-68-227.eu-west-1.compute.amazonaws.com:/home/ubuntu/dump .
```

##Restore Database

```
scp -r -i "VirtualSports.pem" dump ubuntu@ec2-54-194-68-227.eu-west-1.compute.amazonaws.com:/home/ubuntu/
ssh -i "VirtualSports.pem" ubuntu@ec2-54-194-68-227.eu-west-1.compute.amazonaws.com
mongorestore -h localhost:27017 -d virtual-sports-data dump/virtual-sports-data
```

