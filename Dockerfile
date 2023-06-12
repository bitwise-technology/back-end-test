FROM python:3.10.6-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . .

ENV PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ENV PYTHONUNBUFFERED=1
ENV SECRET_KEY=${SECRET_KEY}

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000", "--noreload"]
