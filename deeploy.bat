@echo off
echo Deploying cart-service...
cd cart-service
npm install
npm run build
npm run deploy
cd ..

echo Deploying notification-service...
cd notification-service
npm install
npm run build
npm run deploy
cd ..

echo Deploying order-service...
cd order-service
npm install
npm run build
npm run deploy
cd ..

echo Deploying payment-service...
cd payment-service
npm install
npm run build
npm run deploy
cd ..

echo Deploying product-service...
cd product-service
npm install
npm run build
npm run deploy
cd ..

echo Deployment completed!
pause
