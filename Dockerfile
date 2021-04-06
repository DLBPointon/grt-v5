FROM python:buster

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.0/dockerize-alpine-linux-amd64-v0.6.0.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.0.tar.gz \
    && rm dockerize-alpine-linux-amd64-v0.6.0.tar.gz

RUN mkdir -p /usr/src/app/instance
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
COPY setup.py /usr/src/app/

RUN apt-get update -y
RUN apt-get install -y python3-pip python3-setuptools
RUN pip3 install --upgrade setuptools
RUN python3 setup.py install
RUN pip3 --no-cache-dir install -r requirements.txt
RUN pip3 --no-cache-dir install 'connexion[swagger-ui]'

#RUN chmod +x start.sh
COPY . /usr/src/app

EXPOSE 8080
CMD ["python3", "-m", "swagger_server"]
