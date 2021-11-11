# use python version 3 docker image as base image
FROM python:3

# cd to directory /usr/src/app. this will be our working directory
WORKDIR /usr/src/app

# copy the content of current directory in to the pwd of docker image.
# pwd in image is /usr/src/app
COPY . .

# now run the command to install dependencies from requirements file
RUN pip install --no-cache-dir -r requirements.txt

# expose the port 8800
EXPOSE 8800

# everytime container is started, run this command
CMD python manage.py runserver 0.0.0.0:8800