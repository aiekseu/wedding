aws --endpoint-url=https://storage.yandexcloud.net s3 rm s3://xn--80ajkgzds6b --recursive
aws --endpoint-url=https://storage.yandexcloud.net s3 ls
npm run build
npm run export
aws --endpoint-url=https://storage.yandexcloud.net s3 cp --recursive _static s3://xn--80ajkgzds6b
