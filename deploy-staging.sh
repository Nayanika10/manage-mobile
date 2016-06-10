#! /bin/bash



mkdir dist
touch dist/index.html
echo date >> index.html
echo "Changing Directory to ./dist"
cd dist

echo "Setting git config user.email and user.name"
git config --global user.email "manjesh@quetzal.in"
git config --global user.name "Manjesh V"

echo "Git Init"
git init

echo "Adding remote"
git remote add origin https://github.com/quezx/quarcdist

echo "Adding files to git"
git add *

echo "Commiting..."
git commit -m "new"

echo "Started deploying"
git push -u origin staging --force

echo "Deployed Successfully!"
exit 0
