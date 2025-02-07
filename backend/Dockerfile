FROM python:3.12-slim

WORKDIR /app

COPY ./backend /app

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

CMD ["python", "app/main.py"]