@echo off
echo Deploying cart-service...
cd cart-service\src
npm install
npm run build
npm run deploy
cd ..\..

echo Deploying notification-service...
cd notification-service\src
npm install
npm run build
npm run deploy
cd ..\..

echo Deploying order-service...
cd order-service\src
npm install
npm run build
npm run deploy
cd ..\..

echo Deploying payment-service...
cd payment-service\src
npm install
npm run build
npm run deploy
cd ..\..

echo Deploying product-service...
cd product-service\src
npm install
npm run build
npm run deploy
cd ..\..

echo Deployment completed!
pause
