
gcloud artifacts repositories list 
 gcloud artifacts repositories create netflix-clone \ 
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker repo for Netflix clone app"\


    docker tag myclone-netflix-app:v1 \
  us-central1-docker.pkg.dev/kkgcplabs01-036/netflix-clone/myclone-netflix-app:v1
