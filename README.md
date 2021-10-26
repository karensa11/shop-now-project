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
|<img src="./documentation/images/spring-boot.png" width="50" height="70">| Spring boot |
|<img src="./documentation/images/openfeign.png" width="50" height="70">| Open feign (calling between ms) |
|<img src="./documentation/images/h2.png" width="50" height="70">| H2 in memory database (with JPA) |
|<img src="./documentation/images/OpenAPI.png" width="50" height="70">| OpenAPI (swagger automatic documentation) |
|<img src="./documentation/images/docker.png" width="50" height="70">| docker (with compose) |
|<img src="./documentation/images/zipkin-logo.png" width="50" height="70">| Zipkin (tracing between ms calls) via rabbitMQ |
|<img src="./documentation/images/kafka.png" width="50" height="70">| Kafka (messages between ms) |
|<img src="./documentation/images/swagger-ui.png" width="50" height="70">| Swagger-ui (view all the rest definitions – e.g. URL, request/response) |
|| Actuator (system status and details) |
|| HAL browser (system links) |
|| XSS validation (when parsing the UI input + data types validation) |
|| customized spring annotations (enable) |
|| customized exception handling |
|| roles validation (in the api gateway) |


