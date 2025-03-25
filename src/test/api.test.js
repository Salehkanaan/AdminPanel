import * as chai from 'chai';
import chaiHttp, { request } from "chai-http";
 import app from "../../server.mjs";
import express from 'express';
import cors from 'cors';

// const app = express();
// app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(express.json());
// const app=require('./server.mjs')
// const chai=require('chai')
// const chaiHttp=require('chai-http')
const { expect } = chai;
 chai.use(chaiHttp);
describe("Api Test", () => {
    describe("POST /login", () => {
        it("should return 401 for invalid credentials", (done) => {
           request(app)
                .post("/login")
                .send({ email: "admin@gmail.com", password: "admin" })
                .end((err , res ) => {
                   expect(res).to.have.status(401);
                    expect(res.body).to.have.property("message", "Invalid email or password");
                    done();
                });
        });

        it("should return success message for valid credentials", (done) => {
            request(app)
                .post("/login")
                .send({ email: "admin@gmail.com", password: "admin" }) // Use real credentials from DB
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Login successful");
                    done();
                });
        });
    });

    describe("Orders API", () => {
        let orderId;

        it("should fetch all orders", (done) => {
            chai
                .request(app)
                .get("/orders")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });

        it("should create a new order", (done) => {
            chai
                .request(app)
                .post("/orders/new")
                .send({
                    customerName: "John Doe",
                    totalAmount: 150,
                    status: "pending",
                    date: "2025-03-24",
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("message", "Order added successfully");
                    orderId = res.body.orderId;
                    done();
                });
        });

        it("should get order by ID", (done) => {
            chai
                .request(app)
                .get(`/orders/${orderId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("customerName", "John Doe");
                    done();
                });
        });

        it("should update an order by its ID", (done) => {
            chai
                .request(app)
                .put(`/orders/${orderId}`)
                .send({
                    customerName: "Jane Doe",
                    totalAmount: 200,
                    status: "completed",
                    date: "2025-03-25",
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Order updated successfully");
                    done();
                });
        });

        it("should delete an order by its ID", (done) => {
            chai
                .request(app)
                .delete(`/orders/${orderId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });


    describe("Products API", () => {
        let productId;

        it("should fetch all products", (done) => {
            chai
                .request(app)
                .get("/products")
                .end((err, res ) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });

        it("should create a new product", (done) => {
            chai
                .request(app)
                .post("/products/new")
                .send({
                    name: "Laptop",
                    price: 1200,
                    category: "Electronics",
                    description: "Gaming Laptop",
                })
                .end((err , res ) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("message", "Product added successfully");
                    productId = res.body.productId;
                    done();
                });
        });

        it("should get product by ID", (done) => {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .end((err , res  ) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("name", "Laptop");
                    done();
                });
        });

        it("should update a product by ID", (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send({
                    name: "Gaming Laptop",
                    price: 1300,
                    category: "Electronics",
                    description: "High-performance gaming laptop",
                })
                .end((err , res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Product updated successfully");
                    done();
                });
        });

        it("should delete a product by ID", (done) => {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .end((err , res ) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });


});