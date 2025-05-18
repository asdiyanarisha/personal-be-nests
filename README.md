# Personal Be Build with Nest JS & Type ORM


please be preparing `.env` file first from `.env.example`


### how to build docker
```
docker build --no-cache -t personal-be:0.0.1 -f Dockerfile .
```

### how to run Docker

```
docker run --env-file .env --network personal-proj_default -p 5000:3000 --name personal-be personal-be:0.0.1
```