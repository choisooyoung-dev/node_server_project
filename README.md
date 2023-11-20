# node_server_project
- [프로젝트 링크](http://s00.shop:3000/api/products)
- [프로젝트 링크 상품 최신순 정렬(기본값)](http://s00.shop:3000/api/products?sort=desc)
- [프로젝트 링크 상품 등록순 정렬](http://s00.shop:3000/api/products?sort=asc)

## 프로젝트 개요

1.  **API 명세서 작성**

-   [API 명세서 링크](https://roasted-crush-68f.notion.site/API-c4670adf7f7445d0971d75a227b31946?pvs=4)

<br  />

2.  **MySQL과 Sequelize를 이용한 데이터베이스 설계**

-   ERD 작성 및 Sequelize를 사용한 마이그레이션 코드와 스키마 코드 작성

-   [ERD 명세서](https://www.erdcloud.com/d/WKRMdGWujQa8r5Q4X)

<br  />

<img  src="./erd.PNG"  title="ERD"/>

<br  />

3.  **인증 관련 기능 구현**

-   JWT(액세스 토큰) 이해

-   회원가입, 로그인, 내 정보 조회 API 구현

-   JWT를 활용한 인증 Middleware 구현

-   상품 관련 기능에 인증 로직 추가

<br  />

4.  **기술 스택**

    <img  src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

    <img  src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

    <img  src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

    <img  src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

    <img  src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">

    <img  src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">

    <img  src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

    <img  src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">

<br  />

<br  />

5.  **프로젝트 구조**

    ```bash

        📦config
        ┗  📜config.js
    
        📦lib
         ┣ 📜error-lists.js
         ┗ 📜schema-validation.js
    
        📦middlewares
         ┣ 📜auth-middleware.js
         ┗ 📜error-middleware.js
    
        📦migrations
        ┣  📜20231112094443-create-users.js
        ┗  📜20231112094519-create-products.js
    
        📦models
        ┣  📜index.js
        ┣  📜products.js
        ┗  📜users.js
    
        📦routes
        ┣  📜products.router.js
        ┗  📜users.router.js

    ```

## 요구사항

1.  **프로젝트 기본 세팅 준비**

-   `.env` 파일을 이용하여 민감한 정보 관리

    ```bash
    MYSQL_USERNAME

    MYSQL_PASSWORD

    MYSQL_DATABASE

    MYSQL_HOST

    TOKEN_KEY
    ```

-   `.gitignore` 파일로 불필요한 정보 Github에 올라가지 않도록 설정

-   `.prettierrc` 파일 생성하여 코드 형태 유지

<br  />

2.  **API 명세서 작성**

-   API 명세서 템플릿을 Google Drive에 복제

-   과제 요구사항에 맞게 작성 후, README.md 파일에 명세서 URL 추가

<br  />

3.  **인증 관련 기능 개발**

-   회원가입 API

-   로그인 API

-   내 정보 조회 API

-   인증 Middleware 구현

<br  />

4.  **사용자 관련 기능 추가**

-   내 정보 조회 API 구현

<br  />

5.  **상품 관련 기능 추가**

-   상품 생성 API

-   상품 수정 API

-   상품 삭제 API

-   상품 목록 조회 API

-   상품 상세 조회 API

<br  />

6.  **API 호출 도구로 동작 확인**

-   Thunder Client, Rest Client 등을 사용하여 API가 정상적으로 동작하는지 확인

<br  />

7.  **배포**

-   AWS EC2 인스턴스에 프로젝트 배포

-   PM2를 사용하여 Express 서버가 예상치 않게 종료되어도 다시 실행되도록 설정

<br  />

<br  />

## 설치 및 실행

```bash

# 프로젝트 클론

git  clone  https://github.com/choisooyoung-dev/node_server_project.git

```

```bash

# 의존성 설치

yarn  install

```

```bash

# 프로젝트 실행

yarn  dev

```

## 📢 더 고민해 보기

### **암호화 방식**

1. 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?

    - Hash는 단방향 암호화 입니다.

2. 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?

    - 평문으로 저장하는 것에 비해 해시값을 저장하는 것이 훨씬 안전하며, 단방향이기 때문에 원본 데이터로의 역변환이 불가능 합니다.
    - 원본 비밀번호를 알지 못하면 해시값을 다시 원래 비밀번호로 돌려놓을 수 없기 때문에 보안이 강화됩니다.

**인증 방식**

3.  JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?

    -   권한이 남용되어 부정사용이 되고, 계정이 탈취된 상태이므로 서비스를 무단으로 이용하는 문제점이 발생됩니다.

4.  해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
    -   refresh token을 사용합니다.

**인증과 인가**

1. 인증과 인가가 무엇인지 각각 설명해 주세요.

    - 인증: 사용자의 신원 확인 과정으로, 누가 접근하려는 지 확인하는 것
    - 인가: 인증된 사용자에 대해 특정 자원이나 서비스에 대한 권한을 결정하고 부여하는 것

2. 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
    - 인증에 해당합니다.
    - jwt 토큰이 제대로 들어와있는 지에 대해 검증하는 것이기 때문입니다.

**Http Status Code**

-   과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
    -   200 : 클라이언트의 요청을 서버가 정상적으로 처리
    -   201 : 클라이언트의 요청을 서버가 정상적으로 처리했고 새로운 리소스가 생김
    -   400 : 클라이언트가 잘못된 요청을 보냄을 의미
    -   401 : 요청자는 인증(authentication) 되지 않아 수행할 수 없음을 표현

**리팩토링**

1. MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?

    - MongoDB는 NoSQL 데이터베이스로 스키마가 유연하게 정의되는 반면 MySQL은 관계형 데이터베이스로 테이블과 스키마가 엄격하게 정의됩니다. 데이터 모델 및 스키마를 MySQL에 맞게 수정해야 합니다.

2. 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.
    - ORM을 사용하거나 테스트 주도 개발을 사용합니다.

**서버 장애 복구**

현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다.
만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다.
AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요?
(Hint: PM2에서 제공하는 기능 중 하나입니다.)

-   서비스로 등록하여 시스템 부팅 시 자동으로 실행되게 합니다.
    ```
    pm2 startup
    pm2 save
    ```

**개발 환경**

1. nodemon은 어떤 역할을 하는 패키지이며, 사용했을 때 어떤 점이 달라졌나요?

    - 파일 변경을 감지하여 실시간으로 반영해줍니다.

2. npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(`--global, -g`), 개발용(`--save-dev, -D`)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?
    - 일반 : `package.json` 파일의 `dependencies` 항목에 추가됩니다. 특정 프로젝트에 종속됩니다.
    - 글로벌 : 전역으로 해당 패키지를 설치합니다. 특정 프로젝트에 종속되지 않습니다.
    - 개발용 : 개발 단계에서만 필요한 종속성으로 설치합니다.
    - nodemon은 개발 시 코드변경 감지 및 자동 재시작을 지원하기 때문에 개발용으로 설치하는 것이 일반적입니다.
