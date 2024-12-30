CREATE TABLE "categories"(
    "id" BIGINT NOT NULL,
    "name" TEXT NULL
);
ALTER TABLE
    "categories" ADD PRIMARY KEY("id");
ALTER TABLE
    "categories" ADD CONSTRAINT "categories_name_unique" UNIQUE("name");
CREATE TABLE "product_images"(
    "id" BIGINT NOT NULL,
    "url" TEXT NULL
);
ALTER TABLE
    "product_images" ADD PRIMARY KEY("id");
CREATE TABLE "product_tags"(
    "id" BIGINT NOT NULL,
    "name" TEXT NULL
);
ALTER TABLE
    "product_tags" ADD PRIMARY KEY("id");
ALTER TABLE
    "product_tags" ADD CONSTRAINT "product_tags_name_unique" UNIQUE("name");
CREATE TABLE "products"(
    "id" BIGINT NOT NULL,
    "name" TEXT NULL,
    "price" DECIMAL(8, 2) NULL,
    "stock_quantity" INTEGER NULL,
    "category_id" BIGINT NULL,
    "tag_id" BIGINT NULL,
    "description" TEXT NULL,
    "additional_info" TEXT NULL,
    "rating" DECIMAL(8, 2) NULL,
    "sku" TEXT NULL,
    "image_id" BIGINT NULL,
    "created_by" BIGINT NULL
);
ALTER TABLE
    "products" ADD PRIMARY KEY("id");
ALTER TABLE
    "products" ADD CONSTRAINT "products_sku_unique" UNIQUE("sku");
CREATE TABLE "sales"(
    "id" BIGINT NOT NULL,
    "product_id" BIGINT NULL,
    "sale_date" TIMESTAMP(0) WITH
        TIME zone NULL DEFAULT CURRENT_TIMESTAMP,
        "sale_price" DECIMAL(8, 2) NULL
);
ALTER TABLE
    "sales" ADD PRIMARY KEY("id");
CREATE TABLE "user_roles"(
    "id" BIGINT NOT NULL,
    "name" TEXT NULL
);
ALTER TABLE
    "user_roles" ADD PRIMARY KEY("id");
ALTER TABLE
    "user_roles" ADD CONSTRAINT "user_roles_name_unique" UNIQUE("name");
CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "username" TEXT NULL,
    "password_hash" TEXT NULL,
    "role_id" BIGINT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");
ALTER TABLE
    "products" ADD CONSTRAINT "products_tag_id_foreign" FOREIGN KEY("tag_id") REFERENCES "product_tags"("id");
ALTER TABLE
    "products" ADD CONSTRAINT "products_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "categories"("id");
ALTER TABLE
    "products" ADD CONSTRAINT "products_image_id_foreign" FOREIGN KEY("image_id") REFERENCES "product_images"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "user_roles"("id");
ALTER TABLE
    "sales" ADD CONSTRAINT "sales_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "products"("id");
ALTER TABLE
    "products" ADD CONSTRAINT "products_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");