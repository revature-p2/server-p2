az vm create -g yoyo -n bestvm --custom-data './cloud-config.txt' --image UbuntuLTS --size Standard_B1s --public-ip-address-dns-name mybestweb --generate-ssh-keys

az vm open-port --port 3000 -n bestvm -g yoyo