pkg update -y && pkg install git unzip -y && termux-setup-storage && sleep 10 && git config --global user.name "xeumingproject" && git config --global user.email "xeumingproject@gmail.com"
git config --global --list
ls ~/storage/downloads
cd ~
unzip -o ~/storage/downloads/BAILXMD_XEUMINGPROJECT.zip
cd Bailxm
echo "node_modules" > .gitignore
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/xeumingproject/Bailxm.git
git push -u origin main
