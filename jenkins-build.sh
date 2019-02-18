# example usage: JOB_NAME=example-api BUILD_NUMBER=101 bash jenkins-build.sh

# download and build nodejs application and 3rd party modules.
npm rebuild
npm install -l

version=$(cat package.json | python -c 'import sys, json; print json.load(sys.stdin)["version"]')

# change directory down below checkout directory
cd ..

# create an RPM using fpm.
#   JOB_NAME     = jenkins job name
#   BUILD_NUMBER = jenkins auto incremented build number
/usr/local/bin/fpm \
    -s dir -t rpm \
    --name "$JOB_NAME" \
    --iteration "$BUILD_NUMBER" \
    --version "$version" \
    --vendor "Example, Inc" \
    --rpm-user="node"  --deb-user="node" \
    --rpm-group="node" --deb-group="node" \
    --directories "/opt/$JOB_NAME" \
    "$JOB_NAME/$JOB_NAME.service=/lib/systemd/system/" \
    "$JOB_NAME=/opt/"

# make a copy of the rpm with generic name (without version or build).
cp *.rpm "$JOB_NAME.rpm"

# mv both the rpm and genericly named rpm to the workdir so jenkins can archive it.
mv *.rpm "$JOB_NAME"
