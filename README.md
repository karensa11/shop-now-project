# Shop Now

**Overview**
Simple shopping management system, built for learning proposes.

User can browse for catalog, add items to cart, edit his cart and then place order.
In addition, there is admin capability. The admin can manage orders, and view major user transactions.

Back end (BE) done using micro services (along with Eureka, API gateway and others) and run as docker containers (via docker compose).
User interface done using react with redux.

For now the system is capable only to run on local computer.

To run it, download the code using “git clone” and follow the installation and run instructions as below.

**Technologies and key features**

|   |  | 
| :---: | :---: |
|<img src="./documentation/images/spring-boot.png" width="50" height="30">| Spring boot |
|<img src="./documentation/images/openfeign.png" width="50" height="30">| Open feign (calling between ms) |
|<img src="./documentation/images/h2.png" width="50" height="30">| H2 in memory database (with JPA) |
|<img src="./documentation/images/OpenAPI.png" width="50" height="30">| OpenAPI (swagger automatic documentation) |
|<img src="./documentation/images/docker.png" width="50" height="30">| docker (with compose) |
|<img src="./documentation/images/zipkin-logo.png" width="50" height="30">| Zipkin (tracing between ms calls) via rabbitMQ |
|<img src="./documentation/images/kafka.png" width="50" height="30">| Kafka (messages between ms) |
|<img src="./documentation/images/swagger-ui.png" width="50" height="30">| Swagger-ui (view all the rest definitions – e.g. URL, request/response) |
|| Actuator (system status and details) |
|| HAL browser (system links) |
|| XSS validation (when parsing the UI input + data types validation) |
|| customized spring annotations (enable) |
|| customized exception handling |
|| roles validation (in the api gateway) |
|<img src="./documentation/images/react-redux.png" width="50" height="30">| react UI with redux and functional components (hooks) |
|<img src="./documentation/images/ESLint.png" width="50" height="30">| ESlint (UI code standards validation) |
|| session id and transaction id sent on every transaction to the BE |
|<img src="./documentation/images/selenium.png" width="50" height="30">| UI automation testing (incl negative tests) using selenium, moca, chai, nodeJs |
|<img src="./documentation/images/TestNG.png" width="50" height="30">| Rest automation testing using rest assure, testng |

**Components Architecture Diagram**

<img src="./documentation/architecture.png">

**Installation on local PC**

1.	Install UI libraries
```
[user-ui] [user-ui-automation]
npm install
```
2.	Install docker (if not already have)

3.	Install micro services images on docker
```
[catalog-service] [api-gateway] [naming-service] [orders-service] [tracking-service] [users-service]
spring-boot:build-image -DskipTests

Make sure eslint report is ok (you can run via “npm run eslint” to get updated report)

If need to re-build container on same machine, run 
docker-compose -f docker-compose-filename.yml down
docker-compose -f docker-compose-filename.yml up

or get the problematic image and delete
docker-compose ps
docker-compose rm
```

**Run on local PC**

1.	Run micro services
```
Root folder
docker-compose up
```

2.	Verify ms are up
```
e.g. open actuator link on all the rests
```

3.	Run rest automation (basic sanity)
```
[rest-automation]
mvn clean test -Dsurefire.suiteXmlFiles=testng.xml
Report under reports/rest-testing (view  report in chrome browser)
```

4.	Start UI
```
[user-ui]
npm start
```

5.	Verify UI homepage opens
```
http://localhost:7000/
Run with -disable-web-security
```

6.	Perform full automation
```
Once rest-automation is ok and browser home page is ok
[user-ui-automation]
mvn clean test -Dsurefire.suiteXmlFiles=testng.xml
Report under reports/ui-testing (view report in chrome browser)
```
