---
slug: Prisma
title: Prisma
authors: [andy]
tags: [Prisma]
---

## Prisma

Prisma 是一個 Node.js 的 ORM 框架，基本上他可以用在任何的 Node.js 框架上。而自己之所以會接觸到也是因為公司的小專案上（使用 Next.js）需要使用到 DB，但又懶得自己去處理一些 SQL injection 的問題，因此就找到了此 ORM 框架。

那 Prisma 基本上是由三個工具組成

- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
- Prisma Migrate: Declarative data modeling & migration system
- Prisma Studio: GUI to view and edit data in your database

那基本上我們的重點會是在`Prisma Client`和`Prisma Migrate`上，`Prisma Studio`可以想像成我們平常在用來看 DB 的 GUI 工具，所以要裝不裝都沒差。

:::note

官方的詳細介紹：[連結](https://www.prisma.io/docs/concepts/overview/what-is-prisma)

:::

## Prisma Migrate

在講 Migrate 之前要先說到`Prisma Schema`，簡單來說他就是定義 Prisma 的設定檔，裡面大致上分為三塊。

- Data sources: DB 的來源與類型。（目前 Prisma 主要可以使用關連式資料庫，至於像 MongoDB 這種 NoSQL 資料庫，官方有說到資源並不全面）
- Generators: 生成哪些客戶端可以使用。我自己只有使用`prisma-client`，其他假如你是使用 nestjs 這種框架，可以參考看看。
- Data model definition: 定義 DB Table 的一些欄位資料和表之間的關聯。

:::note

Generators：這部分我自己只有使用`Prisma Client`，如果是使用 nestjs 或需要用到 GraphQL 的人，可以參考[連結](https://www.prisma.io/docs/concepts/components/prisma-schema/generators/)其他的 generators。

:::

### Data sources

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
}
```

基本上 provider 就是定義是用哪個 DB，URL 則是 DB 的位置。

在官方的文件中，可能會看到 url 後面是寫`env("DATABASE_URL")`，基本上你要把 DB 位置寫在環境變數的檔案中或直接寫死在設定檔都可以。

### Generators

```prisma
generator client {
  provider = "prisma-client-js"
}
```

一般來說，如果你沒有要特別使用其他的 generator，就都是使用`prisma-client-js`。

若有其他特殊需求，可參考上方備註。

### Data model definition

```prisma
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId Int
}

model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[] @relation(references: [id])
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[] @relation(references: [id])
}

enum Role {
  USER
  ADMIN
}
```

講白了，基本上就只是你 Table Colume 的定義內容和 Table 之間的關聯。哪個欄位是 PK、哪個欄位有 Default 的資料或哪個欄位是 NOT NULL，在`model <Table name>`裡面都會定義出來。但相對的，要怎麼去寫這些定義，就需要去查官方文件了。

所以，基本上我都是先在 db 建好 table，定義好 colume 的格式，再透過

```shell
npx prisma db pull
```

這個指令，讓 prisma 幫我產好 model。

假設在 db 設計 table 時，table 沒有 PK 等之類的問題，再透過上方的 shell 去執行後，prisma 都會有 warning 或 error 的提示，可以讓我們順便知道在設計 table 時有沒有犯了哪些根本問題。

:::note

有關 Prisma 的 model 要怎麼寫，可以參考官方的文件[連結](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-fields)

我自己是習慣使用`npx prisma db pull`幫我產好 model XDD

:::

## Prisma Client

白話的說法就是你可以透過上方定義的 generator，透過 JavaScript 之類的方式，開始去跟 DB 進行互動。

使用的方式首先是將 generator 給引入，要使用 CJS 還是 ESM 的方式引入都可以。

```javascript
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
```

### CRUD

```javascript
const user = await prisma.user.create({
  data: {
    email: "elsa@prisma.io",
    name: "Elsa Prisma",
  },
});
```

其寫法簡單來說就是

```javascript
<引入的prisma client變數>.<prisma model name>.<行為(CRUD)>({
  <where 條件>,
  <寫入的資料>.....
})
```

行為有像是單筆新增的`create`，多筆新增的`createMany`，查詢的`findUnique`、`findFirst`和`findMany`......。

:::note

這邊不多做使用說明，因為小弟覺得 ORM 的東西看文件才能比較系統性的了解其語法。
參考:

- [API reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient)

:::

## 結語

上方簡單說明了 Prisma 這個 ORM 框架。像 Prisma Client 我們也只有簡略的介紹了 CRUD 的語法，但他其實還有像 Middleware 和 log 等較進階的東西。若對 Prisma 有興趣，可以在去閱讀其官方文件。
