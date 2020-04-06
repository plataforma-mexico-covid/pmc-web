echo "Building covid19"

if [ $1 = "install" ]; then
	echo "Installing "
	npm install
	echo "Building"
	ng build --prod
elif [ $1 = "build" ]; then
	echo "Building"
	ng build --prod
else
	echo "Only push"	
fi

if [ $2 = "docker" ]; then
	echo "Docker push"
	sh builddocker.sh	
else 
	echo "Doing nothing"
fi